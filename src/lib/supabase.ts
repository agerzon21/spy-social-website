import { createClient } from '@supabase/supabase-js'

// Retrieve Supabase URL and key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if we have valid credentials
const hasValidCredentials = !!(supabaseUrl && supabaseAnonKey)

// Type for the updateUser parameters
type UpdateUserParams = {
  password?: string
  email?: string
  data?: Record<string, unknown>
}

// Create a mock client for when credentials are missing
const mockClient = {
  auth: {
    setSession: async () => {
      console.log('Mock: Setting session with token')
      return { data: {}, error: null }
    },
    updateUser: async (params: UpdateUserParams) => {
      console.log('Mock: Updating user with:', params)
      return { data: {}, error: null }
    },
    getSession: async () => {
      console.log('Mock: Getting current session')
      return { data: { session: null }, error: null }
    },
    signOut: async () => {
      console.log('Mock: Signing out user')
      return { error: null }
    }
  }
}

// Log info about which client we're using
if (hasValidCredentials) {
  console.log('Using real Supabase client with provided credentials')
} else {
  console.warn('Using mock Supabase client - missing valid credentials')
}

// Create and export the appropriate client
export const supabase = hasValidCredentials
  ? createClient(supabaseUrl, supabaseAnonKey)
  : mockClient 