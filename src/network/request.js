import axios from 'axios'
export function request(config){
  const instance = axios.create({
git     baseURL:"",
    timeout:5000
  })

  //拦截器
  instance.interceptors.request.use(config => {
    return config;
  },err => {
    console.log(err);
  })

  instance.interceptors.response.use(config=>{
    console.log(config)
    return config.data
  },err=>{
    console.log(err)
  })

  return instance(config)
}