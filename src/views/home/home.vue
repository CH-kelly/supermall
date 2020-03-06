<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <home-swiper :banners="banners"/>

    <recommend-view :recommends="recommends" />

    <feature-view />

    <tab-control :titles="titles" class="tab-control"/>
    <goods-list :goodsLists="goods['pop'].lists"  />


    <ul>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li><li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>

    </ul>


  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/TabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";


  import {getHomeMultiData,getHomeGoods} from "network/home"


  export default {
    name: "home",
    components: {
      NavBar,
      TabControl,
      GoodsList,
      HomeSwiper,
      RecommendView,
      FeatureView
    },
    data() {
      return {
        banners: [],
        recommends: [],
        titles:['流行','新款','精选'],
        goods:{
          'pop':{page:0,lists:[]},
          'new':{page:0,lists:[]},
          'sell':{page:0,lists:[]}
        }
      }
    },
    created() {
      //获取商城首页banner和推荐
      this.getHomeMultiData();

      //获取商城首页商品信息列表
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

    },
    methods:{
      getHomeMultiData(){
        getHomeMultiData().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res=>{
          console.log(res);
          this.goods[type].lists.push(...res.data.list);
          this.goods[type].page = page;
        })
      }
    }
  }
</script>

<style scoped>
  #home{
    padding-top:44px;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    top:0px;
    left: 0px;
    right: 0px;
    z-index:9
  }
  /*滚动到navtab位置时候停留*/
  .tab-control{
    position: sticky;
    top: 44px;
    z-index: 9;
  }
</style>
