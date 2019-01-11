<template>
    <div class="scratch_ticket">
        <div class="scratch_ticket__top">
            <div class="scratch_ticket__top__first-line">刮刮有惊喜</div>
            <div class="scratch_ticket__top__second-line">天天刷 日日刮</div>
        </div>
        <div class="scratch_ticket__main">
            <!-- 最底下的结果层 -->
            <div class="scratch_ticket__main__z-index-1" :class="showGray?'scratch_ticket__main__z-index-1--gray-background':''">
                <div class="scratch_ticket__main__z-index-1__first-line">恭喜您获得</div>
                <div class="scratch_ticket__main__z-index-1__second-line">100元京东E卡</div>
                <div class="scratch_ticket__main__z-index-1__btn"></div>
            </div>
            <!-- end 最底下的结果层 -->
            <!-- 画布层 -->
            <div class="scratch_ticket__main__z-index-2">
                <canvas ref="myCanvas" id="myCanvas" width="621" height="330"></canvas>
            </div>
            <!-- end 画布层 -->
            <!-- 初始化的第一层 -->
            <div class="scratch_ticket__main__z-index-3" v-if="isDoing">
                <div class="scratch_ticket__main__z-index-3__first-line">赢好礼大奖</div>
                <div class="scratch_ticket__main__z-index-3__second-line">仅需10积分</div>
                <div class="scratch_ticket__main__z-index-3__btn" @click="toStart">立即刮奖</div>
            </div>
            <!-- end 初始化的第一层 -->
            <!-- 画布刮开50%, 出现在最上层的按钮，查看详情的虚拟按钮 -->
            <div class="scratch_ticket__main__z-index-4" v-if="isCompleted" @click="toResult">

            </div>
            <!-- end 画布刮开50%, 出现在最上层的按钮 -->
        </div>
        <div class="scratch_ticker__more-time">
            <span>今天您还有 {{remain}} 次刮奖机会</span>
            <span class="division" v-if="remain>0"></span>
            <span @click="scratchAgain" v-if="remain>0">再刮一次</span>
        </div>
        <div class="scratch_ticker__rule" @click="seeRule">
            查看活动规则
        </div>
        <div ref="img" v-show="false"></div>
    </div>
</template>

