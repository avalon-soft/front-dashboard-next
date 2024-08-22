import axios, { AxiosInstance, AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const handleError = (error: AxiosError<any>) => {
  let message = error.message
  if (error.response) {
    let errors = error.response.data.errors
    if (Array.isArray(errors)) {
      errors.forEach((error) => toast.error(error.error))
    } else {
      message = error.response.data?.errors
        ? Object.values(errors).flat().join('\n')
        : error.response.data?.message || error.message
      toast.error(message)
    }
  }
  return Promise.reject(error)
}

export const auth: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/auth`,
})

auth.interceptors.response.use(undefined, (error) => handleError(error))

export const api: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/`,
})

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
  console.log('addAuthHeader :>> ');
  api.defaults.headers.common.Authorization = `Bearer ${session.access_token}`
}
