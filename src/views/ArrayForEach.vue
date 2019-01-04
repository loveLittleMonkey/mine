<template>
<div class="array-foreach">
    <ul>
        <li>
            <div>for (let i = 0, len = array.length; i &lt; len; i++)<button @click="arrayForEach1">运行</button></div>
        </li>
        <li>
            <div>for (let i in array)<button @click="arrayForEach2">运行</button></div>
        </li>
        <li>
            <div>forEach<button @click="arrayForEach3">运行</button></div>
        </li>
        <li>
            <div>for of<button @click="arrayForEach4">运行</button></div>
        </li>
        <li>
            <div>for 异步<button @click="arrayForEach5">运行</button></div>
        </li>
        <li>
            <div>for in 异步<button @click="arrayForEach6">运行</button></div>
        </li>
        <li>
            <div>forEach 异步<button @click="arrayForEach7">运行</button></div>
        </li>
        <li>
            <div>for of 异步<button @click="arrayForEach8">运行</button></div>
        </li>
    </ul>
</div>
</template>

<script>
/* eslint-disable */
Array.prototype.remove = function(obj) {

}
export default {
    name: 'ArrayForEach',
    data() {
        return {
            array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }
    },
    methods: {
        asyncFunc(i) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(i)
                }, 1000)
            })
        },
        arrayForEach1() {
            for (let i = 0, len = this.array.length; i < len; i++) {
                if (i < 5) {
                    console.log(this.array[i])
                    continue;
                } else {
                    break
                }
            }
        },
        arrayForEach2() {
            for (let i in this.array) {
                console.log(i, this.array[i])
            }
            for (let i in this.array) {
                if (this.array.hasOwnProperty(i)) {
                    console.log('hasOwnProperty', i, this.array[i])
                }
            }
        },
        arrayForEach3() {
            this.array.forEach((item, i) => {
                console.log(i, item)
                if (i >= 5) {
                    return
                }
            })
        },
        arrayForEach4() {
            for (let item of this.array) {
                if (item >= 5) {
                    break
                }
                console.log(item)
            }
        },
        async arrayForEach5() {
            for (let i = 0, len = this.array.length; i < len; i++) {
                let item = this.array[i]
                console.log('before resolve:' + item)
                let res = await this.asyncFunc(item)
                console.log('after resolve:' + item)
            }
            console.log('arrayForEach5 completed.')
        },
        async arrayForEach6() {
            for (let i in this.array) {
                let item = this.array[i]
                console.log('before resolve:' + item)
                let res = await this.asyncFunc(item)
                console.log('after resolve:' + item)
            }
            console.log('arrayForEach6 completed.')
        },
        arrayForEach7() {
            this.array.forEach(async (item, i) => {
                console.log('before resolve:' + item)
                let res = await this.asyncFunc(item)
                console.log('after resolve:' + item)
            })
            console.log('arrayForEach7 completed.')
        },
        async arrayForEach8() {
            for (let item of this.array) {
                console.log('before resolve:' + item)
                let res = await this.asyncFunc(item)
                console.log('after resolve:' + item)
            }
            console.log('arrayForEach8 completed.')
        },
    }

}
</script>
