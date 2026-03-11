import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  FileVideo, 
  CheckCircle, 
  XCircle, 
  Play,
  X,
  AlertCircle
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useAnalysis } from '../context/AnalysisContext'

const acceptedFormats = ['.mp4', '.avi', '.mov', '.mkv', '.webm']
const maxFileSize = 500 // MB

interface UploadedFile {
  id: string
  name: string
  size: number
  status: 'uploading' | 'processing' | 'completed' | 'error'
  progress: number
}

export default function UploadSection() {
  const { theme } = useTheme()
  const { addAnalysisResult } = useAnalysis()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const validateFile = (file: File): boolean => {
    const extension = '.' + file.name.split('.').pop()?.toLowerCase()
    if (!acceptedFormats.includes(extension)) {
      alert(`Invalid file format. Accepted formats: ${acceptedFormats.join(', ')}`)
      return false
    }
    if (file.size > maxFileSize * 1024 * 1024) {
      alert(`File size exceeds ${maxFileSize}MB limit`)
      return false
    }
    return true
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const files = Array.from(e.dataTransfer.files)
    files.forEach(file => {
      if (validateFile(file)) {
        addFile(file)
      }
    })
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    files.forEach(file => {
      if (validateFile(file)) {
        addFile(file)
      }
    })
  }

  const addFile = (file: File) => {
    const newFile: UploadedFile = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      status: 'uploading',
      progress: 0
    }
    setUploadedFiles(prev => [...prev, newFile])
    
    // Simulate upload progress
    let progress = 0
    const uploadInterval = setInterval(() => {
      progress += 10
      setUploadedFiles(prev => 
        prev.map(f => f.id === newFile.id ? { ...f, progress: Math.min(progress, 100) } : f)
      )
      if (progress >= 100) {
        clearInterval(uploadInterval)
        setUploadedFiles(prev => 
          prev.map(f => f.id === newFile.id ? { ...f, status: 'processing' } : f)
        )
      }
    }, 200)
  }

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id))
  }

  const startAnalysis = () => {
    if (uploadedFiles.length === 0) return
    
    // Get the video name from the first uploaded file
    const videoName = uploadedFiles[0].name
    
    setIsProcessing(true)
    setProcessingProgress(0)
    
    const processInterval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(processInterval)
          setIsProcessing(false)
          setUploadedFiles(prev => 
            prev.map(f => ({ ...f, status: 'completed' as const, progress: 100 }))
          )
          // Save analysis result
          addAnalysisResult({ videoName })
          return 100
        }
        return prev + 2
      })
    }, 100)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl border backdrop-blur-sm p-6 ${
          theme === 'dark'
            ? 'bg-slate-800/50 border-slate-700'
            : 'bg-white border-gray-200'
        }`}
      >
        <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Upload Video
        </h3>
        
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            dragActive
              ? 'border-blue-500 bg-blue-500/10'
              : theme === 'dark'
                ? 'border-slate-600 hover:border-slate-500'
                : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedFormats.join(',')}
            onChange={handleFileSelect}
            className="hidden"
            multiple
          />
          
          <div className="flex flex-col items-center gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              theme === 'dark' ? 'bg-slate-700' : 'bg-gray-100'
            }`}>
              <Upload className={`w-8 h-8 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <div>
              <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Drag and drop video files here
              </p>
              <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                or click to browse
              </p>
            </div>
            <div className={`text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-gray-400'}`}>
              Supported formats: {acceptedFormats.join(', ')} • Max size: {maxFileSize}MB
            </div>
          </div>
        </div>

        {/* File List */}
        <div className="mt-6 space-y-3">
          <AnimatePresence>
            {uploadedFiles.map(file => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex items-center gap-4 p-4 rounded-xl ${
                  theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  theme === 'dark' ? 'bg-slate-600' : 'bg-gray-200'
                }`}>
                  <FileVideo className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {file.name}
                  </p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                    {formatFileSize(file.size)}
                  </p>
                  
                  {/* Progress bar */}
                  {file.status !== 'completed' && (
                    <div className={`mt-2 h-1 rounded-full ${theme === 'dark' ? 'bg-slate-600' : 'bg-gray-200'}`}>
                      <div 
                        className={`h-full rounded-full transition-all ${
                          file.status === 'error' ? 'bg-red-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'
                        }`}
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Status icon */}
                {file.status === 'completed' && (
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                )}
                {file.status === 'processing' && (
                  <div className="w-5 h-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
                )}
                {file.status === 'error' && (
                  <XCircle className="w-5 h-5 text-red-400" />
                )}
                
                <button
                  onClick={() => removeFile(file.id)}
                  className={`p-1 rounded-lg ${theme === 'dark' ? 'hover:bg-slate-600' : 'hover:bg-gray-200'}`}
                >
                  <X className={`w-4 h-4 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Processing & Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`rounded-2xl border backdrop-blur-sm p-6 ${
          theme === 'dark'
            ? 'bg-slate-800/50 border-slate-700'
            : 'bg-white border-gray-200'
        }`}
      >
        <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Analysis Settings
        </h3>

        {/* Detection Modules */}
        <div className="space-y-4">
          <h4 className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
            Detection Modules
          </h4>
          
          {[
            { id: 'signal', label: 'Signal Jumping Detection', enabled: true },
            { id: 'helmet', label: 'Helmet Detection', enabled: true },
            { id: 'vehicle', label: 'Vehicle Detection', enabled: true },
            { id: 'wrong_lane', label: 'Wrong Lane Detection', enabled: true }
          ].map(module => (
            <label
              key={module.id}
              className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-colors ${
                theme === 'dark' ? 'bg-slate-700/30 hover:bg-slate-700/50' : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {module.label}
              </span>
              <div className="relative">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-600 rounded-full peer peer-checked:bg-blue-500 transition-colors" />
                <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full peer-checked:translate-x-5 transition-transform" />
              </div>
            </label>
          ))}
        </div>

        {/* Processing Progress */}
        {isProcessing && (
          <div className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-400">Processing Video...</span>
              <span className="text-sm font-bold text-blue-400">{processingProgress}%</span>
            </div>
            <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200'}`}>
              <div 
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
                style={{ width: `${processingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Start Analysis Button */}
        <button
          onClick={startAnalysis}
          disabled={uploadedFiles.length === 0 || isProcessing}
          className={`mt-6 w-full py-4 rounded-xl font-semibold transition-all ${
            uploadedFiles.length === 0 || isProcessing
              ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:shadow-lg hover:shadow-blue-500/25'
          }`}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Play className="w-5 h-5" />
              Start Analysis
            </span>
          )}
        </button>

        {/* Info */}
        <div className={`mt-4 flex items-start gap-3 p-4 rounded-xl ${
          theme === 'dark' ? 'bg-amber-500/10' : 'bg-amber-50'
        }`}>
          <AlertCircle className={`w-5 h-5 flex-shrink-0 ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`} />
          <p className={`text-sm ${theme === 'dark' ? 'text-amber-200' : 'text-amber-800'}`}>
            Analysis will process the uploaded video and identify traffic violations using AI-powered detection modules.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
