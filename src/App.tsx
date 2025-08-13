import { useState } from 'react'
import ApiForm from '@/components/ApiForm'
import ProductList from '@/components/ProductList'
import DemoData from '@/components/DemoData'
import GrabFoodScraper from '@/components/GrabFoodScraper'
import { parseCurlCommand, extractProductData } from '@/utils/curlParser'
import { makeApiRequest } from '@/utils/apiService'
import type { ViewProductList } from '@/types/view'
import type { BeResponse } from '@/types/be'

function App() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<ViewProductList | null>(null)
  const [error, setError] = useState('')
  const [loadingStep, setLoadingStep] = useState('')
  const [activeTab, setActiveTab] = useState<'api' | 'grab'>('api')

  const handleCurlSubmit = async (curlCommand: string) => {
    setLoading(true)
    setError('')
    setData(null)
    setLoadingStep('Parsing cURL command...')

    try {
      const requestConfig = parseCurlCommand(curlCommand)
      setLoadingStep('Making API request...')
      const responseData = await makeApiRequest<BeResponse>(requestConfig)
      setLoadingStep('Extracting product data...')
      const extractedData = extractProductData(responseData)
      setData(extractedData)
      setLoadingStep('')
    } catch (err: any) {
      setError(err.message)
      setLoadingStep('')
    } finally {
      setLoading(false)
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'api':
        return (
          <>
            <ApiForm onSubmit={handleCurlSubmit} loading={loading} loadingStep={loadingStep} />
            {error && (
              <div className="backdrop-blur-md bg-red-500/10 border border-red-500/20 rounded-3xl p-8 mb-8 shadow-2xl">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l-2.293-2.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3">🚨 API Request Failed</h3>
                    <p className="text-red-200 text-lg mb-4">{error}</p>
                    <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10">
                      <h4 className="font-bold text-white mb-3 text-lg">🔧 Troubleshooting Steps:</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-white/80">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                            <span><strong>Check Console:</strong> Open DevTools (F12) → Console for detailed logs</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                            <span><strong>CORS Extension:</strong> Install "CORS Unblock" browser extension</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                            <span><strong>Chrome Flags:</strong> Run with --disable-web-security</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                            <span><strong>Network:</strong> Check internet connection</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                            <span><strong>API Status:</strong> Verify API endpoint is working</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                            <span><strong>Demo Mode:</strong> Try demo data below</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 p-4 bg-blue-500/10 rounded-xl border border-blue-400/20">
                        <p className="text-blue-200 text-sm">
                          <strong>💡 Pro Tip:</strong> Our app automatically tries multiple CORS proxy services. 
                          Check the browser console to see which proxies were attempted.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {data && <ProductList data={data} />}

            {!loading && !data && !error && (
              <div className="space-y-8">
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-12 text-center shadow-2xl">
                  <div className="relative mb-8">
                    <div className="w-32 h-32 bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                      <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                      </svg>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
                  </div>
                  <h2 className="text-4xl font-black text-white mb-4">🚀 Ready to Extract Data</h2>
                  <p className="text-white/80 text-xl mb-8 max-w-2xl mx-auto">
                    Paste your cURL command above and watch the magic happen. 
                    Our advanced CORS bypass system will handle the rest.
                  </p>
                  <div className="flex items-center justify-center space-x-8 text-white/60">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-emerald-400 rounded-full animate-pulse"></div>
                      <span className="font-semibold">CORS Bypass</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse animation-delay-1000"></div>
                      <span className="font-semibold">Multi-Proxy</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-purple-400 rounded-full animate-pulse animation-delay-2000"></div>
                      <span className="font-semibold">Auto-Retry</span>
                    </div>
                  </div>
                </div>
                <DemoData />
              </div>
            )}
          </>
        )
      case 'grab':
        return <GrabFoodScraper />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      <div className="relative z-10">
        <header className="backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-50">
          <div className="container mx-auto px-6 py-6 max-w-7xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-3xl font-black text-white bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Food Crawler Pro</h1>
                  <p className="text-white/70 font-medium">⚡ Advanced API Data Extraction with CORS Bypass</p>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="backdrop-blur-sm bg-white/10 rounded-full px-4 py-2 border border-white/20">
                  <span className="text-emerald-400 font-semibold text-sm">✨ Online</span>
                </div>
                <div className="backdrop-blur-sm bg-white/10 rounded-full px-4 py-2 border border-white/20">
                  <span className="text-white/80 text-sm">v2.1</span>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="backdrop-blur-md bg-white/5 border-b border-white/10 sticky top-24 z-40">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex space-x-1 py-4">
              <button onClick={() => setActiveTab('api')} className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'api' ? 'bg-white/20 text-white shadow-lg border border-white/20' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
                🌐 API Extractor
              </button>
              <button onClick={() => setActiveTab('grab')} className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'grab' ? 'bg-white/20 text-white shadow-lg border border-white/20' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
                🍽️ Grab Food Scraper
              </button>
            </div>
          </div>
        </div>
        <main className="container mx-auto px-6 py-12 max-w-7xl">{renderTabContent()}</main>
        <footer className="backdrop-blur-md bg-white/5 border-t border-white/10 mt-20">
          <div className="container mx-auto px-6 py-12 max-w-7xl">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Food Crawler Pro</h3>
              </div>
              <p className="text-white/70 text-lg mb-4">🌟 Professional API data extraction with advanced CORS bypass technology</p>
              <p className="text-white/50 mb-6">Extract, format, and export data from any API with enterprise-grade reliability</p>
              <div className="flex items-center justify-center space-x-8 text-sm text-white/40">
                <span className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>React 18 + Vite</span>
                </span>
                <span className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span>Tailwind CSS v4</span>
                </span>
                <span className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>CORS Bypass</span>
                </span>
                <span className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <span>Made with 💎</span>
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App 