<script>
/* eslint-disable */
    let data;
    let total;
    import { setFontSize } from './font-size'
    export default {
        data() {
            return {
                // 正在刮
                isDoing: true,
                // 刮好了
                isCompleted: false,
                // 剩余抽奖次数
                remain: 9,
                globalCanvas: {},
                globalCtx: {},
                globalCanvasTop: '',
                globalCanvasLeft: '',
                scale: 1,
                showGray: false
            };
        },

        mounted() {
            // 如果我只需要本router view的

            setFontSize()

            console.log('111',this.$refs.img)
            this.globalCanvas = this.$refs.myCanvas;
            this.globalCtx = this.globalCanvas.getContext('2d');
            this.initCanvas(this.globalCtx);

            let T = 0,
                L = 0,
                Ele = this.globalCanvas;

            while (Ele) {
                T += Ele.offsetTop;
                L += Ele.offsetLeft;
                Ele = Ele.offsetParent;
            }

            this.globalCanvasTop = T;
            this.globalCanvasLeft = L;

            // 实例展示的宽和rem为单位的750的比例,触摸点的坐标系
            let wX = document.documentElement.clientWidth;
            this.scale = wX / 750;
        },
        methods: {
            // 初始化画布,画上涂层
            initCanvas(ctx) {
                this.showGray = false;
                this.globalCtx.globalAlpha = 1;
                this.globalCtx.globalCompositeOperation = 'source-over';
                let X1 = this.globalCanvas.width;
                let Y1 = this.globalCanvas.height;
                let oImg = new Image();

                oImg.src = require('@a/scratch_ticket/scratch_ticket_bg3@3x.png');
                console.log(oImg);
                oImg.onload = function() {
                    ctx.beginPath();
                    ctx.drawImage(oImg, 0, 0, X1, Y1);
                    ctx.closePath();
                };
            },
            //  开始刮奖
            toStart() {
                // 关闭 初始化的第一层
                this.isDoing = false;
                // 添加事件监听
                this.addEventListener();
            },
            // 查看抽奖结果
            toResult() {
                alert('查看抽奖结果');
            },

            // 添加监听事件
            addEventListener() {
                let _this = this;
                // true 捕获 false 冒泡
                let myCanvas = document.getElementById('myCanvas');
                myCanvas.addEventListener('touchstart', _this.start, false);
                myCanvas.addEventListener('touchmove', _this.move, false);
                myCanvas.addEventListener('touchend', _this.end, false);
            },
            // 取消监听
            removeEventListener() {
                let _this = this;
                let myCanvas = document.getElementById('myCanvas');
                myCanvas.removeEventListener('touchstart', _this.start, false);
                myCanvas.removeEventListener('touchmove', _this.move, false);
                myCanvas.removeEventListener('touchend', _this.end, false);
            },
            start(e) {
                this.globalCtx.globalCompositeOperation = 'destination-out';
                this.globalCtx.lineJoin = 'round';
                this.globalCtx.lineCap = 'round';
                this.globalCtx.strokeStyle = '#336699';
                this.globalCtx.lineWidth = 120;

                //draw single dot in case of a click without a move
                this.globalCtx.beginPath();
                this.globalCtx.arc(
                    (e.touches[0].pageX - this.globalCanvasLeft) / this.scale,
                    (e.touches[0].pageY - this.globalCanvasTop) / this.scale,
                    120 / 2,
                    0,
                    Math.PI * 2,
                    true
                );
                this.globalCtx.closePath();
                this.globalCtx.fill();

                //start the path for a drag
                this.globalCtx.beginPath();
                this.globalCtx.moveTo(
                    (e.touches[0].pageX - this.globalCanvasLeft) / this.scale,
                    (e.touches[0].pageY - this.globalCanvasTop) / this.scale
                );
            },
            move(e) {
                this.globalCtx.lineTo(
                    (e.touches[0].pageX - this.globalCanvasLeft) / this.scale,
                    (e.touches[0].pageY - this.globalCanvasTop) / this.scale
                );
                this.globalCtx.stroke();
            },
            end(e) {
                // 计算刮开区域占比，超过1/2为刮好了
                let completed = 0;
                // 4个数记录1个相素的rgba值
                data = this.globalCtx.getImageData(0, 0, 621, 330).data;
                total = data.length / 4;
                for (let i = 3, len = data.length; i < len; i += 12) {
                    if (data[i] === 0) {
                        completed += 3;
                    }
                }
                if (completed > total * 2 / 10) {
                    // 是否直接触发按钮事件
                    this.clearCanvas();
                    // 开启 最上层的按钮
                    this.isCompleted = true;
                }
                this.globalCtx.closePath();
            },
            // 清除画布
            clearCanvas() {
                this.removeEventListener();
                let _this = this;

                // 保存离开手指的时候的页面
                let newImg = new Image();
                let src = this.globalCanvas.toDataURL('image/png');
                newImg.src = src;

                // 清除画布
                let X1 = this.globalCanvas.width;
                let Y1 = this.globalCanvas.height;

                this.globalCtx.globalCompositeOperation = 'source-over';

                let count = 0;
                let timer = setInterval(() => {
                    if (count > 10) {
                        _this.showGray = true;
                        clearInterval(timer);
                    }
                    _this.globalCtx.beginPath();
                    _this.globalCtx.clearRect(0, 0, X1, Y1);

                    _this.globalCtx.globalAlpha = 1 - count * 0.1;

                    _this.globalCtx.drawImage(newImg, 0, 0, X1, Y1);
                    _this.globalCtx.closePath();
                    count++;
                }, 16.67);
            },
            // 重绘画布
            redraw() {
                this.isCompleted = false;
                this.initCanvas(this.globalCtx);
                this.addEventListener();
            },
            // 再刮一次
            scratchAgain() {
                // 如果还没有刮出来结果，不能浪费次数吧
                if (!this.isCompleted) {
                    return;
                }
                this.redraw();
                this.remain--;
            },
            // 查看规则
            seeRule() {
                alert('查看规则');
            },
            // 我的奖品
            myAward() {
                alert('我的奖品');
            }
        }
    };
</script>


