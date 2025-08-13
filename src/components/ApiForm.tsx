import { useState } from 'react'

type ApiFormProps = {
  onSubmit: (curlCommand: string) => void
  loading: boolean
  loadingStep: string
}

const ApiForm = ({ onSubmit, loading, loadingStep }: ApiFormProps) => {
  const [curlCommand, setCurlCommand] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!curlCommand.trim()) {
      setError('Please enter a cURL command')
      return
    }
    setError('')
    onSubmit(curlCommand)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurlCommand(e.target.value)
    if (error) setError('')
  }

  const exampleCurl = `curl 'https://gw.be.com.vn/api/v1/be-marketplace/web/restaurant/detail' \\
  -H 'accept: */*' \\
  -H 'accept-language: vi' \\
  -H 'authorization: Bearer your-token' \\
  --data-raw '{"restaurant_id":"77744","locale":"vi"}'`

  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl shadow-2xl overflow-hidden mb-12">
      <div className="bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-purple-500/20 backdrop-blur-sm p-8 border-b border-white/10">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 rounded-3xl flex items-center justify-center shadow-2xl">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce flex items-center justify-center">
              <span className="text-xs font-bold text-white">⚡</span>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-black text-white mb-2">🚀 API Data Extractor</h2>
            <p className="text-white/80 text-lg">Paste your cURL command and extract structured data instantly</p>
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl px-4 py-2 border border-white/20">
              <span className="text-emerald-400 font-bold text-sm">✨ Pro</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <label htmlFor="curl-input" className="block text-lg font-bold text-white mb-4 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              Enter cURL Command
            </label>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative">
                <textarea
                  id="curl-input"
                  value={curlCommand}
                  onChange={handleInputChange}
                  placeholder={exampleCurl}
                  className="w-full h-48 px-6 py-4 backdrop-blur-md bg-white/5 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 resize-none font-mono text-sm text-white placeholder-white/40 transition-all duration-300"
                  disabled={loading}
                />
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                  <div className="backdrop-blur-sm bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-xl text-xs font-bold border border-emerald-400/30">cURL</div>
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3 text-white/60">
              <div className="w-6 h-6 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm leading-relaxed">
                <strong className="text-white">Pro Tip:</strong> Open DevTools (F12) → Network tab → Execute your request → Right-click → Copy as cURL
              </p>
            </div>
          </div>

          {error && (
            <div className="backdrop-blur-md bg-red-500/10 border border-red-500/30 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l-2.293-2.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-red-200 text-lg">Error</h4>
                  <p className="text-red-300">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
            <button
              type="submit"
              disabled={loading}
              className="relative w-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 hover:from-emerald-600 hover:via-cyan-600 hover:to-purple-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-black py-6 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-4 shadow-2xl transform hover:scale-[1.02] disabled:transform-none disabled:hover:scale-100 text-lg"
            >
              {loading ? (
                <>
                  <div className="relative">
                    <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold">Processing Request...</span>
                    {loadingStep && <span className="text-sm text-white/80 mt-1">{loadingStep}</span>}
                  </div>
                </>
              ) : (
                <>
                  <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>🚀 Extract Data Now</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 backdrop-blur-sm bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-white/10">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center shadow-2xl flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.663 17h4.673a1.5 1.5 0 001.2-2.4l-2.336-3.115a1.5 1.5 0 00-2.4 0L8.463 14.6A1.5 1.5 0 009.663 17zM12 5a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-bold textWhite mb-3 text-lg flex items-center">💡 Advanced Usage Guide</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm text-white/80">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-emerald-400 font-bold text-xs">1</span>
                    </div>
                    <div>
                      <strong className="text-white">Capture Request:</strong>
                      <p className="text-white/60 mt-1">Open browser DevTools, go to Network tab, perform the action, then copy the request as cURL</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-400 font-bold text-xs">2</span>
                    </div>
                    <div>
                      <strong className="text-white">Paste & Extract:</strong>
                      <p className="text-white/60 mt-1">Paste the complete cURL command above and click extract to process the API response</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-400 font-bold text-xs">3</span>
                    </div>
                    <div>
                      <strong className="text-white">Copy Results:</strong>
                      <p className="text-white/60 mt-1">Click individual items or "Copy All" to get tab-separated data ready for Excel/Sheets</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-pink-400 font-bold text-xs">4</span>
                    </div>
                    <div>
                      <strong className="text-white">Export Data:</strong>
                      <p className="text-white/60 mt-1">Paste directly into spreadsheets - data automatically separates into columns</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApiForm 