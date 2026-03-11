import { motion } from 'framer-motion'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts'
import { useTheme } from '../context/ThemeContext'
import { peakTimeData, violationTypeData, heatmapData, weeklyStats } from '../data/mockData'

export default function AnalyticsCharts() {
  const { theme } = useTheme()

  const containerClass = theme === 'dark' 
    ? 'bg-slate-800/50 border-slate-700' 
    : 'bg-white border-gray-200'

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Peak Violation Time */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl p-5 border backdrop-blur-sm ${containerClass}`}
      >
        <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Peak Violation Times
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={peakTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#334155' : '#e5e7eb'} />
              <XAxis 
                dataKey="time" 
                tick={{ fill: theme === 'dark' ? '#94a3b8' : '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: theme === 'dark' ? '#334155' : '#e5e7eb' }}
              />
              <YAxis 
                tick={{ fill: theme === 'dark' ? '#94a3b8' : '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: theme === 'dark' ? '#334155' : '#e5e7eb' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1e293b' : '#fff',
                  border: `1px solid ${theme === 'dark' ? '#334155' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  color: theme === 'dark' ? '#fff' : '#1f2937'
                }}
              />
              <Bar 
                dataKey="violations" 
                fill="url(#barGradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Violation Type Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`rounded-2xl p-5 border backdrop-blur-sm ${containerClass}`}
      >
        <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Violation Type Distribution
        </h3>
        <div className="h-64 flex items-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={violationTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {violationTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1e293b' : '#fff',
                  border: `1px solid ${theme === 'dark' ? '#334155' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  color: theme === 'dark' ? '#fff' : '#1f2937'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2">
            {violationTypeData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
                  {item.name}
                </span>
                <span className={`text-xs font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Weekly Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`rounded-2xl p-5 border backdrop-blur-sm ${containerClass}`}
      >
        <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Weekly Violation Trend
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyStats}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#334155' : '#e5e7eb'} />
              <XAxis 
                dataKey="day" 
                tick={{ fill: theme === 'dark' ? '#94a3b8' : '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: theme === 'dark' ? '#334155' : '#e5e7eb' }}
              />
              <YAxis 
                tick={{ fill: theme === 'dark' ? '#94a3b8' : '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: theme === 'dark' ? '#334155' : '#e5e7eb' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1e293b' : '#fff',
                  border: `1px solid ${theme === 'dark' ? '#334155' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  color: theme === 'dark' ? '#fff' : '#1f2937'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="violations" 
                stroke="#8b5cf6"
                fill="url(#areaGradient)"
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Heatmap Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`rounded-2xl p-5 border backdrop-blur-sm ${containerClass}`}
      >
        <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Area-wise Violation Heatmap
        </h3>
        <div className="h-64 relative">
          {/* Simulated heatmap */}
          <div className="absolute inset-0 grid grid-cols-3 gap-2">
            {heatmapData.slice(0, 6).map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-xl flex flex-col items-center justify-center p-3 ${
                  theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-50'
                }`}
                style={{
                  backgroundColor: `rgba(59, 130, 246, ${area.violations / 600})`
                }}
              >
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {area.area}
                </span>
                <span className={`text-lg font-bold ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}>
                  {area.violations}
                </span>
                <span className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                  violations
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
