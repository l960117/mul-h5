import axios from 'axios'
axios.defaults.timeout = 40000
axios.defaults.withCredentials = true
console.log(axios)

export const loginIn = (params) => {
  const url = '/api/tester/login'
  console.log(url)
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(res => {
      resolve(res.data)
    })
    .catch((res) => {
      reject()
    })
  });
}

export const getQuestion = (params) => {
  const url = '/api/tester/test'
  return new Promise((resolve, reject) => {
    axios.post(url, params).then((res) => {
      resolve(res.data)
    })
    .catch((res) => {
      reject()
    })
  })
}

export const getLeftTimeApi = (params) => {
  const url = `/api/tester/time/${params.testerId}`
  return new Promise((resolve, reject) => {
    axios.get(url).then((res) => {
      resolve(res.data)
    })
    .catch((res) => {
      reject()
    })
  })
}

export const submitResultApi = (params) => {
  const url = '/api/tester/answer/submit'
  return new Promise((resolve, reject) => {
    axios.post(url, params).then((res) => {
      resolve(res.data)
    })
    .catch((res) => {
      reject()
    })
  })
}

export const autoSubmitResultApi = (params) => {
  const url = '/api/tester/submit/on/time'
  return new Promise((resolve, reject) => {
    axios.post(url, params).then((res) => {
      resolve(res.data)
    })
    .catch((res) => {
      reject()
    })
  })
}
