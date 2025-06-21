// ─── routes/eformsign.js ───────────────────────────────────────────────────────
// (previously: require + module.exports → now ES modules)

import express from 'express';
import { KJUR, KEYUTIL, hextopem } from 'jsrsasign';

const router = express.Router();

const generateEcdsaSignature = (message, privateKeyHex) => {
  try {
    let prvKey;
    // …exact same helper code you had, unchanged…
    // (use KEYUTIL.getKeyFromPlainPrivatePKCS8Hex, fallback to hextopem+KEYUTIL.getKey, KJUR.crypto.Signature, etc.)
    return signatureHex;
  } catch (e) {
    console.error('[ERROR Signature] Overall error:', e);
    throw e;
  }
};

router.post('/generate-signature', async (req, res) => {
  console.log('[DEBUG] /api/generate-signature route hit');
  const { executionTime } = req.body;
  const privateKey = process.env.EFORMSIGN_PRIVATE_KEY;
  if (!privateKey) {
    return res.status(500).json({ error: 'EFORMSIGN_PRIVATE_KEY 환경변수가 설정되지 않았습니다.' });
  }
  if (!executionTime) {
    return res.status(400).json({ error: 'executionTime이 필요합니다.' });
  }
  const signature = generateEcdsaSignature(executionTime.toString(), privateKey);
  res.json({ signature });
});

router.post('/access-token', async (req, res) => {
  console.log('[DEBUG] /api/access-token route hit');
  try {
    const { executionTime, memberEmail } = req.body;
    const apiKey = process.env.EFORMSIGN_API_KEY;
    const privateKey = process.env.EFORMSIGN_PRIVATE_KEY;
    if (!apiKey || !privateKey) {
      return res.status(500).json({ error: 'API 키 또는 비밀키가 설정되지 않았습니다.' });
    }
    const signature = generateEcdsaSignature(executionTime.toString(), privateKey);
    // dynamic import for node-fetch v3+
    const fetch = (await import('node-fetch')).default;

    const eformsignRes = await fetch(
      'https://service.eformsign.com/v2.0/api_auth/access_token',
      {
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
      }
    );
    const data = await eformsignRes.json();
    if (!eformsignRes.ok) {
      return res.status(eformsignRes.status).json(data);
    }
    res.json(data);
  } catch (err) {
    console.error('[ERROR] /api/access-token:', err);
    res.status(500).json({ error: '토큰 발급 실패', details: err.message });
  }
});

router.post('/refresh-token', async (req, res) => {
  const { executionTime, refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh token is required' });
  }
  try {
    const privateKey = process.env.EFORMSIGN_PRIVATE_KEY;
    const signature = generateEcdsaSignature(executionTime.toString(), privateKey);
    const fetch = (await import('node-fetch')).default;

    const eformsignRes = await fetch(
      'https://service.eformsign.com/v2.0/api_auth/refresh_token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'eformsign_signature': signature
        },
        body: JSON.stringify({
          execution_time: executionTime,
          refresh_token: refreshToken
        })
      }
    );
    const data = await eformsignRes.json();
    if (!eformsignRes.ok) {
      return res.status(eformsignRes.status).json({ error: data.err_msg || 'Failed to refresh token' });
    }
    res.json(data);
  } catch (err) {
    console.error('[ERROR] /api/refresh-token:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//
module.exports = router;
