import Vue, { PluginFunction } from 'vue'
import Dialogs from './dialogs.vue'
/**
 * implements
 */

const defaultOptions = {
  title: '提示',
  confirm: '确定',
  cancel: '取消',
  callback: null,
  slot: null,
  hideCancel: true
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

const setDialogsOptions = function(dialog, options) {
  let mergeOption = getDefault()
  if (typeof options === 'object') {
    mergeOption = merge(getDefault(), options)
  }

  for (let opt in mergeOption) {
    if (opt !== 'callback') {
      if (Object.hasOwnProperty.call(dialog, opt)) {
        dialog[opt] = mergeOption[opt]
      }
    }
  }

  dialog.callback = function(action) {
    if (action === 'close') {
      setTimeout(function() {
        document.body.removeChild(dialog.$el)
      }, 300)
    } else if (action === 'cancel' || action === 'confirm') {
      let popDialogs
      let popPromise
      for (var i = 0; i < showingStack.length; i++) {
        popDialogs = showingStack.splice(i, 1)[0]
        popDialogs && popDialogs.close()
        if (typeof Promise !== 'undefined') {
          popPromise = promiseStack.splice(i, 1)[0]
          popPromise.resolve(action)
        }
        break
      }
    }
    if (typeof mergeOption.callback === 'function') {
      mergeOption.callback(action)
    }
  }
  dialog.show()
}
const install = function (vue, options) {
  const $insDialogs = {
    show (options) {
      const dialog = new Dialogs({
        el: document.createElement('div')
      })
      document.body.appendChild(dialog.$el)
      setDialogsOptions(dialog, options)
      showingStack.push(dialog)
      return new Promise(function(resolve, reject) {
        promiseStack.push({
          resolve,
          reject
        })
      })
    },
    close () {
      if (showingStack.length >= 1) {
        const dialog = showingStack.pop()
        dialog.close()
        const promise = promiseStack.pop()
        promise.resolve('close')
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
  if (!Vue.prototype.$insDialogs) {
    Vue.prototype.$insDialogs = $insDialogs
  }
}

export default install