import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  MapPin,
  Car,
  Eye
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useAnalysis } from '../context/AnalysisContext'
import { violations as defaultViolations, Violation } from '../data/mockData'

const violationTypeLabels: Record<string, string> = {
  signal_jumping: 'Signal Jumping',
  helmet: 'Helmet Detection',
  vehicle: 'Vehicle Detection',
  wrong_lane: 'Wrong Lane'
}

const violationTypeColors: Record<string, string> = {
  signal_jumping: 'bg-red-500/20 text-red-400',
  helmet: 'bg-amber-500/20 text-amber-400',
  vehicle: 'bg-blue-500/20 text-blue-400',
  wrong_lane: 'bg-purple-500/20 text-purple-400'
}

export default function ViolationsTable() {
  const { theme } = useTheme()
  const { analysisResults } = useAnalysis()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Combine analysis results violations with default violations
  const allViolations = [
    ...analysisResults.flatMap(result => result.violations),
    ...defaultViolations
  ]

  const filteredViolations = allViolations.filter((v: Violation) => {
    const matchesSearch = v.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.vehicleType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === 'all' || v.violationType === filterType
    return matchesSearch && matchesFilter
  })

  const totalPages = Math.ceil(filteredViolations.length / itemsPerPage)
  const paginatedViolations = filteredViolations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border backdrop-blur-sm ${
        theme === 'dark' 
          ? 'bg-slate-800/50 border-slate-700' 
          : 'bg-white border-gray-200'
      }`}
    >
      {/* Header */}
      <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 gap-4 border-b ${
        theme === 'dark' ? 'border-slate-700' : 'border-gray-200'
      }`}>
        <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Violations Log
        </h3>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
              theme === 'dark' ? 'text-slate-500' : 'text-gray-400'
            }`} />
            <input
              type="text"
              placeholder="Search violations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-10 pr-4 py-2 rounded-xl text-sm w-full sm:w-64 ${
                theme === 'dark'
                  ? 'bg-slate-700 border border-slate-600 text-white placeholder-slate-500 focus:border-blue-500'
                  : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            />
          </div>
          
          {/* Filter */}
          <div className="relative">
            <Filter className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
              theme === 'dark' ? 'text-slate-500' : 'text-gray-400'
            }`} />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className={`pl-10 pr-8 py-2 rounded-xl text-sm appearance-none cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-700 border border-slate-600 text-white focus:border-blue-500'
                  : 'bg-gray-50 border border-gray-200 text-gray-900 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            >
              <option value="all">All Types</option>
              <option value="signal_jumping">Signal Jumping</option>
              <option value="helmet">Helmet Detection</option>
              <option value="vehicle">Vehicle Detection</option>
              <option value="wrong_lane">Wrong Lane</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={theme === 'dark' ? 'bg-slate-700/30' : 'bg-gray-50'}>
              <th className={`px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
              }`}>
                Timestamp
              </th>
              <th className={`px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
              }`}>
                Violation Type
              </th>
              <th className={`px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
              }`}>
                Vehicle Type
              </th>
              <th className={`px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
              }`}>
                Confidence
              </th>
              <th className={`px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
              }`}>
                Location
              </th>
              <th className={`px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
              }`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {paginatedViolations.map((violation, index) => (
              <motion.tr
                key={violation.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`hover:${theme === 'dark' ? 'bg-slate-700/20' : 'bg-gray-50'} transition-colors`}
              >
                <td className={`px-5 py-4 text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-500" />
                    {violation.timestamp}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    violationTypeColors[violation.violationType]
                  }`}>
                    {violationTypeLabels[violation.violationType]}
                  </span>
                </td>
                <td className={`px-5 py-4 text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-slate-500" />
                    {violation.vehicleType}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-16 h-1.5 rounded-full ${
                      theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200'
                    }`}>
                      <div 
                        className={`h-full rounded-full ${
                          violation.confidence >= 95 ? 'bg-emerald-500' :
                          violation.confidence >= 90 ? 'bg-blue-500' :
                          'bg-amber-500'
                        }`}
                        style={{ width: `${violation.confidence}%` }}
                      />
                    </div>
                    <span className={`text-sm font-medium ${
                      violation.confidence >= 95 ? 'text-emerald-400' :
                      violation.confidence >= 90 ? 'text-blue-400' :
                      'text-amber-400'
                    }`}>
                      {violation.confidence}%
                    </span>
                  </div>
                </td>
                <td className={`px-5 py-4 text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    {violation.location}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <button className={`p-2 rounded-lg transition-colors ${
                    theme === 'dark' 
                      ? 'hover:bg-slate-700 text-slate-400 hover:text-white' 
                      : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                  }`}>
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className={`flex items-center justify-between p-5 border-t ${
        theme === 'dark' ? 'border-slate-700' : 'border-gray-200'
      }`}>
        <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredViolations.length)} of {filteredViolations.length} results
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg transition-colors ${
              currentPage === 1 
                ? 'opacity-50 cursor-not-allowed' 
                : theme === 'dark' 
                  ? 'hover:bg-slate-700 text-slate-400 hover:text-white' 
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                currentPage === page
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : theme === 'dark'
                    ? 'hover:bg-slate-700 text-slate-400 hover:text-white'
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg transition-colors ${
              currentPage === totalPages 
                ? 'opacity-50 cursor-not-allowed' 
                : theme === 'dark' 
                  ? 'hover:bg-slate-700 text-slate-400 hover:text-white' 
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
