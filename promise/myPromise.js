class myPromise {
  static PENDING = 'pending'
  static FULFILLED = 'fulfilled'
  static REJECTED = 'rejected'
  constructor(executor) {
    this.status = myPromise.PENDING
    this.value = null
    this.callbacks = []
    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }

  resolve(value) {
    //为 penging 时才会去改变状态（原生只会改变一次状态），避免 resolve 与 reject相互干扰
    if (this.status == myPromise.PENDING) {
      this.status = myPromise.FULFILLED
      this.value = value
      // 放入宏任务队列，避免同步执行
      setTimeout(() => {
        this.callbacks.map(callback => {
          callback.onFulfilled(value)
        })
      })
    }
  }

  reject(value) {
    //为 penging 时才会去改变状态（原生只会改变一次状态），避免 resolve 与 reject相互干扰
    if (this.status == myPromise.PENDING) {
      this.status = myPromise.REJECTED
      this.value = value
      // 放入宏任务队列，避免同步执行
      setTimeout(() => {
        this.callbacks.map(callback => {
          callback.onRejected(value)
        })
      })
    }
  }

  then(onFulfilled, onRejected) {
    // 参数可以不传函数（如 then(null, reject())），不传函数时赋值为函数
    if (typeof onFulfilled != 'function') {
      onFulfilled = value => value
    }
    if (typeof onRejected != 'function') {
      onRejected = value => value
    }
    let promise = new myPromise((resolve, reject) => {
      // 当使用 setTimeout {resolve()} 延时状态改变,将pending状态的函数
      // 暂时保存起来, 延时后由 this.resolve(value) this.reject(value) 方法
      // 触发执行
      if (this.status == myPromise.PENDING) {
        this.callbacks.push({
          onFulfilled: value => {
            this.parse(onFulfilled(this.value), resolve, reject, promise)
            // try {
            //   let result = onFulfilled(value)
            //   // 当返回的值为 new myPromise，应当调用该对象的then
            //   // 否者直接返回普通值
            //   if (result instanceof myPromise) {
            //     result.then(resolve, reject)
            //   } else {
            //     resolve(result)
            //   }
            // } catch (error) {
            //   reject(error)
            // }
          },
          onRejected: value => {
            this.parse(onRejected(this.value), resolve, reject, promise)
            // try {
            //   let result = onRejected(value)
            //   if (result instanceof myPromise) {
            //     result.then(resolve, reject)
            //   } else {
            //     resolve(result)
            //   }
            // } catch (error) {
            //   reject(error)
            // }
          }
        })
      }
      if (this.status == myPromise.FULFILLED) {
        // 放入宏任务队列，避免同步执行
        setTimeout(() => {
          this.parse(onFulfilled(this.value), resolve, reject, promise)
          // try {
          //   let result = onFulfilled(this.value)
          //   if (result instanceof myPromise) {
          //     result.then(resolve, reject)
          //   } else {
          //     resolve(result)
          //   }
          // } catch (error) {
          //   reject(error)
          // }
        })

      }
      if (this.status == myPromise.REJECTED) {
        // 放入宏任务队列，避免同步执行
        setTimeout(() => {
          this.parse(onRejected(this.value), resolve, reject, promise)
          // try {
          //   let result = onFulfilled(this.value)
          //   if (result instanceof myPromise) {
          //     result.then(resolve, reject)
          //   } else {
          //     resolve(result)
          //   }
          // } catch (error) {
          //   reject(error)
          // }
        })
      }
    })
    return promise
  }

  parse(result, resolve, reject, promise) {
    if (promise === result) {
      throw new TypeError('Chaining cycle detected for promise')
    }
    try {
      if (result instanceof myPromise) {
        result.then(resolve, reject)
      } else {
        resolve(result)
      }
    } catch (error) {
      reject(error)
    }
  }

  static resolve(value) {
    return new myPromise((resolve, reject) => {
      if (value instanceof myPromise) {
        value.then(resolve, reject)
      } else {
        resolve(value)
      }
    })
  }

  static reject(value) {
    return new myPromise((_, reject) => {
      reject(value)
    })
  }

  static all(promises) {
    let resolves = []
    return new myPromise((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(value => {
          resolves.push(value)
          if (resolves.length == promises.length) {
            resolve(resolves)
          }
        }, reason => {
          reject(reason)
        })
      })
    })
  }

  static race(promises) {
    return new myPromise((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(value => {
          resolve(value)
        }, reason => {
          reject(reason)
        })
      })
    })
  }
}
