import Vue, { PluginFunction } from 'vue'
import Loading from './loading.vue'
/**
 * implements
 */

const defaultOptions = {
  fullScreen: false
}
const getDefault = function () {
  const options = {}
  for (let prop in defaultOptions) {
    options[prop] = defaultOptions[prop]
  }
  return options
}
const merge = function (source, target) {
  for (let prop in target) {
    source[prop] = target[prop]
  }
  return source
}

let showingStack = []
let promiseStack = []

const setLoadingOptions = function(loading, options) {
  let mergeOption = getDefault()
  if (typeof options === 'object') {
    mergeOption = merge(getDefault(), options)
  }

  for (let opt in mergeOption) {
    if (opt !== 'callback') {
      if (Object.hasOwnProperty.call(loading, opt)) {
        loading[opt] = mergeOption[opt]
      }
    }
  }

  loading.callback = function(action) {
    if (action === 'hide') {
      setTimeout(function() {
        document.body.removeChild(loading.$el)
      }, 300)
    }
    if (typeof mergeOption.callback === 'function') {
      mergeOption.callback(action)
    }
  }
  loading.show()
}
const install = function (vue, options) {
  const $insLoading = {
    show (options) {
      const loading = new Loading({
        el: document.createElement('div')
      })
      document.body.appendChild(loading.$el)
      setLoadingOptions(loading, options)
      showingStack.push(loading)
      return new Promise(function(resolve, reject) {
        promiseStack.push({
          resolve,
          reject
        })
      })
    },
    hide () {
      if (showingStack.length >= 1) {
        const loading = showingStack.pop()
        loading.hide()
        const promise = promiseStack.pop()
        promise.resolve('hide')
      }
    },
    setDefault(options) {
      for (let opt in options) {
        if (Object.hasOwnProperty.call(options, opt)) {
          defaultOptions[opt] = options[opt]
        }
      }
    }
  }
  if (!Vue.prototype.$insLoading) {
    Vue.prototype.$insLoading = $insLoading
  }
}

export default install