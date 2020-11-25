<template>
<div class="father">
    <slot name="else" :name="name"></slot>
</div>
</template>
<script>
    export default{
        data(){
            return {
                name:'1'
            }
        }
    }
</script>
<style lang="sass">
.father
    width: 100px 
    height: 100px
    background: blue
</style>