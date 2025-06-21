import { useState, useEffect, useCallback } from 'react';

// Ensure no trailing slash to avoid `//api` in request URLs which can trigger unwanted redirects/CORS issues
const RAW_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const API_BASE_URL = RAW_API_BASE_URL.replace(/\/$/, '');

const useEformsignAuth = () => {
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Only client-side environment variables (server handles private key)
    const USER_EMAIL = "forchildrenbysongs@gmail.com";

    // 서명 생성 함수 - 서버에서 처리
    const generateSignature = useCallback(async (executionTime) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/generate-signature`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    executionTime: executionTime
                })
            });
            
            if (!response.ok) {
                throw new Error(`서명 생성 실패: ${response.status}`);
            }
            
            const data = await response.json();
            return data.signature;
        } catch (error) {
            console.error('서명 생성 실패:', error);
            throw error;
        }
    }, []);

    // 토큰 발급 함수 - 서버 프록시를 통해 처리
    const getAccessToken = useCallback(async () => {
        setIsLoading(true);
        try {
            const executionTime = Date.now();

            const response = await fetch(`${API_BASE_URL}/api/access-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    executionTime: executionTime,
                    memberEmail: USER_EMAIL
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`토큰 발급 실패: ${response.status} - ${errorData.error || 'Unknown error'}`);
            }

            const data = await response.json();
            
            setAccessToken(data.oauth_token.access_token);
            setRefreshToken(data.oauth_token.refresh_token);
            setIsAuthenticated(true);
            
            // 토큰을 localStorage에 저장 (선택사항)
            localStorage.setItem('eformsign_access_token', data.oauth_token.access_token);
            localStorage.setItem('eformsign_refresh_token', data.oauth_token.refresh_token);
            
            return data.oauth_token;
        } catch (error) {
            console.error('토큰 발급 오류:', error);
            setIsAuthenticated(false);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 토큰 갱신 함수
    const refreshAccessToken = useCallback(async () => {
        if (!refreshToken) {
            console.error('No refresh token available to refresh.');
            throw new Error('Refresh token이 없습니다.');
        }

        try {
            const executionTime = Date.now();
            const response = await fetch(`${API_BASE_URL}/api/refresh-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    executionTime: executionTime,
                    refreshToken: refreshToken
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`토큰 갱신 실패: ${response.status} - ${errorData.error || 'Unknown error'}`);
            }

            const data = await response.json();
            
            setAccessToken(data.oauth_token.access_token);
            setRefreshToken(data.oauth_token.refresh_token);
            
            localStorage.setItem('eformsign_access_token', data.oauth_token.access_token);
            localStorage.setItem('eformsign_refresh_token', data.oauth_token.refresh_token);
            
            return data.oauth_token;
        } catch (error) {
            console.error('토큰 갱신 오류:', error);
            setIsAuthenticated(false);
            throw error;
        }
    }, []);

    // 컴포넌트 마운트 시 저장된 토큰 복원
    useEffect(() => {
        const savedAccessToken = localStorage.getItem('eformsign_access_token');
        const savedRefreshToken = localStorage.getItem('eformsign_refresh_token');
        
        if (savedAccessToken && savedRefreshToken) {
            setAccessToken(savedAccessToken);
            setRefreshToken(savedRefreshToken);
            setIsAuthenticated(true);
        }
    }, []);

    return {
        accessToken,
        refreshToken,
        isAuthenticated,
        isLoading,
        getAccessToken,
        refreshAccessToken
    };
};

export default useEformsignAuth; 