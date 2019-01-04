
<template>
    <div>
      <div @click.capture="div1Func" style="background: blue;width: 400px; height: 400px;">
          <div @click="div2Func" style="background: red;width: 200px; height: 200px;">
              <div @click.self="div3Func" style="background: yellow;width: 100px; height: 100px;">
                <div @click.stop="div4Func" style="background: green;width: 50px; height: 50px;" >
                  <div @click="div5Func" style="background: pink;width: 25px; height: 25px;" ></div>
                </div>
              </div>
          </div>
      </div>
      <div>
        <a href="http://www.baidu.com" @click.prevent="preventFunc">百度链接</a>
      </div>
    </div>
</template>

<script>
export default {
    mounted() {
      /*
        在div4上触发点击事件
          捕获阶段: 外-》里 * 在div1处检测 useCapture 是否为true,是则执行程序， div2、div3同理 .
          目标阶段: 目标到div4处，发现div4就是鼠标点击的节点， 所以这里是目标阶段。若有事件处理程序，则执行该程序，这里不论 useCapture 为 true 还是 false。
          冒泡阶段: 里-》外  在div3处检测useCapture 是否为false， 是则执行该程序 . div2、div1同理
      */
      // capture 表示该事件监听是在“捕获”阶段中监听（设置为 true）还是在“冒泡”阶段中监听（设置为 false）
      // stop 表示触发该事件之后，阻止之后的冒泡事件
      // self 表示只有点击该节点才会出发事件
      // prevent  阻止默认事件的触发
    },
    methods: {
      div1Func() {
        alert('蓝色')
      },
      div2Func() {
        alert('红色')
      },
      div3Func() {
        alert('黄色')
      },
      div4Func() {
        alert('绿色')
      },
      div5Func() {
        alert('粉色')
      },
      preventFunc() {
        alert('preventFunc')
      }
    }
}
</script>

