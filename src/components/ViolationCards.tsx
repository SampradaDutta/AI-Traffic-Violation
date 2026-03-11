import { motion } from 'framer-motion'
import { LineChart, Line, ResponsiveContainer } from 'recharts'
import { 
  TrafficCone, 
  Shield, 
  Car, 
  MapPin,
  TrendingUp,
  TrendingDown
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { violationStats } from '../data/mockData'

const violationModules = [
  {
    id: 'signal_jumping',
    title: 'Signal Jumping',
    icon: TrafficCone,
    color: 'red',
    gradient: 'from-red-500/20 to-orange-500/20',
    borderColor: 'border-red-500/30',
    textColor: 'text-red-400',
    bgColor: 'bg-red-500/10'
  },
  {
    id: 'helmet',
    title: 'Helmet Detection',
    icon: Shield,
    color: 'amber',
    gradient: 'from-amber-500/20 to-yellow-500/20',
    borderColor: 'border-amber-500/30',
    textColor: 'text-amber-400',
    bgColor: 'bg-amber-500/10'
  },
  {
    id: 'vehicle',
    title: 'Vehicle Detection',
    icon: Car,
    color: 'blue',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-400',
    bgColor: 'bg-blue-500/10'
  },
  {
    id: 'wrong_lane',
    title: 'Wrong Lane',
    icon: MapPin,
    color: 'purple',
    gradient: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30',
    textColor: 'text-purple-400',
    bgColor: 'bg-purple-500/10'
  }
]

export default function ViolationCards() {
  const { theme } = useTheme()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {violationModules.map((module, index) => {
        const stats = violationStats[module.id]
        const isUp = stats.trend[stats.trend.length - 1] > stats.trend[0]
        
        return (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-2xl p-5 border backdrop-blur-sm ${
              theme === 'dark'
                ? `bg-slate-800/50 ${module.borderColor}`
                : `bg-white shadow-lg border-gray-200`
            }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${module.gradient}`}>
                <module.icon className={`w-6 h-6 ${module.textColor}`} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${
                isUp ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {isUp ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {Math.abs(Math.round((stats.trend[stats.trend.length - 1] - stats.trend[0]) / stats.trend[0] * 100))}%
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-3">
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                  Total Violations Today
                </p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {stats.total.toLocaleString()}
                </p>
              </div>

              <div>
                <p className={`text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-gray-400'}`}>
                  Avg Confidence
                </p>
                <div className="flex items-center gap-2">
                  <div className={`flex-1 h-1.5 rounded-full ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200'}`}>
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${
                        module.color === 'red' ? 'from-red-500 to-red-400' :
                        module.color === 'amber' ? 'from-amber-500 to-amber-400' :
                        module.color === 'blue' ? 'from-blue-500 to-blue-400' :
                        'from-purple-500 to-purple-400'
                      }`}
                      style={{ width: `${stats.confidence}%` }}
                    />
                  </div>
                  <span className={`text-sm font-medium ${module.textColor}`}>
                    {stats.confidence}%
                  </span>
                </div>
              </div>

              {/* Mini Trend Chart */}
              <div className="h-12 -mx-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats.trend.map((value, i) => ({ value }))}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke={
                        module.color === 'red' ? '#ef4444' :
                        module.color === 'amber' ? '#f59e0b' :
                        module.color === 'blue' ? '#3b82f6' :
                        '#8b5cf6'
                      }
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
