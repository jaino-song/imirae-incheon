import { useCallback } from 'react';

const useClipboard = () => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = useCallback(async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
        catch (error) {
            console.error('Failed to copy', error);
        }
    }, []);

    return { copied, copyToClipboard };
};

export default useClipboard;