const express = require('express');
// const fetch = require('node-fetch'); // Remove CommonJS require for node-fetch v3+
const { KJUR, KEYUTIL, hextopem } = require('jsrsasign'); // Import KJUR, KEYUTIL, hextopem
const router = express.Router();

// Environment variables should be loaded by the main server.js
// If dotenv is loaded here again, ensure paths are consistent or remove if redundant.
// For instance, if server.js is already loading from './.env' (relative to server directory)
// and this file is in a subdirectory, path resolution might differ.
// const path = require('path');
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); 

// Helper function for jsrsasign signature generation
const generateEcdsaSignature = (message, privateKeyHex) => {
  try {
    let prvKey;

    // Step 1: Try to get key using the function from eformsign documentation example
    try {
      console.log("[DEBUG Signature] Attempting KEYUTIL.getKeyFromPlainPrivatePKCS8Hex (from eformsign docs example)...");
      prvKey = KEYUTIL.getKeyFromPlainPrivatePKCS8Hex(privateKeyHex); // Corrected function name
      console.log("[DEBUG Signature] Successfully parsed private key with KEYUTIL.getKeyFromPlainPrivatePKCS8Hex.");
      console.log("[DEBUG Signature] Key details: curve=", prvKey.curveName, "isPrivate=", prvKey.isPrivate, "type=", prvKey.type);
    } catch (e1) {
      console.warn(`[WARN Signature] KEYUTIL.getKeyFromPlainPrivatePKCS8Hex failed: ${e1.message}. Falling back.`);
      console.error(e1.stack); // Log stack of this specific error

      // Step 2: Fallback to hextopem with 'PRIVATE KEY' then KEYUTIL.getKey (our previously working method)
      try {
        console.log("[DEBUG Signature] Fallback: Attempting key parsing: hextopem with 'PRIVATE KEY' label -> KEYUTIL.getKey");
        const pemPKCS8 = hextopem(privateKeyHex, 'PRIVATE KEY');
        prvKey = KEYUTIL.getKey(pemPKCS8);
        console.log("[DEBUG Signature] Fallback: Successfully parsed private key with hextopem + KEYUTIL.getKey.");
        console.log("[DEBUG Signature] Key details: curve=", prvKey.curveName, "isPrivate=", prvKey.isPrivate, "type=", prvKey.type);
      } catch (parseError) {
        console.error(`[ERROR Signature] Fallback parsing also failed: ${parseError.message}`);
        console.error(parseError.stack); // Log stack of parsing error
        throw new Error(`All key parsing attempts failed. Last error: ${parseError.message}`);
      }
    }

    if (!prvKey || !prvKey.isPrivate || prvKey.type !== 'EC') {
      console.error("[ERROR Signature] Parsed key is not a valid private EC key.", prvKey);
      throw new Error('Parsed key is not a valid private EC key.');
    }

    // Ensure curve is secp256r1 as expected by eformsign
    if (prvKey.curveName !== 'secp256r1' && prvKey.curveName !== 'NIST P-256') { // NIST P-256 is alias
        console.warn(`[WARN Signature] Parsed key curve is '${prvKey.curveName}', but 'secp256r1'/'NIST P-256' was expected. This might cause signature mismatch.`);
    }
    
    console.log("[DEBUG Signature] Key object obtained, proceeding to sign.");
    const sig = new KJUR.crypto.Signature({ alg: 'SHA256withECDSA' });
    sig.init(prvKey); // Initialize with the parsed key object
    sig.updateString(message);
    const signatureHex = sig.sign();
    
    if (typeof signatureHex !== 'string' || signatureHex.length === 0) {
        console.error("[ERROR Signature] sig.sign() did not return a valid hex string signature.", signatureHex);
        throw new Error('Failed to generate a valid signature string.');
    }

    console.log("[DEBUG Signature] Signature generated successfully:", signatureHex);
    return signatureHex;

  } catch (e) {
    console.error('[ERROR Signature] Overall error in generateEcdsaSignature:', e); // Log the whole error object
    if (e && e.stack) {
        console.error(e.stack);
    }
    if (e instanceof Error) {
        throw e;
    }
    throw new Error('An unexpected error occurred during signature generation.'); 
  }
};

router.post('/generate-signature', async (req, res) => {
  console.log('[DEBUG] /api/generate-signature route hit');
  try {
    const { executionTime } = req.body;
    const privateKey = process.env.EFORMSIGN_PRIVATE_KEY;

    console.log('[DEBUG] EFORMSIGN_PRIVATE_KEY for /generate-signature:', privateKey ? 'Exists' : 'MISSING!');

    if (!privateKey) {
      console.error('EFORMSIGN_PRIVATE_KEY is not set. Check .env and server restart.');
      return res.status(500).json({ error: 'EFORMSIGN_PRIVATE_KEY 환경변수가 설정되지 않았습니다.' });
    }
    if (!executionTime) {
      return res.status(400).json({ error: 'executionTime이 필요합니다.' });
    }

    const signature = generateEcdsaSignature(executionTime.toString(), privateKey);
    res.json({ signature });

  } catch (error) {
    console.error('서명 생성 API 라우트 오류 상세 (/generate-signature):', error.message);
    res.status(500).json({ error: '서명 생성 실패', details: error.message });
  }
});

// 토큰 발급을 위한 프록시 엔드포인트 (선택사항)
router.post('/access-token', async (req, res) => {
  console.log('[DEBUG] /api/access-token route hit');
  try {
    const { executionTime, memberEmail } = req.body;
    
    console.log('[DEBUG] EFORMSIGN_API_KEY from env:', process.env.EFORMSIGN_API_KEY ? 'Exists' : 'MISSING!');
    console.log('[DEBUG] EFORMSIGN_PRIVATE_KEY from env:', process.env.EFORMSIGN_PRIVATE_KEY ? 'Exists' : 'MISSING!');

    const apiKey = process.env.EFORMSIGN_API_KEY;
    const privateKey = process.env.EFORMSIGN_PRIVATE_KEY;
    
    if (!apiKey || !privateKey) {
      console.error('EFORMSIGN_API_KEY or EFORMSIGN_PRIVATE_KEY is not set. Check server .env file and server restart.');
      return res.status(500).json({ error: 'API 키 또는 비밀키가 설정되지 않았습니다.' });
    }
    
    const signature = generateEcdsaSignature(executionTime.toString(), privateKey);
    
    // Use dynamic import for node-fetch
    const fetch = (await import('node-fetch')).default;

    const eformsignResponse = await fetch('https://service.eformsign.com/v2.0/api_auth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'eformsign_signature': signature,
        'Authorization': `Bearer ${Buffer.from(apiKey).toString('base64')}`
      },
      body: JSON.stringify({
        execution_time: executionTime,
        member_id: memberEmail
      })
    });
    
    const data = await eformsignResponse.json();
    
    console.log('[DEBUG /api/access-token] Data received from eformsign API:', data); // Log the data from eformsign

    if (!eformsignResponse.ok) {
      console.error('eformsign API error during token fetch:', {
        status: eformsignResponse.status,
        statusText: eformsignResponse.statusText,
        body: data
      });
      return res.status(eformsignResponse.status).json(data);
    }
    
    res.json(data);
  } catch (error) {
    console.error('토큰 발급 API 라우트 오류 상세 (/access-token):', error.message);
    // Also log stack if available for better debugging from generateEcdsaSignature
    if (error.stack) {
        console.error(error.stack);
    }
    res.status(500).json({ error: '토큰 발급 실패', details: error.message });
  }
});

module.exports = router;