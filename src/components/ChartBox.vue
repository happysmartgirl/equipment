<template>
    <div ref="chart" class="chart-box">
    </div>
</template>
<script>

export default{
    data(){
        return {
            chart: null
        }
    },
    methods: {
        //圖標内部調用初始化echarts實例
        init(){
            console.log(this.$echarts)
            this.chart = this.$echarts.init(this.$refs.chart)
        },
        //父組件通過this.$refs調用draw可以畫圖
        draw(option){
            if(!this.chart) this.init()
            this.chart.setOption(option)
        },
        resize(){
            this.chart && this.chart.resize()
        }
    },
    mounted(){
        this.init()
    },
    beforeDestroy(){
        if(this.chart) this.chart.dispose()
    }
}
</script>
<style></style>