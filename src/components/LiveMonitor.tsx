import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Maximize2, Volume2, VolumeX, Settings, Radio } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function LiveMonitor() {
  const { theme } = useTheme()
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [status, setStatus] = useState<'processing' | 'live' | 'offline'>('live')
  const [detectedVehicles, setDetectedVehicles] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setDetectedVehicles(Math.floor(Math.random() * 20) + 5)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const vehicleBoxes = [
    { id: 1, x: 20, y: 30, width: 80, height: 60, label: 'Car', confidence: 98 },
    { id: 2, x: 40, y: 50, width: 70, height: 50, label: 'Motorcycle', confidence: 95 },
    { id: 3, x: 60, y: 25, width: 90, height: 65, label: 'Bus', confidence: 97 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`rounded-2xl overflow-hidden ${
        theme === 'dark' ? 'bg-slate-800/50' : 'bg-white shadow-lg'
      }`}
    >
      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b ${
        theme === 'dark' ? 'border-slate-700' : 'border-gray-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Radio className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Live CCTV Monitoring
            </h3>
            <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
              Main Street & 5th Avenue - Camera 01
            </p>
          </div>
        </div>
        
        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
            status === 'live' ? 'bg-emerald-500/10 border border-emerald-500/30' :
            status === 'processing' ? 'bg-amber-500/10 border border-amber-500/30' :
            'bg-red-500/10 border border-red-500/30'
          }`}>
            <span className={`relative flex h-2 w-2 ${
              status === 'live' ? 'text-emerald-400' :
              status === 'processing' ? 'text-amber-400' :
              'text-red-400'
            }`}>
              {status === 'live' && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              )}
              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                status === 'live' ? 'bg-emerald-400' :
                status === 'processing' ? 'bg-amber-400' :
                'bg-red-400'
              }`}></span>
            </span>
            <span className={`text-xs font-medium ${
              status === 'live' ? 'text-emerald-400' :
              status === 'processing' ? 'text-amber-400' :
              'text-red-400'
            }`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Video Area */}
      <div className="relative aspect-video bg-black">
        {/* Simulated Video Feed */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900">
          {/* Simulated Road */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-slate-700">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-yellow-400 dashed"></div>
          </div>
          
          {/* Simulated Buildings */}
          <div className="absolute top-4 left-4 w-24 h-32 bg-slate-600 rounded-lg"></div>
          <div className="absolute top-8 right-8 w-32 h-24 bg-slate-600 rounded-lg"></div>
          <div className="absolute top-4 left-1/3 w-20 h-20 bg-slate-600 rounded-lg"></div>
          
          {/* Simulated Traffic Light */}
          <div className="absolute top-8 left-1/4 w-4 h-12 bg-slate-500 rounded">
            <div className="w-3 h-3 rounded-full bg-red-500 mx-auto mt-1"></div>
            <div className="w-3 h-3 rounded-full bg-slate-700 mx-auto mt-1"></div>
            <div className="w-3 h-3 rounded-full bg-slate-700 mx-auto mt-1"></div>
          </div>
        </div>

        {/* Detection Overlay Boxes */}
        {isPlaying && vehicleBoxes.map((box) => (
          <motion.div
            key={box.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute border-2 border-blue-500 bg-blue-500/10"
            style={{
              left: `${box.x}%`,
              top: `${box.y}%`,
              width: `${box.width}px`,
              height: `${box.height}px`,
            }}
          >
            <div className="absolute -top-6 left-0 bg-blue-500 text-white text-xs px-2 py-0.5 rounded">
              {box.label} {box.confidence}%
            </div>
          </motion.div>
        ))}

        {/* Stats Overlay */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2">
            <p className="text-white text-xs">Vehicles Detected</p>
            <p className="text-blue-400 text-xl font-bold">{detectedVehicles}</p>
          </div>
          <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2">
            <p className="text-white text-xs">Active Violations</p>
            <p className="text-red-400 text-xl font-bold">3</p>
          </div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-white hover:text-blue-400 transition-colors"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-white hover:text-blue-400 transition-colors"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <div className="w-px h-5 bg-white/30"></div>
          <button className="text-white hover:text-blue-400 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <button className="text-white hover:text-blue-400 transition-colors">
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
