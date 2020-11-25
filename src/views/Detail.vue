<template lang="pug">
.detail 
    p(v-for="item,index in list" :key="index") {{item}} {{id}}
</template>
<script>
export default{
    data(){
        return {
            list:[1,2,3,4,5],
            id: this.$route.params.id
        }
    },
    created(){
        console.log(this.id)
    }
}
</script>
<style lang="sass"></style>