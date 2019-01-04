<template>
<div class="array-function">
    <ul>
        <li>
            过滤-传统方法
            <button @click="arrayFilter1">运行</button>
        </li>
        <li>
            过滤-filter
            <button @click="arrayFilter2">运行</button>
        </li>
        <li>
            映射-传统方法
            <button @click="arrayMap1">运行</button>
        </li>
        <li>
            映射-map
            <button @click="arrayMap2">运行</button>
        </li>
        <li>
            查找-传统方法
            <button @click="arrayFind1">运行</button>
        </li>
        <li>
            查找-find
            <button @click="arrayFind2">运行</button>
        </li>
        <li>
            包含-传统方法
            <button @click="arrayInclude1">运行</button>
        </li>
        <li>
            包含-includes
            <button @click="arrayInclude2">运行</button>
        </li>
        <li>
            某些符合-some
            <button @click="arraySome">运行</button>
        </li>
        <li>
            全部符合-every
            <button @click="arrayEvery">运行</button>
        </li>
        <li>
            累计？？-reduce
            <button @click="arrayReduce">运行</button>
        </li>
        <li>
            排序-sort
            <button @click="arraySort">运行</button>
        </li>
    </ul>
</div>
</template>
<script>
/* eslint-disable */
export default {
    name: 'ArrayFunction',
    data() {
        return {
            array: [{
                card_id: 1,
                card_type: 1,
                card_no: '1673892667483908264',
                card_sequence: '1673892667483908264'
            }, {
                card_id: 2,
                card_type: 2,
                card_no: '2677482917382908647',
                card_sequence: '2677482917382908647'
            }, {
                card_id: 3,
                card_type: 2,
                card_no: '2674878345277112684',
                card_sequence: '2674878345277112684'
            }, {
                card_id: 4,
                card_type: 6,
                card_no: '8732677428927483764',
                card_sequence: '8732677428927483764'
            }],
            productList: [{
                price: 100,
                quantity: 2
            }, {
                price: 120,
                quantity: 5
            }, {
                price: 80,
                quantity: 2
            }, {
                price: 123,
                quantity: 5
            }, {
                price: 100,
                quantity: 5
            }, {
                price: 117,
                quantity: 2
            }, {
                price: 120,
                quantity: 2
            }]
        }
    },
    methods: {
        arrayFilter1() {
            let arr = []
            this.array.forEach(obj => {
                if (obj.card_type == 2) {
                    console.log(obj.card_id)
                    arr.push(obj)
                }
            })
        },
        arrayFilter2() {
            let arr = this.array.filter(obj => obj.card_type == 2)
            console.log(arr.map(obj => obj.card_id))
        },
        arrayMap1() {
            let arr = []
            this.array.forEach(obj => {
                let itemName
                switch (obj.card_type) {
                    case 1:
                        itemName = obj.card_no.substring(0, 4) + '理财通卡'
                        break;
                    case 2:
                        itemName = obj.card_no.substring(0, 4) + '信用卡'
                        break
                    case 6:
                        itemName = obj.card_no.substring(0, 4) + '二三类户卡'
                        break
                    default:
                        itemName = obj.card_no.substring(0, 4)
                }
                arr.push({
                    itemName,
                    value: obj.card_sequence
                })
            })
            console.log(JSON.stringify(arr))
        },
        arrayMap2() {
            let arr = this.array.map(obj => {
                let itemName
                switch (obj.card_type) {
                    case 1:
                        itemName = obj.card_no.substring(0, 4) + '理财通卡'
                        break;
                    case 2:
                        itemName = obj.card_no.substring(0, 4) + '信用卡'
                        break;
                    case 6:
                        itemName = obj.card_no.substring(0, 4) + '二三类户卡'
                        break;
                    default:
                        itemName = obj.card_no.substring(0, 4)
                }
                return {
                    itemName,
                    value: obj.card_sequence
                }
            })
            console.log(JSON.stringify(arr))
        },
        arrayFind1() {
            let card
            for (let obj of this.array) {
                if (obj.card_sequence == '2677482917382908647') {
                    card = obj
                    break
                }
            }
            console.log(JSON.stringify(card))
        },
        arrayFind2() {
            let card = this.array.find(obj => obj.card_sequence == '2677482917382908647')
            console.log(JSON.stringify(card))
        },
        arrayInclude1() {
            console.log(this.array.indexOf(this.array[2]) != -1)
        },
        arrayInclude2() {
            console.log(this.array.includes(this.array[2]))
        },
        arraySome() {
            console.log(this.array.some(obj => obj.card_type == 6))
        },
        arrayEvery() {
            console.log(this.array.every(obj => obj.card_type == 6))
        },
        arrayReduce() {
            let totalPrice = 0
            totalPrice = this.productList.reduce((prev, curr) => {
                console.log(prev, curr.quantity, curr.price)
                return prev + curr.quantity * curr.price
            }, 0)
            console.log(totalPrice)
        },
        arraySort() {
            console.log('原数组: \n' + this.productList.map(obj => JSON.stringify(obj)).join('\n'))
            console.log('默认排序: \n' + this.productList.sort().map(obj => JSON.stringify(obj)).join('\n'))
            console.log('按总价排序: \n' + this.productList.sort((a, b) => {
                let wa = a.quantity * a.price
                let wb = b.quantity * b.price
                return wa > wb ? 1 : (wa == wb ? 0 : -1)
            }).map(obj => JSON.stringify(obj)).join('\n'))
            console.log('先按照数量从大到小排序，数量相同按照单价从高到低排序: \n' + this.productList.sort((a, b) => {
                if (a.quantity == b.quantity) {
                    return b.price - a.price
                } else {
                    return b.quantity - a.quantity
                }
            }).map(obj => JSON.stringify(obj)).join('\n'))
        }
    }
}
</script>
