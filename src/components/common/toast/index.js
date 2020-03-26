
import Toast from './Toast'
const obj = {}

obj.install = function(Vue){
  console.log("asdsadsa")
  const toastContrustor = Vue.extend(Toast)
  const totast = new toastContrustor();
  totast.$mount(document.createElement('div'))

  document.body.appendChild(totast.$el)

  Vue.prototype.$toast = totast;
}

export default obj