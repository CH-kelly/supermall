<template>
    <div class="tabBarItem" @click="chickItem">
        <div v-if="!isActive"><slot name="tab-icon"></slot></div>
        <div v-else><slot name="tab-icon-active"></slot></div>
        <div :class="{'active':isActive}"><slot name="tab-text"></slot></div>
    </div>
</template>

<script>
    export default {
        name: "TabBarItem",
        props:{
          path:{
              type:String,
              default:'/home'
          }
        },
        computed:{
            isActive(){
                return this.$route.path.indexOf(this.path) !== -1
            }
        },
        methods:{
            chickItem(){
                this.$router.push(this.path);
            }

        }
    }
</script>

<style scoped>

</style>