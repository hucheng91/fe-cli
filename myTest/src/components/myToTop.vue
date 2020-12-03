<style lang="scss" rel="stylesheet/scss">
    .slide-fade-enter-active {
        transition: all .1s ease;
    }
    .slide-fade-leave-active {
        transition: all .1s cubic-bezier(1.0, 0.3, 0.8, 1.0);
        opacity: 0;
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active 在低于 2.1.8 版本中 */ {
        transform: translateY(-20px);
        opacity: 0;
    }
    .page-component-up {
        background-color: #4eb1fb;
        position: fixed;
        right: 1rem;
        bottom: 1rem;
        width: 50px;
        height: 50px;
        border-radius: 25px;
        cursor: pointer;
        opacity: .4;
        transition: .3s;
        text-align: center;
        z-index: 999;
    }
    .tri {
        width: 0;
        height: 0;
        border: 12px solid transparent;
        border-bottom-color: #dfe6ec;
        text-align: center;
    }
    .hover {
        background-color: red;
    }
</style>

<template>
  <transition name="slide-fade">
    <div
      v-show="isShow"
      class="page-component-up"
      @click="getTop"
    >
      <i class="tri" />
    </div>
  </transition>
</template>

<script>
export default {
    data () {
            return {
                isShow: false,
                target: ''
            }
    },
    mounted () {
        this.target = document.querySelector(".content-container");
        this.target.addEventListener('scroll', this.showIcon);
    },
    beforeDestroy () {
        this.target.removeEventListener('scroll', this.showIcon);
    },
    methods: {
        showIcon () {
            if (this.target.scrollTop > 100) {
                this.isShow = true;
            } else if (this.target.scrollTop < 100) {
                this.isShow = false;
            }
        },
        getTop () {
            // 点击icon之后自动返回顶部的函数
            let timer = setInterval(() => {
                let top = this.target.scrollTop;
                let speed = Math.ceil(top / 5);
                this.target.scrollTop = top - speed;
                if (top === 0) {
                    clearInterval(timer);
                    this.isShow = false;
                }
            }, 20)
        }
    }
}
</script>
