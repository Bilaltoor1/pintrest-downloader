/**
 * Axios API Client
 * Centralized HTTP client for making requests to the Flask backend
 */

import axios from 'axios'

// Get API base URL from environment variable
// In development: http://localhost:5000
// In production: https://yttmp3.com/api
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor (optional - for adding auth tokens, logging, etc.)
apiClient.interceptors.request.use(
  (config) => {
    // You can add authorization headers here if needed
    // config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor (optional - for error handling, logging, etc.)
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.status, error.response.data)
    } else if (error.request) {
      // Request made but no response received
      console.error('Network Error: No response from server')
    } else {
      // Error in request configuration
      console.error('Request Error:', error.message)
    }
    return Promise.reject(error)
  }
)

export default apiClient
