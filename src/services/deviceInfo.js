function parseUserAgent(ua = navigator.userAgent) {
    // Regular expressions to match browser, OS, and device details
    const browserRegex = /(firefox|msie|chrome|safari|trident|opera)/i;
    const osRegex = /(windows nt|mac os x|android|linux|iphone os|ipad os|windows phone)/i;
    const deviceRegex = /(iphone|ipad|android|windows phone|macintosh|linux)/i;

    // Extracting information using regular expressions
    const browserMatch = ua.match(browserRegex);
    const osMatch = ua.match(osRegex);
    const deviceMatch = ua.match(deviceRegex);

    // Identifying browser
    let browser = browserMatch ? browserMatch[1] : 'Unknown Browser';
    if (/trident/i.test(browser)) {
        browser = 'Internet Explorer';
    }
    if (/msie/i.test(browser)) {
        browser = 'Internet Explorer';
    }

    // Identifying OS
    let os = osMatch ? osMatch[1] : 'Unknown OS';
    if (/windows nt/i.test(os)) {
        os = os.replace('windows nt', 'Windows');
        if (os.includes('10.0')) os = 'Windows 10';
        else if (os.includes('6.3')) os = 'Windows 8.1';
        else if (os.includes('6.2')) os = 'Windows 8';
        else if (os.includes('6.1')) os = 'Windows 7';
    }
    if (/iphone os/i.test(os)) {
        os = os.replace('iphone os', 'iOS');
    }
    if (/ipad os/i.test(os)) {
        os = os.replace('ipad os', 'iOS');
    }

    // Identifying Device
    let device = 'Desktop'; // Default to desktop
    if (/iphone/i.test(deviceMatch)) {
        device = 'iPhone';
    } else if (/ipad/i.test(deviceMatch)) {
        device = 'iPad';
    } else if (/android/i.test(deviceMatch)) {
        device = 'Android Device';
    } else if (/windows phone/i.test(deviceMatch)) {
        device = 'Windows Phone';
    }

    // Assembling the result
    return {
        browser: browser,
        os: os,
        device: device
    };
}


export default parseUserAgent;
