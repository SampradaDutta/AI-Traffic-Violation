import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  Shield, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react'
import LiveMonitor from '../components/LiveMonitor'
import ViolationCards from '../components/ViolationCards'
import AnalyticsCharts from '../components/AnalyticsCharts'
import ViolationsTable from '../components/ViolationsTable'
import UploadSection from '../components/UploadSection'
import LiveAlerts from '../components/LiveAlerts'
import { useTheme } from '../context/ThemeContext'
import { useAnalysis } from '../context/AnalysisContext'

export default function Dashboard() {
  const { theme } = useTheme()
  const { latestResult, analysisResults } = useAnalysis()
  const [activeTab, setActiveTab] = useState<'dashboard' | 'upload'>('dashboard')

  // Auto-switch to dashboard when analysis completes and show results
  useEffect(() => {
    if (latestResult && activeTab === 'upload') {
      setActiveTab('dashboard')
    }
  }, [latestResult, activeTab])

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Traffic Violation Analytics
          </h1>
          <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
            Real-time AI-powered traffic monitoring and violation detection
          </p>
        </div>
        
        {/* Tab Switcher */}
        <div className={`flex rounded-xl p-1 ${theme === 'dark' ? 'bg-slate-800' : 'bg-gray-100'}`}>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                : theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'upload'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                : theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Upload & Process
          </button>
        </div>
      </motion.div>

      {/* Analysis Results Section - Shows when analysis is available */}
      {latestResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl border backdrop-blur-sm overflow-hidden ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700'
              : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
          }`}
        >
          {/* Analysis Result Header */}
          <div className={`px-6 py-4 border-b ${
            theme === 'dark' ? 'border-slate-700 bg-slate-800/50' : 'border-gray-200 bg-gray-100/50'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Analysis Complete
                  </h2>
                  <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                    {latestResult.videoName}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className={`w-4 h-4 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`} />
                <span className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                  {new Date(latestResult.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Analysis Stats Grid */}
          <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`p-4 rounded-xl ${
              theme === 'dark' ? 'bg-slate-800/50' : 'bg-white border border-gray-200'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                </div>
                <span className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                  Total Violations
                </span>
              </div>
              <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {latestResult.violations.length}
              </p>
            </div>

            <div className={`p-4 rounded-xl ${
              theme === 'dark' ? 'bg-slate-800/50' : 'bg-white border border-gray-200'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-orange-500" />
                </div>
                <span className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                  Signal Jumping
                </span>
              </div>
              <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {latestResult.violations.filter(v => v.violationType === 'signal_jumping').length}
              </p>
            </div>

            <div className={`p-4 rounded-xl ${
              theme === 'dark' ? 'bg-slate-800/50' : 'bg-white border border-gray-200'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-purple-500" />
                </div>
                <span className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                  No Helmet
                </span>
              </div>
              <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {latestResult.violations.filter(v => v.violationType === 'helmet').length}
              </p>
            </div>

            <div className={`p-4 rounded-xl ${
              theme === 'dark' ? 'bg-slate-800/50' : 'bg-white border border-gray-200'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                </div>
                <span className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                  Wrong Lane
                </span>
              </div>
              <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {latestResult.violations.filter(v => v.violationType === 'wrong_lane').length}
              </p>
            </div>
          </div>

          {/* Violations List from Analysis */}
          <div className="px-6 pb-6">
            <h3 className={`text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Detected Violations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {latestResult.violations.map((violation, index) => (
                <motion.div
                  key={violation.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl border ${
                    theme === 'dark' 
                      ? 'bg-slate-800/30 border-slate-700' 
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      violation.violationType === 'signal_jumping' ? 'bg-orange-500/20 text-orange-400' :
                      violation.violationType === 'helmet' ? 'bg-purple-500/20 text-purple-400' :
                      violation.violationType === 'wrong_lane' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {violation.violationType.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className="text-xs text-emerald-400 font-medium">
                      {violation.confidence.toFixed(1)}%
                    </span>
                  </div>
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {violation.vehicleType}
                  </p>
                  <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                    {violation.location}
                  </p>
                  <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-slate-500' : 'text-gray-400'}`}>
                    {violation.timestamp}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      {activeTab === 'dashboard' ? (
        <div className="grid grid-cols-12 gap-6">
          {/* Live Monitor - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="col-span-12 lg:col-span-8"
          >
            <LiveMonitor />
          </motion.div>

          {/* Live Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="col-span-12 lg:col-span-4"
          >
            <LiveAlerts />
          </motion.div>

          {/* Violation Detection Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-12"
          >
            <ViolationCards />
          </motion.div>

          {/* Analytics Charts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="col-span-12"
          >
            <AnalyticsCharts />
          </motion.div>

          {/* Violations Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="col-span-12"
          >
            <ViolationsTable />
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <UploadSection />
        </motion.div>
      )}
    </div>
  )
}
