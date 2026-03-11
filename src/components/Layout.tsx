import { ReactNode, useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { useTheme } from '../context/ThemeContext'

interface LayoutProps {
  children: ReactNode
  activeView: string
  setActiveView: (view: string) => void
}

export default function Layout({ children, activeView, setActiveView }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'gradient-bg' : 'bg-gray-100'}`}>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} activeView={activeView} setActiveView={setActiveView} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="p-6 mt-16">
          {children}
        </main>
      </div>
    </div>
  )
}

