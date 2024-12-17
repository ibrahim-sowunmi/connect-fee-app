'use client'
import { useState } from 'react'

interface ConfigMenuProps {
  isOpen: boolean
  onClose: () => void
  onIntegrationTypeChange: (type: 'connect' | 'direct') => void
  integrationType: 'connect' | 'direct'
  onUserCountryChange: (country: string) => void
  onPlatformCountryChange: (country: string) => void
  onPresentmentCurrencyChange: (currency: string) => void
  onFundFlowChange: (flow: 'direct' | 'destination' | 'separate') => void
  fundFlow: 'direct' | 'destination' | 'separate'
}

const currencies = [
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'JPY', name: 'Japanese Yen' },
]

const countries = [
  { code: 'US', name: 'United States', emoji: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', emoji: '🇬🇧' },
  { code: 'EU', name: 'European Union', emoji: '🇪🇺' },
  { code: 'JP', name: 'Japan', emoji: '🇯🇵' },
]

export default function ConfigMenu({ isOpen, onClose, onIntegrationTypeChange, onUserCountryChange, onPlatformCountryChange, onPresentmentCurrencyChange, onFundFlowChange, fundFlow }: ConfigMenuProps) {
  const [connectType, setConnectType] = useState('connect')

  const handleIntegrationTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newType = e.target.value as 'connect' | 'direct'
    setConnectType(newType)
    onIntegrationTypeChange(newType)
  }

  const handleUserCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUserCountryChange(e.target.value)
  }

  const handlePresentmentCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPresentmentCurrencyChange(e.target.value)
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/30 transition-opacity z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Sliding panel */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Configuration</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Integration Type Radio Buttons */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Integration Type
              </label>
              <div className="space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="connectType"
                    value="connect"
                    checked={connectType === 'connect'}
                    onChange={handleIntegrationTypeChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Connect</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="connectType"
                    value="direct"
                    checked={connectType === 'direct'}
                    onChange={handleIntegrationTypeChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Direct</span>
                </label>
              </div>
            </div>

            {/* Presentment Currency - Common for both */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Presentment Currency
              </label>
              <select 
                className="w-full border rounded-md p-2"
                onChange={handlePresentmentCurrencyChange}
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Connect Options */}
            {connectType === 'connect' && (
              <>
                <div className="form-group relative">
                  <div className="flex items-center gap-2 mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Fund Flow
                    </label>
                    <div className="relative group">
                      <div className="cursor-help">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="absolute left-5 -top-2 w-48 p-2 bg-black text-white text-xs rounded shadow-lg 
                        opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                        transition-all duration-200 z-[9999] ml-2
                        before:content-[''] before:absolute before:top-3 before:-left-2 
                        before:border-8 before:border-transparent before:border-r-black">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
                      </div>
                    </div>
                  </div>
                  <select 
                    className="w-full border rounded-md p-2"
                    onChange={(e) => onFundFlowChange(e.target.value as 'direct' | 'destination' | 'separate')}
                    defaultValue="destination"
                  >
                    <option value="direct">Direct Charges</option>
                    <option value="destination">Destination Charges</option>
                    <option value="separate">Separate Charges and Transfers</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    User Bank Account Country
                  </label>
                  <select 
                    className="w-full border rounded-md p-2"
                    onChange={handleUserCountryChange}
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.emoji} {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Platform Country
                  </label>
                  <select 
                    className="w-full border rounded-md p-2"
                    onChange={(e) => onPlatformCountryChange(e.target.value)}
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.emoji} {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Connected Account Country
                  </label>
                  <select className="w-full border rounded-md p-2">
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.emoji} {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {/* Direct Options */}
            {connectType === 'direct' && (
              <>
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    User Country
                  </label>
                  <select 
                    className="w-full border rounded-md p-2"
                    onChange={handleUserCountryChange}
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.emoji} {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Direct Account Country
                  </label>
                  <select className="w-full border rounded-md p-2">
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.emoji} {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>

          {/* Add this at the bottom of the menu, after all other content */}
          <div className="mt-8 pt-4 border-t border-gray-200">
            <a 
              href="https://google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-stripe-purple text-white py-3 px-4 rounded-md flex items-center justify-center hover:bg-opacity-90 transition-colors font-open-sans"
            >
              <span className="mr-2">Ask More Questions</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  )
} 