<style lang="less">
    .scratch_ticket {
        background: url('~@a/scratch_ticket/scratch_ticket_bg@3x.png');
        background-size: 100% 100%;
        width: 100%;
        height: 100vh;
        text-align: center;
        .scratch_ticket__top {
            height: 4.14rem;
            width: 100%;
            color: #fff;
            text-align: center;
            text-shadow: 13px 13px 29px rgba(191, 48, 34, 0.3);
            .scratch_ticket__top__first-line {
                font-size: 1.1rem;
                line-height: 1.3rem;
                padding-top: 1.36rem;
            }
            .scratch_ticket__top__second-line {
                font-size: 0.48rem;
                line-height: 0.68rem;
                padding: 0.1rem 0 0.7rem 0;
            }
        }
        .scratch_ticket__main {
            background: url('~@a/scratch_ticket/scratch_ticket_bg2@3x.png');
            background-size: 100% 100%;
            width: 7.02rem;
            height: 4.31rem;
            margin: 0 auto;
            text-align: center;
            position: relative;
            .scratch_ticket__main__z-index-1 {
                position: absolute;
                z-index: 1;
                width: 6.21rem;
                height: 3.3rem;
                left: 0.405rem;
                top: 0.26rem;

                .scratch_ticket__main__z-index-1__first-line {
                    font-size: 0.36rem;
                    line-height: 0.56rem;
                    color: #333;
                    padding-top: 0.52rem;
                }
                .scratch_ticket__main__z-index-1__second-line {
                    font-size: 0.48rem;
                    line-height: 0.68rem;
                    color: #ff0000;
                    padding: 0.04rem 0 0.06rem 0;
                }
                .scratch_ticket__main__z-index-1__btn {
                    height: 1.12rem;
                    width: 2.95rem;
                    background: url('~@a/scratch_ticket/btn1@3x.png');
                    background-size: 100% 100%;
                    margin: 0 auto;
                }
            }
            .scratch_ticket__main__z-index-1--gray-background {
                background: #f5f5f5;
            }
            .scratch_ticket__main__z-index-2 {
                position: absolute;
                z-index: 2;
                height: 3.3rem;
                width: 100%;
                padding-top: 0.26rem;
                #myCanvas {
                    height: 3.3rem;
                    width: 6.21rem;
                }
            }
            .scratch_ticket__main__z-index-3 {
                position: absolute;
                z-index: 3;
                width: 100%;
                height: 4.31rem;
                color: #ff4c4b;
                .scratch_ticket__main__z-index-3__first-line {
                    font-size: 0.48rem;
                    line-height: 0.66rem;
                    padding-top: 0.79rem;
                }
                .scratch_ticket__main__z-index-3__second-line {
                    font-size: 0.36rem;
                    line-height: 0.54rem;
                    padding-bottom: 0.13rem;
                }
                .scratch_ticket__main__z-index-3__btn {
                    height: 0.7rem;
                    width: 2.55rem;
                    background: url('~@a/scratch_ticket/btn@3x.png');
                    background-size: 100% 100%;
                    margin: 0 auto;
                    color: #fff;
                    font-size: 0.48rem;
                    line-height: 0.7rem;
                }
            }
            .scratch_ticket__main__z-index-4 {
                position: absolute;
                z-index: 4;
                width: 2.55rem;
                height: 0.7rem;
                top: 2.28rem;
                left: 2.235rem;
                margin: 0 auto;
                border-radius: 1.2rem;
            }
        }
        .scratch_ticker__more-time {
            padding: 0 0.27rem;
            text-align: center;
            font-size: 0;
            background: rgba(0, 0, 0, 0.1);
            border-radius: 0.27rem;
            display: inline-block;
            margin-top: 0.3rem;
            span {
                font-size: 0.32rem;
                color: #fff;
                line-height: 0.54rem;
            }
            .division {
                height: 0.2rem;
                display: inline-block;
                border-left: 1px solid #fff;
                margin: 0 0.2rem;
            }
        }
        .scratch_ticker__rule {
            font-size: 0.24rem;
            color: #fff;
            line-height: 0.44rem;
            margin-top: 1.5rem;
            text-align: center;
            text-decoration: underline;
        }
    }
</style>
