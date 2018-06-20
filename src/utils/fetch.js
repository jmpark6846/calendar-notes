import axios from "axios";
import { API_URL } from "../constants";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = 'csrftoken'

export function api({method, url, data, headers}){
  return axios({ 
    method, 
    url, 
    data, 
    headers, 
    withCredentials: true
  }).then(response=>response, error=>error)
}

export function postData(url, data){
  return axios({
    method:'post',
    url, 
    data,
    headers: { 'content-type': 'application/json' },
    withCredentials: true,
  })
  .then(response=>response, error=>({ error: error.response.data }))
}

export const fetchData = (url) => {
  return axios({
    method:'get',
    url,
    withCredentials: true,
  })
  .then(response=>response, error=>error)
}

export const updateData = (url, data) => {
  return axios({
    method:'put',
    url,
    data,
    withCredentials: true,
  })
  .then(response=>response, error=>({ error: error.response.data }))
}

export const parseNoteUrl = (date) => {
  
  const str = date.split('-')
  return `${API_URL}/notes/${str[0]}/${str[1]}/${str[2]}/`
}