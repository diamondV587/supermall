import axios from 'axios'
export function request(config){
  const instance = axios.create({
    // http://106.54.54.237:8000/api/wh
    baseURL:"http://123.207.32.32:8000/api/wh",
    timeout:5000
  })

  //拦截器
  instance.interceptors.request.use(config => {
    return config;
  },err => {
    console.log(err);
  })

  instance.interceptors.response.use(config=>{
    return config.data
  },err=>{
  })

  return instance(config)
}