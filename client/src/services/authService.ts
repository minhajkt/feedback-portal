import { AxiosError } from 'axios'
import axiosInstance from './axiosInstance'

export const loginUser = async(email :string, password: string) => {
    try {
        const response = await axiosInstance.post('/login', {email, password})
        // console.log('response', response.data)
        return response.data
    } catch (err) {
        const error = err as AxiosError<Error>
        console.log('Login error: ', error?.response?.data || error.message)
        throw error
    }
}

export const logoutUser = async() => {
    try {
        const response = await axiosInstance.post('/logout')
        // console.log('logout response', response.data)
        return response.data
    } catch (err) {
        const error = err as AxiosError<Error>;
        console.log('Logout error: ', error?.response?.data || error.message)
        throw error
    }
}

export const signup = async(name: string, email: string, password: string, confirmPassword: string) => {
    try {
      const response = await axiosInstance.post("/signup", {
        name,
        email,
        password,
        confirmPassword,
      });
      // console.log(response.data)
      return response.data;
    } catch (err) {
      const error = err as AxiosError<Error>;
      console.log("Error in sign up", error?.response?.data || error.message);
      throw error
    }
}

export const verifyOtp = async(email: string, otp: string) => {
    try {
        const response = await axiosInstance.post('/verify', {email, otp})
        // console.log('otp res', response.data)
        return response.data
    } catch (err) {
      const error = err as AxiosError<Error>;
        console.log('Error verifying otp', error?.response?.data || error.message)
        throw error
    }
}