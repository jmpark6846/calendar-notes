import axios from "axios";

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
  .then(response=>response, error=>({ error: error.response.data }))
}

export const updateData = (url, data) => {
  return axios({
    method:'update',
    url,
    data,
    withCredentials: true,
  })
  .then(response=>response, error=>({ error: error.response.data }))
}
