import { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { AnalysisProvider } from './context/AnalysisContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Settings from './pages/Settings'
import UploadSection from './components/UploadSection'
import LiveMonitor from './components/LiveMonitor'
import ViolationsTable from './components/ViolationsTable'
import AnalyticsCharts from './components/AnalyticsCharts'

function AppContent() {
  const { isAuthenticated, login } = useAuth()
  const [currentView, setCurrentView] = useState<string>('dashboard')
  const [authView, setAuthView] = useState<'login' | 'signup'>('login')

  const handleLogin = () => {
    login()
    setCurrentView('dashboard')
  }

  const handleSwitchToSignup = () => {
    setAuthView('signup')
  }

  const handleSwitchToLogin = () => {
    setAuthView('login')
  }

  if (!isAuthenticated) {
    if (authView === 'signup') {
      return (
        <ThemeProvider>
          <SignUp onSignUp={handleLogin} onSwitchToLogin={handleSwitchToLogin} />
        </ThemeProvider>
      )
    }
    return (
      <ThemeProvider>
        <Login onLogin={handleLogin} onSwitchToSignup={handleSwitchToSignup} />
      </ThemeProvider>
    )
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />
      case 'live-monitor':
        return <LiveMonitor />
      case 'violations':
        return <ViolationsTable />
      case 'analytics':
        return <AnalyticsCharts />
      case 'upload':
        return <UploadSection />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <ThemeProvider>
      <AnalysisProvider>
        <Layout activeView={currentView} setActiveView={setCurrentView}>
          {renderView()}
        </Layout>
      </AnalysisProvider>
    </ThemeProvider>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App

