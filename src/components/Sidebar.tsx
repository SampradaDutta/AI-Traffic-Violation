import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  Video, 
  AlertTriangle, 
  BarChart3, 
  Upload, 
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
  LogOut
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  activeView: string
  setActiveView: (view: string) => void
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Video, label: 'Live Monitor', id: 'live-monitor' },
  { icon: AlertTriangle, label: 'Violations', id: 'violations' },
  { icon: BarChart3, label: 'Analytics', id: 'analytics' },
  { icon: Upload, label: 'Upload', id: 'upload' },
  { icon: Settings, label: 'Settings', id: 'settings' },
]

export default function Sidebar({ isOpen, setIsOpen, activeView, setActiveView }: SidebarProps) {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ width: isOpen ? 256 : 80 }}
        className={`fixed left-0 top-0 h-full z-50 bg-slate-900/95 backdrop-blur-xl border-r border-slate-700/50 flex flex-col transition-all duration-300 ${isOpen ? 'lg:left-0' : 'lg:w-20 lg:left-0'}`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700/50">
          <motion.div
            initial={false}
            animate={{ opacity: isOpen ? 1 : 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            {isOpen && (
              <span className="font-bold text-white whitespace-nowrap">
                Traffic<span className="text-blue-400">AI</span>
              </span>
            )}
          </motion.div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                activeView === item.id 
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/30' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
              }`}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${activeView === item.id ? 'text-blue-400' : ''}`} />
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-medium whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </button>
          ))}
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 rounded-full bg-slate-700 border border-slate-600 items-center justify-center text-slate-400 hover:text-white hover:bg-slate-600 transition-colors"
        >
          {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        <div className="p-4 border-t border-slate-700/50">
          <div className={`flex items-center gap-3 ${!isOpen && 'justify-center'}`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.charAt(0) || 'U'}
            </div>
            {isOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user?.name || 'User'}</p>
                <p className="text-xs text-slate-400 truncate">{user?.department || 'Admin'}</p>
              </div>
            )}
          </div>
          {isOpen && (
            <button
              onClick={handleLogout}
              className="w-full mt-3 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Logout</span>
            </button>
          )}
        </div>
      </motion.aside>
    </>
  )
}

