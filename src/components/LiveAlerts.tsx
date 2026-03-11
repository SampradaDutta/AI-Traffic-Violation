import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, AlertCircle, Info, X, Bell } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { liveAlerts } from '../data/mockData'

const severityConfig = {
  high: {
    icon: AlertTriangle,
    color: 'red',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    textColor: 'text-red-400',
    ringColor: 'ring-red-500/20'
  },
  medium: {
    icon: AlertCircle,
    color: 'amber',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    textColor: 'text-amber-400',
    ringColor: 'ring-amber-500/20'
  },
  low: {
    icon: Info,
    color: 'blue',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-400',
    ringColor: 'ring-blue-500/20'
  }
}

export default function LiveAlerts() {
  const { theme } = useTheme()
  const [alerts, setAlerts] = useState(liveAlerts)
  const [isPaused, setIsPaused] = useState(false)

  // Simulate new alerts coming in
  useEffect(() => {
    if (isPaused) return
    
    const interval = setInterval(() => {
      const newAlert = {
        id: Date.now(),
        type: ['signal_jumping', 'helmet', 'vehicle', 'wrong_lane'][Math.floor(Math.random() * 4)] as string,
        message: getRandomAlertMessage(),
        time: 'Just now',
        severity: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as 'high' | 'medium' | 'low'
      }
      setAlerts(prev => [newAlert, ...prev.slice(0, 9)])
    }, 10000)

    return () => clearInterval(interval)
  }, [isPaused])

  const getRandomAlertMessage = () => {
    const messages = [
      'Signal jumping detected at intersection',
      'No helmet detected on motorcyclist',
      'Oversized vehicle on restricted road',
      'Wrong lane usage detected',
      'Speeding vehicle detected',
      'Illegal parking detected',
      'Wrong way driving detected',
      'Red light violation detected'
    ]
    return messages[Math.floor(Math.random() * messages.length)]
  }

  const removeAlert = (id: number) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border backdrop-blur-sm h-full ${
        theme === 'dark'
          ? 'bg-slate-800/50 border-slate-700'
          : 'bg-white border-gray-200'
      }`}
    >
      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b ${
        theme === 'dark' ? 'border-slate-700' : 'border-gray-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              theme === 'dark' ? 'bg-slate-700' : 'bg-gray-100'
            }`}>
              <Bell className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
              {alerts.length}
            </span>
          </div>
          <div>
            <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Live Alerts
            </h3>
            <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
              Real-time notifications
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setIsPaused(!isPaused)}
          className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
            isPaused
              ? 'bg-emerald-500/20 text-emerald-400'
              : theme === 'dark' 
                ? 'bg-slate-700 text-slate-400 hover:text-white' 
                : 'bg-gray-100 text-gray-600 hover:text-gray-900'
          }`}
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
      </div>

      {/* Alerts List */}
      <div className="p-4 space-y-3 max-h-[500px] overflow-y-auto">
        <AnimatePresence>
          {alerts.map((alert, index) => {
            const config = severityConfig[alert.severity]
            const Icon = config.icon
            
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className={`relative p-4 rounded-xl border ${config.bgColor} ${config.borderColor} ${
                  theme === 'dark' ? 'bg-slate-700/30' : 'bg-gray-50'
                }`}
              >
                {/* Severity indicator */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-${config.color}-500`} />
                
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${config.bgColor}`}>
                    <Icon className={`w-4 h-4 ${config.textColor}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {alert.message}
                    </p>
                    <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                      {alert.time}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => removeAlert(alert.id)}
                    className={`p-1 rounded-lg transition-colors ${
                      theme === 'dark' 
                        ? 'hover:bg-slate-600 text-slate-500 hover:text-slate-300' 
                        : 'hover:bg-gray-200 text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className={`p-4 border-t ${
        theme === 'dark' ? 'border-slate-700' : 'border-gray-200'
      }`}>
        <button className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
          theme === 'dark'
            ? 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}>
          View All Alerts
        </button>
      </div>
    </motion.div>
  )
}
