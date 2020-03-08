<template>
  <div id="home">
      <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <tab-control :titles="titles" class="tab-control" @TabControl="TabControl" ref="tabControl1" v-show="isShowTabControl"/>
      <!--    <tab-control :titles="titles" class="tab-control" @TabControl="TabControl" ref="tabControl" />-->

      <!--    滚动开始-->
      <b-scroll class="home-content" ref="scroll" :probeType="3" :pullUpLoad="true" @showBackTop="showBackTop"
                @pullingUp="loadMore">

        <home-swiper :banners="banners" @SwiperImgLoadFinish="SwiperImgLoadFinish"/>

        <recommend-view :recommends="recommends"/>

        <feature-view/>

        <tab-control :titles="titles"  @TabControl="TabControl" ref="tabControl2"/>
        <goods-list :goodsLists="showGoods"/>

      </b-scroll>
      <!--    滚动结束-->
      <back-top @click.native="backTop" v-show="isShowBackTop"/>


  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import BScroll from 'components/common/bscroll/BScroll'
  import TabControl from "components/content/TabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import BackTop from "components/content/backTop/BackTop"

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";


  import {getHomeMultiData, getHomeGoods} from "network/home"
  import {debounce} from "common/utils";

  export default {
    name: "home",
    created() {
      //获取商城首页banner和推荐
      this.getHomeMultiData();

      //获取商城首页商品信息列表
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    activated(){
      if(this.saveY>0){
        this.$refs.scroll.scrollTop(0,-this.saveY,0);
      }
      //
    },
    deactivated(){
      this.saveY = this.$refs.scroll.getScrollY();
    },
    mounted(){
      //  监听事件总线
      const de= debounce(this.$refs.scroll.refresh,10);
      this.$bus.$on('itemImgLoad', () => {
        de();
      })
    },
    components: {
      NavBar,
      TabControl,
      GoodsList,
      HomeSwiper,
      RecommendView,
      FeatureView,
      BScroll,
      BackTop
    },
    data() {
      return {
        currentType: 'pop',
        banners: [],
        recommends: [],
        titles: ['流行', '新款', '精选'],
        goods: {
          'pop': {page: 0, lists: []},
          'new': {page: 0, lists: []},
          'sell': {page: 0, lists: []}
        },
        isShowBackTop: false,
        tabControlOffTopHeight:0,
        isShowTabControl:false,
        saveY:0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].lists
      }
    },
    methods: {
      //事件监听相关的方法
      TabControl(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
        //使用的两个<tab-control 将他们的index都赋值为相同的数据，
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      showBackTop(position) {
        //1.根据用户滑动页面到哪里的位置，来决定返回头部的按钮是否显示
        this.isShowBackTop = (-position.y) > 1000
        //2.根据用户滑动到流行、新款、精选时，吸顶
        this.isShowTabControl = (-position.y) > this.tabControlOffTopHeight;
      },
      backTop() {
        //因为ref绑定在组件上，那么通过this.$refs.refname就可以得到一个组件对象(方法、属性)
        this.$refs.scroll.scrollTop(0, 0);
      },
      loadMore() {
        console.log(this.currentType);
        this.getHomeGoods(this.currentType);
      },
      //轮播图加载完成后，得到tabControl距离顶部的高度。
      // 为什么不在create和mounted里面做呢？
      // 因为create创建完成后，会查找不到tabControl组件
      //mounted里面得到的高度是不准确的，如果轮播图、推荐图是会由于网络加载延迟的问题得到的高度就不准确，
      //所以在图片加载完成后，使用offsettop来得到高度
      SwiperImgLoadFinish(){
        this.tabControlOffTopHeight = this.$refs.tabControl2.$el.offsetTop;
      },
      //网络请求相关的方法
      getHomeMultiData() {
        getHomeMultiData().then(res => {
          if(res.data){
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
          }

        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          if(res){
            this.goods[type].lists.push(...res.data.list);
            this.goods[type].page = page;
          }

          //执行下拉刷新成功，以便下次使用
          this.$refs.scroll.finishPullUp();
        })
      },
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    position: relative;
    /*设置高度不是由内容撑开的，而是视口的100%*/
    height: 100vh;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /*这是给购物街设置了fixed，是因为使用游览器默认的滚动时，
    会和所有的内容一起滚动，所以设置这个让其脱离标准流，
    但是现在使用better-scroll设置了局部滚动，所以不需要再使用fixed*/
    /*position: fixed;*/
    /*top: 0px;*/
    /*left: 0px;*/
    /*right: 0px;*/
    /*z-index: 9*/
  }


  .tab-control{
    position: relative;
    /*top: 44px;*/
    left: 0;
    right: 0;
    z-index: 9;
  }

  /*使用游览器自带的滚动，滚动到navtab位置时候停留*/
  /*.tab-control {*/
  /*  position: sticky;  这个属性可以自动吸顶*/
  /*  top: 44px;*/
  /*  z-index: 9;*/
  /*}*/

  /*设置滚动的高度*/
  .home-content {
    /*相对于父元素做的相对定位，因为top44是导航的高度，bottom49是菜单栏的高度，所以两个相减就可以得到滚动元素的高度*/
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    background-color: #fff;
    overflow: hidden;
  }
</style>
