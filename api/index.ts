import axios, { AxiosInstance, AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const handleError = (error: AxiosError<any>) => {
  let message = error.message
  if (error.response) {
    const errors = error.response.data?.errors
    if (Array.isArray(errors)) {
      errors.forEach((err) => toast.error(err.error))
    } else if (errors && typeof errors === 'object') {
      message = Object.values(errors).flat().join('\n')
      toast.error(message)
    } else {
      message = error.response.data?.message || error.message
      toast.error(message)
    }
  }
  return Promise.reject(error)
}

export const api: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/`,
})

api.interceptors.request.use(
  (config) => {
    if ('session' in window.localStorage) {
      const { access_token } = JSON?.parse(
        localStorage.getItem('session') || ''
      )

      if (access_token) {
        if (config.headers)
          config.headers['Authorization'] = `Bearer ${access_token}`
      }
    }
    return config
  },
  (error) => {
    console.log('error :>> ', error)
    // Handle request errors here
    return Promise.reject(error)
  }
)

api.interceptors.response.use(undefined, (error) => {
  if (
    error.response?.request?.responseURL.endsWith('logout') ||
    error?.message === 'canceled'
  )
    return
  if (error.response?.status === 401) {
    // window.localStorage.clear()
    // window.location.reload()
  }
  handleError(error)
})

export const addAuthHeader = (session: any) => {
  if (session?.access_token) {
    api.defaults.headers.common.Authorization = `Bearer ${session.access_token}`
  } else {
    delete api.defaults.headers.common.Authorization
  }
}
