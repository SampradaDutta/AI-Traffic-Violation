import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Menu, 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  Settings,
  RefreshCw,
  Wifi,
  WifiOff
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

interface NavbarProps {
  toggleSidebar: () => void
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const { theme, toggleTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState('')
  const [isLive] = useState(true)

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 right-0 h-16 z-40 flex items-center justify-between px-6 
        ${theme === 'dark' 
          ? 'bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50' 
          : 'bg-white/80 backdrop-blur-xl border-b border-gray-200'
        }`}
      style={{ left: '16rem' }}
    >
      {/* Left section */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className={`p-2 rounded-lg transition-colors ${
            theme === 'dark' 
              ? 'hover:bg-slate-700 text-slate-400 hover:text-white' 
              : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
          }`}
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search */}
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
            theme === 'dark' ? 'text-slate-500' : 'text-gray-400'
          }`} />
          <input
            type="text"
            placeholder="Search violations, locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-80 pl-10 pr-4 py-2 rounded-xl text-sm transition-all
              ${theme === 'dark'
                ? 'bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
              }`}
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {/* Status indicator */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
          isLive 
            ? 'bg-emerald-500/10 border border-emerald-500/30' 
            : 'bg-red-500/10 border border-red-500/30'
        }`}>
          {isLive ? (
            <>
              <Wifi className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-medium text-emerald-400">Live</span>
            </>
          ) : (
            <>
              <WifiOff className="w-4 h-4 text-red-400" />
              <span className="text-xs font-medium text-red-400">Offline</span>
            </>
          )}
        </div>

        {/* Refresh */}
        <button className={`p-2 rounded-lg transition-colors ${
          theme === 'dark' 
            ? 'hover:bg-slate-700 text-slate-400 hover:text-white' 
            : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
        }`}>
          <RefreshCw className="w-5 h-5" />
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg transition-colors ${
            theme === 'dark' 
              ? 'hover:bg-slate-700 text-slate-400 hover:text-white' 
              : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
          }`}
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications */}
        <button className={`relative p-2 rounded-lg transition-colors ${
          theme === 'dark' 
            ? 'hover:bg-slate-700 text-slate-400 hover:text-white' 
            : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
        }`}>
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Settings */}
        <button className={`p-2 rounded-lg transition-colors ${
          theme === 'dark' 
            ? 'hover:bg-slate-700 text-slate-400 hover:text-white' 
            : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
        }`}>
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </motion.nav>
  )
}
