import { useState } from 'react'
import BeFoodScraper from '@/components/BeFoodScraper'
import GrabFoodScraper from '@/components/GrabFoodScraper'

function App() {
  const [activeTab, setActiveTab] = useState<'be' | 'grab'>('be')

  const renderTabContent = () => {
    switch (activeTab) {
      case 'be':
        return <BeFoodScraper />
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
              <button onClick={() => setActiveTab('be')} className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'be' ? 'bg-white/20 text-white shadow-lg border border-white/20' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
                🐝 Be Food
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