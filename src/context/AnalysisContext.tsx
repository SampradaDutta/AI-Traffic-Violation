import { createContext, useContext, useState, ReactNode } from 'react'
import { Violation, violationStats as initialStats } from '../data/mockData'

interface AnalysisResult {
  id: string
  videoName: string
  timestamp: string
  violations: Violation[]
  stats: typeof initialStats
}

interface AnalysisContextType {
  analysisResults: AnalysisResult[]
  addAnalysisResult: (result: Omit<AnalysisResult, 'id' | 'timestamp' | 'violations' | 'stats'>) => void
  latestResult: AnalysisResult | null
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined)

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([])

  const addAnalysisResult = (result: Omit<AnalysisResult, 'id' | 'timestamp' | 'violations' | 'stats'>) => {
    // Generate sample violations based on the video
    const newViolations: Violation[] = [
      {
        id: `V${Date.now()}-1`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        violationType: 'signal_jumping',
        vehicleType: 'Motorcycle',
        confidence: 94.5 + Math.random() * 5,
        thumbnail: '/thumbnails/v1.jpg',
        location: 'Main Street & 5th Ave'
      },
      {
        id: `V${Date.now()}-2`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        violationType: 'helmet',
        vehicleType: 'Motorcycle',
        confidence: 90.2 + Math.random() * 8,
        thumbnail: '/thumbnails/v2.jpg',
        location: 'Central Road'
      },
      {
        id: `V${Date.now()}-3`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        violationType: 'vehicle',
        vehicleType: 'Car',
        confidence: 95.1 + Math.random() * 4,
        thumbnail: '/thumbnails/v3.jpg',
        location: 'Highway Exit 3'
      },
      {
        id: `V${Date.now()}-4`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        violationType: 'wrong_lane',
        vehicleType: 'Car',
        confidence: 87.3 + Math.random() * 6,
        thumbnail: '/thumbnails/v5.jpg',
        location: 'East Bound Lane'
      }
    ]

    const newResult: AnalysisResult = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      videoName: result.videoName,
      violations: newViolations,
      stats: initialStats
    }

    setAnalysisResults(prev => [newResult, ...prev])
  }

  const latestResult = analysisResults.length > 0 ? analysisResults[0] : null

  return (
    <AnalysisContext.Provider value={{ analysisResults, addAnalysisResult, latestResult }}>
      {children}
    </AnalysisContext.Provider>
  )
}

export function useAnalysis() {
  const context = useContext(AnalysisContext)
  if (!context) {
    throw new Error('useAnalysis must be used within an AnalysisProvider')
  }
  return context
}
