import { useState, useRef, useEffect } from 'react';
import { makeApiRequest } from '../utils/apiService';

const CurlTester = () => {
  const [curlCommand, setCurlCommand] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // New state for network interceptor
  const [websiteUrl, setWebsiteUrl] = useState('https://food.be.com.vn');
  const [interceptedRequests, setInterceptedRequests] = useState([]);
  const [isIntercepting, setIsIntercepting] = useState(false);
  const [targetPattern, setTargetPattern] = useState('gw.be.com.vn/api/v1/be-marketplace/web/restaurant/detail');
  const iframeRef = useRef(null);

  // Network interceptor setup
  useEffect(() => {
    if (isIntercepting) {
      startNetworkInterception();
    }
    return () => {
      stopNetworkInterception();
    };
  }, [isIntercepting, targetPattern]);

  const startNetworkInterception = () => {
    console.log('🕵️ Starting network interception...');
    
    // Override fetch globally to intercept requests
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const [url, options] = args;
      
      // Check if this request matches our target pattern
      if (url.includes(targetPattern)) {
        console.log('🎯 Intercepted target request:', url);
        
        const interceptedRequest = {
          id: Date.now(),
          timestamp: new Date().toLocaleTimeString(),
          url: url,
          method: options?.method || 'GET',
          headers: options?.headers || {},
          body: options?.body || null,
          type: 'fetch'
        };
        
        setInterceptedRequests(prev => [interceptedRequest, ...prev]);
      }
      
      // Continue with original request
      return originalFetch(...args);
    };

    // Also intercept XMLHttpRequest
    const originalXHR = window.XMLHttpRequest;
    window.XMLHttpRequest = function() {
      const xhr = new originalXHR();
      const originalOpen = xhr.open;
      const originalSend = xhr.send;
      
      xhr.open = function(method, url, ...args) {
        this._method = method;
        this._url = url;
        return originalOpen.apply(this, [method, url, ...args]);
      };
      
      xhr.send = function(data) {
        if (this._url && this._url.includes(targetPattern)) {
          console.log('🎯 Intercepted XHR request:', this._url);
          
          const interceptedRequest = {
            id: Date.now(),
            timestamp: new Date().toLocaleTimeString(),
            url: this._url,
            method: this._method || 'GET',
            headers: this.getAllResponseHeaders ? {} : {},
            body: data || null,
            type: 'xhr'
          };
          
          setInterceptedRequests(prev => [interceptedRequest, ...prev]);
        }
        
        return originalSend.apply(this, [data]);
      };
      
      return xhr;
    };
  };

  const stopNetworkInterception = () => {
    console.log('🛑 Stopping network interception...');
    // Note: In a real app, you'd want to restore original functions
    // For this demo, we'll just stop the interception flag
  };

  const handleInterceptToggle = () => {
    setIsIntercepting(!isIntercepting);
    if (!isIntercepting) {
      setInterceptedRequests([]); // Clear previous requests
    }
  };

  const executeInterceptedRequest = async (interceptedReq) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      console.log('🚀 Executing intercepted request:', interceptedReq);
      
      const requestConfig = {
        url: interceptedReq.url,
        method: interceptedReq.method,
        headers: interceptedReq.headers,
        data: interceptedReq.body ? JSON.parse(interceptedReq.body) : null
      };

      const result = await makeApiRequest(requestConfig);
      setResponse(result);
      
    } catch (err) {
      console.error('❌ Request failed:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const parseCurlCommand = (curl) => {
    try {
      const lines = curl.trim().split('\n');
      const firstLine = lines[0];
      
      // Extract URL
      const urlMatch = firstLine.match(/curl\s+'([^']+)'/);
      if (!urlMatch) throw new Error('Could not find URL in curl command');
      
      const url = urlMatch[1];
      let method = 'GET';
      let headers = {};
      let data = null;

      // Parse headers and data
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (line.startsWith('-H ')) {
          const headerMatch = line.match(/-H\s+'([^:]+):\s*([^']+)'/);
          if (headerMatch) {
            headers[headerMatch[1]] = headerMatch[2];
          }
        } else if (line.startsWith('--data-raw ')) {
          const dataMatch = line.match(/--data-raw\s+'(.+)'/);
          if (dataMatch) {
            try {
              data = JSON.parse(dataMatch[1]);
              method = 'POST';
            } catch (e) {
              data = dataMatch[1];
              method = 'POST';
            }
          }
        }
      }

      return { url, method, headers, data };
    } catch (error) {
      throw new Error(`Failed to parse cURL command: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!curlCommand.trim()) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const requestConfig = parseCurlCommand(curlCommand);
      const result = await makeApiRequest(requestConfig);
      setResponse(result);
    } catch (err) {
      console.error('❌ Request failed:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🕷️ Food Crawler - Network Interceptor
        </h1>
        <p className="text-gray-600">
          Automatically intercept API requests from websites or test cURL commands
        </p>
      </div>

      {/* Network Interceptor Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
          🕵️ Network Interceptor
          <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${
            isIntercepting ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {isIntercepting ? 'ACTIVE' : 'INACTIVE'}
          </span>
        </h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website URL to monitor:
              </label>
              <input
                type="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://food.be.com.vn"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target API pattern:
              </label>
              <input
                type="text"
                value={targetPattern}
                onChange={(e) => setTargetPattern(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="gw.be.com.vn/api/v1/be-marketplace"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleInterceptToggle}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                isIntercepting
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isIntercepting ? '🛑 Stop Intercepting' : '🕵️ Start Intercepting'}
            </button>
            
            <button
              onClick={() => setInterceptedRequests([])}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md font-medium transition-colors"
            >
              🗑️ Clear Requests
            </button>
          </div>
        </div>

        {/* Intercepted Requests List */}
        {interceptedRequests.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              🎯 Intercepted Requests ({interceptedRequests.length})
            </h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {interceptedRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white p-3 rounded-md border border-gray-200 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          req.method === 'POST' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {req.method}
                        </span>
                        <span className="text-xs text-gray-500">{req.timestamp}</span>
                        <span className="text-xs text-gray-400">({req.type})</span>
                      </div>
                      <div className="text-sm text-gray-700 truncate" title={req.url}>
                        {req.url}
                      </div>
                    </div>
                    <button
                      onClick={() => executeInterceptedRequest(req)}
                      className="ml-3 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-md transition-colors"
                      disabled={loading}
                    >
                      🚀 Execute
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>💡 How to use:</strong>
          </p>
          <ol className="text-sm text-blue-700 mt-1 ml-4 list-decimal">
            <li>Click "Start Intercepting" to monitor network requests</li>
            <li>Open the website in another tab: <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="underline">{websiteUrl}</a></li>
            <li>Browse the website and trigger API calls (search restaurants, view details, etc.)</li>
            <li>Matching requests will appear below automatically</li>
            <li>Click "Execute" on any request to test it through our proxy</li>
          </ol>
        </div>
      </div>

      {/* Original cURL Tester Section */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          📝 Manual cURL Tester
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="curl" className="block text-sm font-medium text-gray-700 mb-2">
              Paste your cURL command:
            </label>
            <textarea
              id="curl"
              value={curlCommand}
              onChange={(e) => setCurlCommand(e.target.value)}
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              placeholder="curl 'https://api.example.com/endpoint' -H 'Authorization: Bearer token' --data-raw '{...}'"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading || !curlCommand.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            {loading ? '🔄 Processing...' : '🚀 Execute Request'}
          </button>
        </form>
      </div>

      {/* Results Section */}
      {(loading || error || response) && (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">📊 Response</h2>
          
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Making request...</span>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="text-red-400">❌</div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700 whitespace-pre-wrap">{error}</div>
                </div>
              </div>
            </div>
          )}
          
          {response && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex">
                <div className="text-green-400">✅</div>
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-medium text-green-800">Success</h3>
                  <div className="mt-2">
                    <pre className="text-sm text-gray-700 bg-white p-3 rounded border overflow-auto max-h-96">
                      {JSON.stringify(response, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CurlTester; 