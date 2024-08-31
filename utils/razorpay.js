export function loadRazorpayScript() {
    return new Promise((resolve, reject) => {
      if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
        resolve(true);
        return;
      }
  
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.defer = true;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        reject(new Error('Razorpay SDK failed to load.'));
      };
  
      document.body.appendChild(script);
    });
  }
  
  export function removeRazorpayScript() {
    const script = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (script) {
      script.parentNode.removeChild(script);
    }
  }