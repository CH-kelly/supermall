<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :class="{active: currentIndex === index}"
         class="tab-control-item"
         :key="index"
         @click="tabClick(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      tabClick(index) {
        this.currentIndex = index
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    line-height: 40px;
    text-align: center;
    font-size: 15px;
    background-color: #fff;

  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control span {
    padding: 5px;
  }

  .tab-control .active {
    color: var(--color-high-text);
  }

  .tab-control .active span {
    border-bottom: 2px solid var(--color-high-text);
  }
</style>
