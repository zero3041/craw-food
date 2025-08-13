import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.text());

// Proxy endpoint
app.all('/proxy', async (req, res) => {
  try {
    const { url, method = 'GET', headers = {}, data } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    console.log(`🚀 Proxying ${method} request to: ${url}`);
    
    // Clean headers - remove problematic ones
    const cleanHeaders = { ...headers };
    delete cleanHeaders['host'];
    delete cleanHeaders['origin'];
    delete cleanHeaders['referer'];
    delete cleanHeaders['sec-ch-ua'];
    delete cleanHeaders['sec-ch-ua-mobile'];
    delete cleanHeaders['sec-ch-ua-platform'];
    delete cleanHeaders['sec-fetch-dest'];
    delete cleanHeaders['sec-fetch-mode'];
    delete cleanHeaders['sec-fetch-site'];

    const config = {
      method: method.toLowerCase(),
      url,
      headers: cleanHeaders,
      timeout: 30000, // 30 second timeout
      validateStatus: () => true, // Accept all status codes
    };

    if (data && (method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT')) {
      config.data = data;
    }

    const response = await axios(config);
    
    console.log(`✅ Proxy response: ${response.status} ${response.statusText}`);
    
    // Return response with CORS headers
    res.status(response.status).json({
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });

  } catch (error) {
    console.error('❌ Proxy error:', error.message);
    
    if (error.response) {
      res.status(error.response.status).json({
        error: `API Error: ${error.response.status} - ${error.response.statusText}`,
        data: error.response.data
      });
    } else if (error.request) {
      res.status(500).json({
        error: 'Network error - Could not reach the target API'
      });
    } else {
      res.status(500).json({
        error: `Request error: ${error.message}`
      });
    }
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'CORS Proxy Server is running',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🌐 CORS Proxy Server running on http://localhost:${PORT}`);
  console.log(`📡 Proxy endpoint: http://localhost:${PORT}/proxy`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log(`🚀 Ready to bypass CORS restrictions!`);
}); 