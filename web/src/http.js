import axios from 'axios'
import Vue from 'vue'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/web/api'
})
http.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.reject(err)
})
http.interceptors.response.use(res => {
  return res
}, err => {
  return Promise.reject(err)
})

export default http
