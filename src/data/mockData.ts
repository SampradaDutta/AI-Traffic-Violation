export interface Violation {
  id: string
  timestamp: string
  violationType: 'signal_jumping' | 'helmet' | 'vehicle' | 'wrong_lane'
  vehicleType: string
  confidence: number
  thumbnail: string
  location: string
}

export interface ViolationStats {
  total: number
  confidence: number
  trend: number[]
}

export const violationStats: Record<string, ViolationStats> = {
  signal_jumping: {
    total: 342,
    confidence: 94.5,
    trend: [120, 135, 128, 145, 152, 148, 160]
  },
  helmet: {
    total: 567,
    confidence: 91.2,
    trend: [210, 225, 198, 240, 255, 248, 267]
  },
  vehicle: {
    total: 823,
    confidence: 96.8,
    trend: [300, 320, 315, 345, 360, 355, 380]
  },
  wrong_lane: {
    total: 156,
    confidence: 89.3,
    trend: [45, 52, 48, 55, 58, 62, 65]
  }
}

export const violations: Violation[] = [
  {
    id: 'V001',
    timestamp: '2024-01-15 14:32:15',
    violationType: 'signal_jumping',
    vehicleType: 'Motorcycle',
    confidence: 96.5,
    thumbnail: '/thumbnails/v1.jpg',
    location: 'Main Street & 5th Ave'
  },
  {
    id: 'V002',
    timestamp: '2024-01-15 14:31:42',
    violationType: 'helmet',
    vehicleType: 'Motorcycle',
    confidence: 92.3,
    thumbnail: '/thumbnails/v2.jpg',
    location: 'Central Road'
  },
  {
    id: 'V003',
    timestamp: '2024-01-15 14:30:58',
    violationType: 'vehicle',
    vehicleType: 'Car',
    confidence: 98.1,
    thumbnail: '/thumbnails/v3.jpg',
    location: 'Highway Exit 3'
  },
  {
    id: 'V004',
    timestamp: '2024-01-15 14:29:33',
    violationType: 'signal_jumping',
    vehicleType: 'Bus',
    confidence: 94.8,
    thumbnail: '/thumbnails/v4.jpg',
    location: 'Downtown Intersection'
  },
  {
    id: 'V005',
    timestamp: '2024-01-15 14:28:17',
    violationType: 'wrong_lane',
    vehicleType: 'Car',
    confidence: 88.9,
    thumbnail: '/thumbnails/v5.jpg',
    location: 'East Bound Lane'
  },
  {
    id: 'V006',
    timestamp: '2024-01-15 14:27:45',
    violationType: 'helmet',
    vehicleType: 'Motorcycle',
    confidence: 95.2,
    thumbnail: '/thumbnails/v6.jpg',
    location: 'Industrial Zone'
  },
  {
    id: 'V007',
    timestamp: '2024-01-15 14:26:22',
    violationType: 'vehicle',
    vehicleType: 'Truck',
    confidence: 97.5,
    thumbnail: '/thumbnails/v7.jpg',
    location: 'Harbor Bridge'
  },
  {
    id: 'V008',
    timestamp: '2024-01-15 14:25:11',
    violationType: 'signal_jumping',
    vehicleType: 'Car',
    confidence: 93.7,
    thumbnail: '/thumbnails/v8.jpg',
    location: 'Shopping District'
  }
]

export const peakTimeData = [
  { time: '6AM', violations: 45 },
  { time: '8AM', violations: 128 },
  { time: '10AM', violations: 76 },
  { time: '12PM', violations: 95 },
  { time: '2PM', violations: 112 },
  { time: '4PM', violations: 156 },
  { time: '6PM', violations: 189 },
  { time: '8PM', violations: 134 },
  { time: '10PM', violations: 67 }
]

export const violationTypeData = [
  { name: 'Signal Jumping', value: 342, color: '#ef4444' },
  { name: 'Helmet Detection', value: 567, color: '#f59e0b' },
  { name: 'Vehicle Detection', value: 823, color: '#3b82f6' },
  { name: 'Wrong Lane', value: 156, color: '#8b5cf6' }
]

export const heatmapData = [
  { area: 'Downtown', violations: 456, lat: 40.7128, lng: -74.0060 },
  { area: 'Industrial', violations: 234, lat: 40.7282, lng: -74.0776 },
  { area: 'Residential', violations: 178, lat: 40.7580, lng: -73.9855 },
  { area: 'Highway', violations: 567, lat: 40.6892, lng: -74.0445 },
  { area: 'Shopping', violations: 312, lat: 40.7484, lng: -73.9857 },
  { area: 'School Zone', violations: 141, lat: 40.7295, lng: -73.9965 }
]

export const liveAlerts = [
  { id: 1, type: 'signal_jumping', message: 'Signal jumping detected at Main St & 5th Ave', time: '2 min ago', severity: 'high' },
  { id: 2, type: 'helmet', message: 'No helmet detected on Highway Exit 3', time: '5 min ago', severity: 'medium' },
  { id: 3, type: 'vehicle', message: 'Oversized vehicle on Bridge', time: '8 min ago', severity: 'high' },
  { id: 4, type: 'wrong_lane', message: 'Wrong lane violation at East Bound', time: '12 min ago', severity: 'low' }
]

export const weeklyStats = [
  { day: 'Mon', violations: 234 },
  { day: 'Tue', violations: 289 },
  { day: 'Wed', violations: 312 },
  { day: 'Thu', violations: 278 },
  { day: 'Fri', violations: 345 },
  { day: 'Sat', violations: 198 },
  { day: 'Sun', violations: 156 }
]

export const repeatOffenders = [
  { plate: 'ABC-1234', violations: 12, vehicleType: 'Motorcycle' },
  { plate: 'XYZ-5678', violations: 9, vehicleType: 'Car' },
  { plate: 'DEF-9012', violations: 7, vehicleType: 'Bus' },
  { plate: 'GHI-3456', violations: 6, vehicleType: 'Truck' },
  { plate: 'JKL-7890', violations: 5, vehicleType: 'Car' }
]
