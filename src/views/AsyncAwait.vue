<template>
<div class="promise-await">
    <ul>
        <li>
            async &amp;&amp; await例子
            <button @click="AsyncAwait1">运行</button>
        </li>
        <li>
            async &amp;&amp; await &amp;&amp; catch例子
            <button @click="AsyncAwait2">运行</button>
        </li>
        <li>
            async &amp;&amp; await &amp;&amp; then例子
            <button @click="AsyncAwait3">运行</button>
        </li>
        <li>
            多个promise串行 catch例子
            <button @click="AsyncAwait4">运行</button>
        </li>
        <li>
            多个promise并发 catch例子
            <button @click="AsyncAwait5">运行</button>
        </li>
        <li>
            promise嵌套 catch例子1
            <button @click="AsyncAwait6">运行</button>
        </li>
        <li>
            promise嵌套 catch例子2
            <button @click="AsyncAwait7">运行</button>
        </li>
        <li>
            promise all catch例子
            <button @click="AsyncAwait8">运行</button>
        </li>
        <li>
            try catch例子1
            <button @click="AsyncAwait9">运行</button>
        </li>
        <li>
            try catch例子2
            <button @click="AsyncAwait10">运行</button>
        </li>
    </ul>
</div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'AsyncAwait',
    methods: {
        api1() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('api1 done')
                    resolve('api1 ok')
                }, 1000)
            })
        },
        api2() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('api2 done')
                    resolve('api2 ok')
                }, 1200)
            })
        },
        api3() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('api3 not ok')
                    reject('api3 not ok')
                }, 800)
            })
            // .catch(() => {
            //     Promise.resolve('api3 ok')
            //     return { text: 'api3 not ok', status: -1 }
            // })
        },
        async api() {
            let res1 = await this.api1()
            let res2 = await this.api2()
            let res3 = await this.api3()
            console.log('api done', res1, res2, res3)
            return { res1, res2, res3 }
        },
        async AsyncAwait1() {
            // 基本的await和async使用例子
            let asyncFunc = () => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve('ok')
                    }, 1000)
                })
            }
            let p = asyncFunc()
            console.log(p)
            let res = await p
            console.log(res)
        },
        async AsyncAwait2() {
            let asyncFunc = () => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        reject('error occurs')
                    }, 1000)
                })
            }
            // 异步函数可以捕获异常，但捕获处理后依然会往下执行，因为await拿到的是catch完后的返回值
            let p = asyncFunc()
            let res = await p.catch(text => {
                console.log('catch error:' + text)
                return 'throws error:' + text
            })
            console.log(res)
        },
        async AsyncAwait3() {
            let asyncFunc = () => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve('{"a":1,"b":"2"}')
                    }, 1000)
                })
            }
            // 异步函数处理完后，可以继续处理，await拿到的是最后处理的结果
            let res = await asyncFunc().then(text => {
                console.log('resolve text:' + text)
                return JSON.parse(text)
            })
            console.log(res)
        },
        AsyncAwait4() {
            // api串行请求，任意一个报错即不会继续往下执行，跳到catch捕获处理
            console.time('serial api')
            this.api().then(apiRes => {
                console.timeEnd('serial api')
                console.log(apiRes)
            }).catch(err => {
                console.timeEnd('serial api')
                console.error('error occurs:' + err)
            })
        },
        AsyncAwait5() {
            // 多个请求并发调用，任意一个报错，并不会影响其他未执行完的任务，但不会触发then，只会触发catch
            console.time('parallel api')
            Promise.all([this.api1(), this.api2(), this.api3()]).then(apiRes => {
                console.timeEnd('parallel api')
                console.log(apiRes)
            }).catch(err => {
                console.timeEnd('parallel api')
                console.error('error occurs:' + err)
            })
        },
        AsyncAwait6() {
            // 嵌套调用，使用then的话，外边的catch不能捕获异常
            this.api1().then(async () => {
                this.api2().then(() => {
                    this.api3().then(() => {
                        console.log('api3 done')
                    })
                })
            }).catch(error => {
                console.error('AsyncAwait6 error:' + error)
            })
        },
        AsyncAwait7() {
            // 嵌套调用，使用await的话，外边的catch可以捕获异常
            this.api1().then(async () => {
                let res2 = await this.api2()
                let res3 = await this.api3()
            }).catch(error => {
                console.error('AsyncAwait7 error:' + error)
            })
        },
        AsyncAwait8() {
            // Promise.all，里面then如果是个异步函数，同时promise没有被catch，则可以在外边被catch，结论跟例子6、7一样
            Promise.all([this.api1(), this.api2()]).then(async () => {
                let res3 = await this.api3()
            }).catch(error => {
                console.error('AsyncAwait8 error:' + error)
            })
        },
        AsyncAwait9() {
            // 如果采用then，reject的error不会被try catch捕获到，因为promise本身并没有报错，而是异步报错，所以不会被catch，所以finally会被马上执行
            try {
                this.api1().then(async () => {
                    this.api2().then(() => {
                        this.api3().then(() => {
                            console.log('api3 done')
                        })
                    })
                })
            } catch (error) {
                console.error('AsyncAwait9 error:' + error)
            }
            console.log('AsyncAwait9 done')
        },
        async AsyncAwait10() {
            // 采用await则会等待，像同步代码一样，error会被try catch捕获到，同时finally代码会在最后执行
            try {
                let res1 = await this.api1()
                let res2 = await this.api2()
                let res3 = await this.api3()
            } catch (error) {
                console.error('AsyncAwait10 error:' + error)
            }
            console.log('AsyncAwait10 done')
        }
    }
}
</script>

<style lang="css">
</style>
