import { useState } from 'react';
import { makeApiRequest } from '../utils/apiService';

const NetworkMonitor = () => {
  const [capturedRequests, setCapturedRequests] = useState([]);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleRequestInput = (requestData) => {
    try {
      const parsed = JSON.parse(requestData);
      const newRequest = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        ...parsed
      };
      setCapturedRequests(prev => [newRequest, ...prev]);
    } catch (err) {
      alert('Invalid JSON format. Please check your input.');
    }
  };

  const executeRequest = async (request) => {
    setLoading(true);
    setError(null);
    setResponse(null);
    setSelectedRequest(request);

    try {
      const result = await makeApiRequest({
        url: request.url,
        method: request.method || 'GET',
        headers: request.headers || {},
        data: request.data || null
      });
      setResponse(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearRequests = () => {
    setCapturedRequests([]);
    setResponse(null);
    setError(null);
    setSelectedRequest(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🕵️ Network Request Monitor
        </h1>
        <p className="text-gray-600">
          Capture and replay network requests from any website
        </p>
      </div>

      {/* Instructions Section */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 border border-yellow-200">
        <h2 className="text-xl font-semibold text-orange-900 mb-4">
          📋 How to Capture Network Requests
        </h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">🔧 Method 1: Browser DevTools</h3>
              <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                <li>Open <strong>food.be.com.vn</strong> in a new tab</li>
                <li>Press <kbd className="bg-gray-200 px-1 rounded">F12</kbd> to open DevTools</li>
                <li>Go to <strong>Network</strong> tab</li>
                <li>Browse the website (search restaurants, view details)</li>
                <li>Find requests containing <code className="bg-gray-100 px-1 rounded">gw.be.com.vn</code></li>
                <li>Right-click → <strong>Copy as cURL</strong></li>
                <li>Paste into the cURL tester below</li>
              </ol>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">🎯 Method 2: Request JSON</h3>
              <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                <li>In DevTools Network tab, click on a request</li>
                <li>Copy the request details as JSON:</li>
                <li>
                  <pre className="text-xs bg-gray-100 p-2 rounded mt-2 overflow-x-auto">
{`{
  "url": "https://gw.be.com.vn/api/...",
  "method": "POST",
  "headers": {
    "authorization": "Bearer ...",
    "content-type": "application/json"
  },
  "data": { ... }
}`}
                  </pre>
                </li>
                <li>Paste into the JSON input below</li>
              </ol>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>💡 Pro Tip:</strong> Look for requests to <code>gw.be.com.vn/api/v1/be-marketplace/web/restaurant/detail</code> 
              when you click on restaurant details or search for restaurants.
            </p>
          </div>
        </div>
      </div>

      {/* JSON Request Input */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          📝 Add Request (JSON Format)
        </h2>
        
        <div className="space-y-4">
          <textarea
            className="w-full h-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            placeholder={`Paste request JSON here:
{
  "url": "https://gw.be.com.vn/api/v1/be-marketplace/web/restaurant/detail",
  "method": "POST",
  "headers": {
    "authorization": "Bearer your-token",
    "content-type": "application/json"
  },
  "data": {
    "restaurant_id": "42715",
    "locale": "vi"
  }
}`}
            onBlur={(e) => {
              if (e.target.value.trim()) {
                handleRequestInput(e.target.value);
                e.target.value = '';
              }
            }}
          />
          <p className="text-sm text-gray-500">
            Paste your JSON and click outside the textarea to add it to the list
          </p>
        </div>
      </div>

      {/* Captured Requests */}
      {capturedRequests.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              🎯 Captured Requests ({capturedRequests.length})
            </h2>
            <button
              onClick={clearRequests}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm transition-colors"
            >
              🗑️ Clear All
            </button>
          </div>
          
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {capturedRequests.map((req) => (
              <div
                key={req.id}
                className={`p-4 rounded-md border transition-colors cursor-pointer ${
                  selectedRequest?.id === req.id
                    ? 'border-blue-300 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedRequest(req)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        req.method === 'POST' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {req.method || 'GET'}
                      </span>
                      <span className="text-xs text-gray-500">{req.timestamp}</span>
                    </div>
                    <div className="text-sm text-gray-700 truncate" title={req.url}>
                      {req.url}
                    </div>
                    {req.data && (
                      <div className="text-xs text-gray-500 mt-1">
                        Has request body: {JSON.stringify(req.data).substring(0, 100)}...
                      </div>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      executeRequest(req);
                    }}
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

      {/* Request Details */}
      {selectedRequest && (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            🔍 Request Details
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL:</label>
              <code className="block text-sm bg-gray-100 p-2 rounded">{selectedRequest.url}</code>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Method:</label>
              <span className="text-sm">{selectedRequest.method || 'GET'}</span>
            </div>
            
            {selectedRequest.headers && Object.keys(selectedRequest.headers).length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Headers:</label>
                <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                  {JSON.stringify(selectedRequest.headers, null, 2)}
                </pre>
              </div>
            )}
            
            {selectedRequest.data && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Request Body:</label>
                <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                  {JSON.stringify(selectedRequest.data, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Response Section */}
      {(loading || error || response) && (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">📊 Response</h2>
          
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Executing request...</span>
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

      {/* Quick Examples */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          🎯 Quick Test Examples
        </h2>
        
        <div className="space-y-3">
          <button
            onClick={() => handleRequestInput(JSON.stringify({
              url: "https://gw.be.com.vn/api/v1/be-marketplace/web/restaurant/detail",
              method: "POST",
              headers: {
                "accept": "*/*",
                "accept-language": "vi",
                "content-type": "application/json",
                "authorization": "Bearer eyJhbGciOiJIUzUxMiIsImtpZCI6IlQwVm9NazF0Y0c5YVYzUnJWMGN3ZVZNeU5YQldibFpUWlZWR2RWVkZVakJWU0ZwSFkwWk9iRlpWTlZCWk0wVjRVMFJXUW1GdGVFZGpSMHAzVW10M01tSnVjR3RUTUhoRVV6Rm9WMDVxU25GamF6bFZVbXRKTVZwR1drUlJhemx2VjFaS1dGbHJhekpaYmtreFlWZEdORkV5UmtWa1NGSkRXak5PYlZwRmNHOWhWM2haWTFWU1ZsWXhXVE5TYmswelUwaHdjMU5YWjNoT01IUk5aRWRHUzFsWGNGZFNNMDAxVVZad05GbHJWakZqYmxwRlltNW5OR0ZYWkRKaGJtczBVMGhaZVdGdGFHeGhNbEpaWWxSS1RHSnRiRmRrVmtvMSIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxIiwiZXhwIjoxNzU1MDU3MTIxLCJ1c2VyX2lkIjozMTc1NDc4LCJzZXNzaW9uX2lkIjoiMDM1ODg0MDk0OTNlOWExNDg3NTgyOWVjNzczOTJhNWEiLCJ2ZW5kb3IiOiJXZWIgRGVsaXZlcnkifQ.3LXaSmf4MVRslRtqel4bSNi17FUvzjn0eFf9wjCQjAQV8Onirn9dDwCd0sRGfCVOP3EUdLusdvOxurT2r-G5og"
              },
              data: {
                "restaurant_id": "42715",
                "locale": "vi",
                "app_version": "11291",
                "version": "1.1.291",
                "device_type": 3,
                "latitude": 20.997957,
                "longitude": 105.794586
              }
            }))}
            className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md transition-colors"
          >
            <div className="font-medium text-blue-900">📍 Restaurant Detail Request</div>
            <div className="text-sm text-blue-700">Add example restaurant detail API call</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NetworkMonitor; 