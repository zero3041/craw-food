import axios, { AxiosRequestConfig } from 'axios'

const LOCAL_PROXY = 'http://localhost:3001/proxy'

type RequestConfig = {
  url: string
  method: string
  headers?: Record<string, string | undefined>
  data?: any
}

// Specific proxy response types
type AllOriginsResponse = {
  contents: string
  status: { url: string; content_type: string; http_code: number; response_time: number }
}

type RequestResult<T> = T

export async function makeApiRequest(config: AxiosRequestConfig): Promise<any> {
  const methods = [
    // Try local proxy first (skip direct call to avoid CORS logs)
    () => axios.post('http://localhost:3001/proxy', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data
    }),
    
    // Fallback to external proxy (if needed)
    () => axios.post('https://api.allorigins.win/raw', {
      url: config.url,
      method: config.method || 'GET',
      headers: config.headers,
      data: config.data
    })
  ];

  for (let i = 0; i < methods.length; i++) {
    try {
      const response = await methods[i]();
      return response.data;
    } catch (error: any) {
      if (i === methods.length - 1) {
        throw error;
      }
    }
  }
}

const makeLocalProxyRequest = async <T = unknown>(requestConfig: RequestConfig): Promise<T> => {
  const { url, method = 'GET', headers, data } = requestConfig
  const response = await axios.post(
    LOCAL_PROXY,
    { url, method, headers, data },
    {
      timeout: 30000,
      headers: { 'Content-Type': 'application/json' },
    },
  )
  return response.data.data as T
}

const CORS_PROXIES: Array<{ name: string; url: string; type: 'allorigins' | 'simple' }> = [
  { name: 'AllOrigins', url: 'https://api.allorigins.win/get?url=', type: 'allorigins' },
  { name: 'ThingProxy', url: 'https://thingproxy.freeboard.io/fetch/', type: 'simple' },
  { name: 'CORS.SH', url: 'https://cors.sh/', type: 'simple' },
  { name: 'Proxy6', url: 'https://api.codetabs.com/v1/proxy/?quest=', type: 'simple' },
]

const makeExternalProxyRequest = async <T = unknown>(requestConfig: RequestConfig): Promise<T> => {
  const { url } = requestConfig

  for (let i = 0; i < CORS_PROXIES.length; i++) {
    const proxy = CORS_PROXIES[i]
    try {
      let config: AxiosRequestConfig
      if (proxy.type === 'allorigins') {
        const proxyUrl = proxy.url + encodeURIComponent(url)
        config = { method: 'GET', url: proxyUrl, timeout: 20000 }
      } else {
        const proxyUrl = proxy.url + url
        config = {
          method: 'GET',
          url: proxyUrl,
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
          timeout: 20000,
        }
      }

      const response = await axios(config)

      if (proxy.type === 'allorigins') {
        const responseData = response.data as AllOriginsResponse
        // AllOrigins always returns JSON with contents string; try to parse JSON
        try {
          return JSON.parse(responseData.contents) as T
        } catch {
          // If not JSON, return raw contents as any
          return (responseData.contents as unknown) as T
        }
      }

      // simple text/json proxy branch
      const simpleData = response.data as unknown
      if (typeof simpleData === 'string') {
        try {
          return JSON.parse(simpleData) as T
        } catch {
          return simpleData as T
        }
      }
      return simpleData as T
    } catch (proxyError) {
      if (i === CORS_PROXIES.length - 1) {
        throw new Error(
          'All CORS proxies failed. This might be due to:\n• Network connectivity issues\n• API endpoint is down\n• Firewall blocking requests\n\nTry:\n• Run local proxy: npm run proxy\n• Check your internet connection\n• Use a VPN\n• Try again later',
        )
      }
      continue
    }
  }
  return Promise.reject(new Error('No proxy succeeded'))
} 