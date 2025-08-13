import axios from 'axios';

// Local proxy server
const LOCAL_PROXY = 'http://localhost:3001/proxy';

// Updated CORS proxy services - more reliable ones
const CORS_PROXIES = [
  // Proxy 1: AllOrigins - most reliable
  {
    name: 'AllOrigins',
    url: 'https://api.allorigins.win/get?url=',
    type: 'allorigins'
  },
  // Proxy 2: ThingProxy - simple and fast
  {
    name: 'ThingProxy',
    url: 'https://thingproxy.freeboard.io/fetch/',
    type: 'simple'
  },
  // Proxy 3: CORS.SH - new reliable service
  {
    name: 'CORS.SH',
    url: 'https://cors.sh/',
    type: 'simple'
  },
  // Proxy 4: Proxy6 - backup option
  {
    name: 'Proxy6',
    url: 'https://api.codetabs.com/v1/proxy/?quest=',
    type: 'simple'
  }
];

export const makeApiRequest = async (requestConfig) => {
  try {
    const { url, method, headers, data } = requestConfig;
    
    // First try direct request
    try {
      const config = {
        method: method.toLowerCase(),
        url,
        headers: {
          ...headers,
          // Remove problematic headers that might cause CORS issues
          'sec-ch-ua': undefined,
          'sec-ch-ua-mobile': undefined,
          'sec-ch-ua-platform': undefined,
          'sec-fetch-dest': undefined,
          'sec-fetch-mode': undefined,
          'sec-fetch-site': undefined,
        },
        timeout: 8000, // Reduced timeout
      };

      if (data && (method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT')) {
        config.data = data;
      }

      console.log('🚀 Trying direct API request...');
      const response = await axios(config);
      console.log('✅ Direct request successful!');
      return response.data;
    } catch (directError) {
      console.log('❌ Direct request failed:', directError.message);
      console.log('🔄 Switching to local proxy...');
      
      // Try local proxy first
      try {
        return await makeLocalProxyRequest(requestConfig);
      } catch (localProxyError) {
        console.log('❌ Local proxy failed:', localProxyError.message);
        console.log('🔄 Switching to external proxies...');
        
        // If local proxy fails, try external proxies
        return await makeExternalProxyRequest(requestConfig);
      }
    }
  } catch (error) {
    console.error('❌ API Request Error:', error);
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - API took too long to respond');
    }
    
    if (error.response) {
      throw new Error(`API Error: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      throw new Error('Network connection failed. Please check your internet connection and try again.');
    } else {
      throw new Error(`Request Error: ${error.message}`);
    }
  }
};

const makeLocalProxyRequest = async (requestConfig) => {
  const { url, method, headers, data } = requestConfig;
  
  console.log('🏠 Trying local proxy server...');
  
  try {
    const response = await axios.post(LOCAL_PROXY, {
      url,
      method,
      headers,
      data
    }, {
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Local proxy successful!');
    
    // Local proxy returns {data: actualData, status: ..., headers: ...}
    return response.data.data;
    
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      throw new Error('Local proxy server not running. Please run: npm run proxy');
    }
    throw error;
  }
};

const makeExternalProxyRequest = async (requestConfig) => {
  const { url, method, headers, data } = requestConfig;
  
  for (let i = 0; i < CORS_PROXIES.length; i++) {
    const proxy = CORS_PROXIES[i];
    
    try {
      console.log(`🔄 Trying ${proxy.name} (${i + 1}/${CORS_PROXIES.length})...`);
      
      let config;
      
      if (proxy.type === 'allorigins') {
        // AllOrigins proxy - special handling
        const proxyUrl = proxy.url + encodeURIComponent(url);
        config = {
          method: 'GET',
          url: proxyUrl,
          timeout: 20000,
        };
      } else {
        // Simple proxy
        const proxyUrl = proxy.url + url;
        config = {
          method: 'GET', // Most proxies only support GET
          url: proxyUrl,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
          timeout: 20000,
        };
      }
      
      const response = await axios(config);
      
      // Parse response based on proxy type
      let responseData = response.data;
      
      if (proxy.type === 'allorigins') {
        // AllOrigins returns {contents: "...", status: {...}}
        if (responseData.contents) {
          try {
            responseData = JSON.parse(responseData.contents);
          } catch (e) {
            responseData = responseData.contents;
          }
        }
      } else {
        // Simple proxy returns data directly
        if (typeof responseData === 'string') {
          try {
            responseData = JSON.parse(responseData);
          } catch (e) {
            // If can't parse as JSON, return as is
          }
        }
      }
      
      console.log(`✅ ${proxy.name} proxy successful!`);
      return responseData;
      
    } catch (proxyError) {
      console.log(`❌ ${proxy.name} failed:`, proxyError.message);
      
      // If this is the last proxy, throw error
      if (i === CORS_PROXIES.length - 1) {
        throw new Error(`All CORS proxies failed. This might be due to:\n• Network connectivity issues\n• API endpoint is down\n• Firewall blocking requests\n\nTry:\n• Run local proxy: npm run proxy\n• Check your internet connection\n• Use a VPN\n• Try again later`);
      }
      
      // Continue to next proxy
      continue;
    }
  }
}; 