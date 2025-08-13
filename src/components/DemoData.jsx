import ProductList from './ProductList';

const DemoData = () => {
  const sampleData = {
    products: [
      {
        id: 1,
        name: "Premium Wagyu Burger",
        price: 45000,
        displayPrice: "45.000",
        oldPrice: 45000,
        displayOldPrice: "45.000",
        description: "Authentic Japanese Wagyu beef with truffle sauce, premium cheese, and artisan bun",
        image: "",
        category: "Premium",
        currency: "₫",
        isActive: true,
        offerText: "",
        hasDiscount: false
      },
      {
        id: 2,
        name: "Lobster Roll Deluxe",
        price: 38000,
        displayPrice: "38.000",
        oldPrice: 45000,
        displayOldPrice: "45.000",
        description: "Fresh Maine lobster with avocado, mixed greens, and signature mayo",
        image: "",
        category: "Seafood",
        currency: "₫",
        isActive: true,
        offerText: "Limited Time",
        hasDiscount: true
      },
      {
        id: 3,
        name: "Truffle Pasta Supreme",
        price: 32000,
        displayPrice: "32.000",
        oldPrice: 32000,
        displayOldPrice: "32.000",
        description: "Handmade pasta with black truffle, parmesan, and wild mushrooms",
        image: "",
        category: "Italian",
        currency: "₫",
        isActive: true,
        offerText: "",
        hasDiscount: false
      },
      {
        id: 4,
        name: "Dragon Roll Sushi",
        price: 42000,
        displayPrice: "42.000",
        oldPrice: 42000,
        displayOldPrice: "42.000",
        description: "Premium sushi roll with eel, avocado, cucumber, and special sauce",
        image: "",
        category: "Japanese",
        currency: "₫",
        isActive: true,
        offerText: "",
        hasDiscount: false
      },
      {
        id: 5,
        name: "Ribeye Steak Premium",
        price: 55000,
        displayPrice: "55.000",
        oldPrice: 65000,
        displayOldPrice: "65.000",
        description: "Grade A ribeye steak with herb butter, roasted vegetables, and red wine reduction",
        image: "",
        category: "Steakhouse",
        currency: "₫",
        isActive: true,
        offerText: "Chef's Special",
        hasDiscount: true
      },
      {
        id: 6,
        name: "Chocolate Lava Cake",
        price: 18000,
        displayPrice: "18.000",
        oldPrice: 18000,
        displayOldPrice: "18.000",
        description: "Warm chocolate cake with molten center, vanilla ice cream, and berry compote",
        image: "",
        category: "Dessert",
        currency: "₫",
        isActive: true,
        offerText: "",
        hasDiscount: false
      }
    ],
    restaurantInfo: {
      name: "The Gourmet Kitchen Pro",
      address: "123 Premium District, Luxury Tower, Downtown Metropolitan",
      rating: 4.9,
      reviewCount: 2847,
      deliveryTime: 25,
      minimumOrder: "0"
    },
    currency: "₫"
  };

  return (
    <div className="space-y-8">
      {/* Premium Demo Header */}
      <div className="backdrop-blur-md bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 border border-yellow-400/30 rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="flex items-center space-x-6 mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-3xl flex items-center justify-center shadow-2xl">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full animate-bounce flex items-center justify-center">
                <span className="text-sm font-bold text-white">✨</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-3xl font-black text-white mb-2">
                🎯 Interactive Demo Experience
              </h3>
              <p className="text-white/80 text-lg">
                Experience the power of our data extraction tool with premium sample data
              </p>
            </div>
          </div>
          
          <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-6 border border-white/20">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center border border-emerald-400/30">
                  <svg className="w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <strong className="text-white font-bold">Click to Copy</strong>
                  <p className="text-white/60 text-sm">Individual product data</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-2xl flex items-center justify-center border border-cyan-400/30">
                  <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                </div>
                <div>
                  <strong className="text-white font-bold">Bulk Export</strong>
                  <p className="text-white/60 text-sm">Copy all to Excel/Sheets</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center border border-purple-400/30">
                  <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <strong className="text-white font-bold">Tab Format</strong>
                  <p className="text-white/60 text-sm">Name [TAB] Price</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Demo Product List */}
      <ProductList data={sampleData} />
      
      {/* Advanced Instructions */}
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="flex items-start space-x-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-3xl flex items-center justify-center shadow-2xl flex-shrink-0">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-black text-white mb-6 text-2xl">📚 Complete Usage Guide</h4>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="backdrop-blur-sm bg-emerald-500/10 rounded-2xl p-6 border border-emerald-400/20">
                    <h5 className="font-bold text-emerald-300 mb-3 text-lg flex items-center">
                      <span className="w-8 h-8 bg-emerald-500/20 rounded-xl flex items-center justify-center mr-3">
                        <span className="text-emerald-400 font-bold text-sm">1</span>
                      </span>
                      Capture API Request
                    </h5>
                    <ul className="space-y-2 text-white/70 text-sm">
                      <li>• Open your target website in browser</li>
                      <li>• Press F12 to open Developer Tools</li>
                      <li>• Go to Network tab and clear existing requests</li>
                      <li>• Perform the action that loads product data</li>
                      <li>• Right-click the API request → Copy as cURL</li>
                    </ul>
                  </div>
                  
                  <div className="backdrop-blur-sm bg-cyan-500/10 rounded-2xl p-6 border border-cyan-400/20">
                    <h5 className="font-bold text-cyan-300 mb-3 text-lg flex items-center">
                      <span className="w-8 h-8 bg-cyan-500/20 rounded-xl flex items-center justify-center mr-3">
                        <span className="text-cyan-400 font-bold text-sm">2</span>
                      </span>
                      Extract & Process
                    </h5>
                    <ul className="space-y-2 text-white/70 text-sm">
                      <li>• Paste the complete cURL command above</li>
                      <li>• Click "Extract Data Now" button</li>
                      <li>• Wait for automatic parsing and processing</li>
                      <li>• View structured data in beautiful table format</li>
                      <li>• See restaurant info and product details</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="backdrop-blur-sm bg-purple-500/10 rounded-2xl p-6 border border-purple-400/20">
                    <h5 className="font-bold text-purple-300 mb-3 text-lg flex items-center">
                      <span className="w-8 h-8 bg-purple-500/20 rounded-xl flex items-center justify-center mr-3">
                        <span className="text-purple-400 font-bold text-sm">3</span>
                      </span>
                      Copy & Export Data
                    </h5>
                    <ul className="space-y-2 text-white/70 text-sm">
                      <li>• Click individual rows to copy single items</li>
                      <li>• Use "Copy All" for complete dataset</li>
                      <li>• Data is automatically tab-separated</li>
                      <li>• Paste directly into Excel or Google Sheets</li>
                      <li>• Columns automatically separate: Name | Price</li>
                    </ul>
                  </div>
                  
                  <div className="backdrop-blur-sm bg-pink-500/10 rounded-2xl p-6 border border-pink-400/20">
                    <h5 className="font-bold text-pink-300 mb-3 text-lg flex items-center">
                      <span className="w-8 h-8 bg-pink-500/20 rounded-xl flex items-center justify-center mr-3">
                        <span className="text-pink-400 font-bold text-sm">4</span>
                      </span>
                      Pro Tips & Tricks
                    </h5>
                    <ul className="space-y-2 text-white/70 text-sm">
                      <li>• Works with any API that returns JSON data</li>
                      <li>• Handles authentication headers automatically</li>
                      <li>• Supports POST requests with data payload</li>
                      <li>• Use CORS extensions for cross-origin requests</li>
                      <li>• Perfect for e-commerce, food delivery, etc.</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Call to Action */}
              <div className="mt-8 backdrop-blur-sm bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-purple-500/10 rounded-2xl p-6 border border-white/20 text-center">
                <h5 className="font-black text-white text-xl mb-3">🚀 Ready to Extract Real Data?</h5>
                <p className="text-white/70 mb-4">
                  Try the demo above, then paste your own cURL command in the form to extract live data from any API!
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm text-white/60">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span>Lightning Fast</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse animation-delay-1000"></div>
                    <span>Enterprise Grade</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse animation-delay-2000"></div>
                    <span>Zero Setup</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoData; 