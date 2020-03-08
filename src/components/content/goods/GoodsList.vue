<template>
  <div class="goods-lists">
    <goods-list-item v-for="(item,index) in goodsLists" :key="index" :goods="item"/>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";

  export default {
    name: "GoodsList",
    props: {
      goodsLists: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      GoodsListItem
    }
  }
</script>

<style scoped>
  .goods-lists {
    padding: 2px;
    display: flex;
    flex-flow: wrap;

    justify-content: space-around;

  }
</style>
