// Function to load external scripts
export const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  // Load both scripts
  export const loadScripts = async () => {
    try {
      await loadScript('https://www.eformsign.com/plugins/jquery/jquery.min.js');
      await loadScript('https://www.eformsign.com/lib/js/efs_embedded_v2.js');
    } catch (error) {
      console.error('Error loading eFormSign scripts:', error);
    }
  };