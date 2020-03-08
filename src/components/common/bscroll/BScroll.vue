<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot>

      </slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "BScroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        bscroll: {},

      }
    },
    mounted() {
      //1.创建BScroll对象
      this.bscroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      });
      //2.监听滚动的位置，将滚动的位置信息发送给父组件，父组件根据位置决定是否显示返回顶部按钮
      if(this.probeType === 2 || this.probeType ===3){
        this.bscroll.on('scroll', (position) => {
          this.$emit('showBackTop', position)
        })
      }

      //3.上拉加载更多
      if(this.pullUpLoad){
        this.bscroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }

    },
    methods: {
      //封装的跳转首页效果
      scrollTop(x, y, time = 500) {
        this.bscroll && this.bscroll.scrollTo(x, y, time);
      },
      //下拉加载完成，以便下次下拉加载
      finishPullUp() {
        this.bscroll && this.bscroll.finishPullUp();
      },
      //重新计算下拉的高度
      refresh(){
        this.bscroll && this.bscroll.refresh();
      },
      //获取离开时的Y坐标
      getScrollY(){
        return this.bscroll ? this.bscroll.y : 0;
      }
    }
  }
</script>

<style scoped>

</style>
