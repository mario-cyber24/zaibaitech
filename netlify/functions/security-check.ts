import { Handler } from '@netlify/functions';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import sslChecker from 'ssl-checker';

// Add artificial delay to simulate real-world scanning
const simulateScanDelay = () => new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1000));

interface SecurityHeaders {
  'Content-Security-Policy'?: string;
  'Strict-Transport-Security'?: string;
  'X-Content-Type-Options'?: string;
  'X-Frame-Options'?: string;
  'X-XSS-Protection'?: string;
  'Referrer-Policy'?: string;
}

const handler: Handler = async (event) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    let { url } = JSON.parse(event.body || '{}');
    
    if (!url) {
      throw new Error('URL is required');
    }

    // Ensure URL has protocol
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`;
    }

    const domain = new URL(url).hostname;
    console.log('Scanning domain:', domain);

    // Perform SSL certificate check
    const sslDetails = await sslChecker(domain);
    await simulateScanDelay();

    // Perform the security check
    const response = await axios.get(url, {
      timeout: 10000,
      maxRedirects: 5,
      validateStatus: null,
      headers: {
        'User-Agent': 'ZaiBai Security Scanner/1.0'
      }
    });

    const isHttps = url.startsWith('https://');
    const responseHeaders: SecurityHeaders = {
      'Content-Security-Policy': response.headers['content-security-policy'],
      'Strict-Transport-Security': response.headers['strict-transport-security'],
      'X-Content-Type-Options': response.headers['x-content-type-options'],
      'X-Frame-Options': response.headers['x-frame-options'],
      'X-XSS-Protection': response.headers['x-xss-protection'],
      'Referrer-Policy': response.headers['referrer-policy']
    };

    // Check cookies
    const cookies = response.headers['set-cookie'] || [];
    const cookieSecure = cookies.every(cookie => cookie.includes('Secure'));
    const cookieHttpOnly = cookies.every(cookie => cookie.includes('HttpOnly'));
    const cookieSameSite = cookies.every(cookie => cookie.includes('SameSite'));

    // Parse HTML and check for security issues
    const dom = new JSDOM(response.data);
    const document = dom.window.document;

    // Check for mixed content
    const mixedContent = {
      scripts: Array.from(document.querySelectorAll('script[src^="http:"]')),
      styles: Array.from(document.querySelectorAll('link[rel="stylesheet"][href^="http:"]')),
      images: Array.from(document.querySelectorAll('img[src^="http:"]')),
      media: Array.from(document.querySelectorAll('audio[src^="http:"], video[src^="http:"]'))
    };

    // Check for external scripts without SRI
    const scripts = Array.from(document.getElementsByTagName('script'));
    const externalScripts = scripts.filter(script => script.src && !script.src.startsWith(url));
    const unsafeScripts = externalScripts.filter(script => !script.integrity);

    // Calculate security score
    const score = calculateSecurityScore({
      https: isHttps,
      headers: responseHeaders,
      cookies: { secure: cookieSecure, httpOnly: cookieHttpOnly, sameSite: cookieSameSite },
      ssl: sslDetails,
      mixedContent: Object.values(mixedContent).some(items => items.length > 0),
      unsafeScripts: unsafeScripts.length > 0
    });

    const results = {
      score,
      findings: {
        https: {
          status: isHttps ? 'pass' : 'fail',
          details: isHttps ? 
            'HTTPS is properly implemented' : 
            'Site is not using HTTPS',
          importance: 'Critical for data protection in transit',
          recommendations: !isHttps ? [
            'Implement HTTPS across all pages',
            'Configure proper SSL/TLS settings',
            'Enable HSTS'
          ] : undefined
        },
        ssl: {
          status: sslDetails.valid ? 'pass' : 'fail',
          details: `SSL certificate ${sslDetails.valid ? 'is valid' : 'has issues'}`,
          importance: 'Critical for secure communications',
          recommendations: !sslDetails.valid ? [
            'Update SSL certificate',
            'Ensure proper certificate chain',
            'Configure strong SSL protocols'
          ] : undefined
        },
        headers: {
          status: Object.values(responseHeaders).filter(Boolean).length >= 4 ? 'pass' : 'warning',
          details: `${Object.values(responseHeaders).filter(Boolean).length}/6 security headers implemented`,
          importance: 'Essential for browser security',
          recommendations: [
            'Implement Content Security Policy',
            'Enable HTTP Strict Transport Security',
            'Set X-Content-Type-Options'
          ]
        },
        cookies: {
          status: cookieSecure && cookieHttpOnly && cookieSameSite ? 'pass' : 'warning',
          details: 'Cookie security analysis',
          importance: 'Critical for session security',
          recommendations: [
            !cookieSecure && 'Set Secure flag on all cookies',
            !cookieHttpOnly && 'Set HttpOnly flag on all cookies',
            !cookieSameSite && 'Implement SameSite attribute'
          ].filter(Boolean)
        },
        mixedContent: {
          status: Object.values(mixedContent).some(items => items.length > 0) ? 'warning' : 'pass',
          details: 'Mixed content analysis',
          importance: 'Critical for preventing man-in-the-middle attacks',
          recommendations: Object.values(mixedContent).some(items => items.length > 0) ? [
            'Update all resources to use HTTPS',
            'Implement upgrade-insecure-requests CSP directive',
            'Configure automatic HTTPS upgrades'
          ] : undefined
        },
        scripts: {
          status: unsafeScripts.length > 0 ? 'warning' : 'pass',
          details: `${unsafeScripts.length} scripts without Subresource Integrity (SRI)`,
          importance: 'Critical for preventing script tampering',
          recommendations: unsafeScripts.length > 0 ? [
            'Add integrity attributes to external scripts',
            'Use Content Security Policy to restrict script sources',
            'Consider self-hosting critical scripts'
          ] : undefined
        }
      },
      timestamp: new Date().toISOString()
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(results)
    };

  } catch (error) {
    console.error('Security check failed:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Security check failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};

function calculateSecurityScore(data: any): number {
  let score = 0;
  const weights = {
    https: 20,
    ssl: 20,
    headers: 20,
    cookies: 15,
    mixedContent: 15,
    scripts: 10
  };

  // HTTPS (20 points)
  if (data.https) score += weights.https;

  // SSL Certificate (20 points)
  if (data.ssl?.valid) score += weights.ssl;

  // Security Headers (20 points)
  const requiredHeaders = [
    'Content-Security-Policy',
    'Strict-Transport-Security',
    'X-Content-Type-Options'
  ];
  
  const headerScore = requiredHeaders.reduce((acc, header) => {
    return acc + (data.headers[header] ? weights.headers / requiredHeaders.length : 0);
  }, 0);
  score += headerScore;

  // Cookie Security (15 points)
  if (data.cookies.secure && data.cookies.httpOnly && data.cookies.sameSite) {
    score += weights.cookies;
  } else if ((data.cookies.secure && data.cookies.httpOnly) || 
             (data.cookies.secure && data.cookies.sameSite) || 
             (data.cookies.httpOnly && data.cookies.sameSite)) {
    score += weights.cookies * 0.7;
  } else if (data.cookies.secure || data.cookies.httpOnly || data.cookies.sameSite) {
    score += weights.cookies * 0.3;
  }

  // Mixed Content (15 points)
  if (!data.mixedContent) score += weights.mixedContent;

  // Script Security (10 points)
  if (!data.unsafeScripts) score += weights.scripts;

  return Math.round(score);
}

export { handler };