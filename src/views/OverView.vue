<template lang="pug">
.over-view
    h3 系统橄榄
    .top-list
        .top-item.number
            p 设备总数
            countTo(:startVal='10' :endVal='overview.number' :duration='3000')

        .top-item.amount
            p 设备总金额
            countTo(:startVal='10' :endVal='overview.amount' :duration='3000')
    .chart-list
        chart-box.status-overview(ref="status")
        chart-box.category-overview(ref="category")
</template>
<script>
import axios from 'axios'
import ChartBox from '@/components/ChartBox.vue'
 import countTo from 'vue-count-to';
export default{
    components:{
        'chart-box':ChartBox,
         countTo
    },
    data(){
        return {
            overview:{},
            statusLabel:[],
            statusValue:[],
            categoryLabel:[],
            categoryValue:[]
        }
    },
    methods: {
        getChartData(){
            Promise.all([axios.get('/equipment/status-overview'),
            axios.get('/equipment/category-overview')]).then((rsp)=>{
                const statusData = rsp[0].data.data
                const categoryData = rsp[1].data.data
                this.initEcharts(statusData,categoryData)
                console.log(statusData)
            })
        },
        initEcharts(statusData,categoryData){
            const data1 = statusData.value.map((item,index)=>{
                return {
                    value:item,
                    name:statusData.label[index]
                }
            })
            console.log(data1)
            this.$refs.status.draw({
                title: {
                    text: '设备状态汇总',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                series: [
                    {
                        type: 'pie',
                        radius: '65%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data: data1,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            })
            this.$refs.category.draw({
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                legend: {
                    data:['销量']
                },
                xAxis: {
                    data: categoryData.label,
                     axisLabel: {
                        interval:0,
                        rotate:40
                    },
                },
                yAxis: {},

                textStyle:{
                    color:'#6e6e6e',
                    fontSize: 24,
                    lineHeight: 60
                },
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: categoryData.value
                }]
            })
        },
        resizeChart(){
            this.$refs.status.resize();
            this.$refs.category.resize()
        }
    },
    created(){
        axios.get('/equipment/overview').then(({data})=>{
            if(data.code==0){
                this.overview = data.data
            }
        })

    },
    beforeDestory(){
        window.removeEventListener('resize')
    },
    mounted(){
        //-  axios.get('/equipment/status-overview').then(({data})=>{
        //-     this.statusLabel = data.data.label
        //-     this.statusValue = data.data.value
        //-     this.initEcharts()
        //- })
        //-  axios.get('/equipment/category-overview').then(({data})=>{
        //-     console.log(data.data)
        //-     this.categoryLabel = data.data.label
        //-      this.categoryValue = data.data.value
        //-      this.initEcharts()
        //- })
        this.getChartData()
        window.addEventListener('resize',()=>{
            this.resizeChart()
        })
    },
    filters: {
        money(val) {
            if (!val) return val;
            val = String(val);
            if (val.indexOf('.') === -1) {
                val += '.00';
            }
            let arr = val.split('.');
            let left = arr[0];
            left = left.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
            return left + '.' + arr[1];
        }
    }
}
</script>
<style scoped lang="sass">
.over-view
    .top-item
        box-sizing: border-box
        display: inline-flex
        flex-direction: column
        justify-content: center
        min-width: 220px
        height: 100px
        padding: 0 30px 0 90px
        border-radius: 8px
        &.number
            color: #AB7DF6
            margin-right: 30px
            background: rgba(171, 125, 246, .2) url(~@/assets/img/icon1.png) no-repeat 30px center
        &.amount
            color: #81C926
            background: rgba(129, 201, 38, .2) url(~@/assets/img/icon2.png) no-repeat 30px center
        p
            line-height: 1.2em
            text-align: center
            font-size: 16px
            white-space: nowrap
            &:last-child
                font-size: 36px
                font-weight: bold
    .chart-list
        width: 100%
        display: flex
        margin-right: 20px
        margin-top: 20px
        .status-overview
            margin-right: 20px
            background: #f3f3f3
            height: 420px
            &.status-overview
                width: 37.719%
        .category-overview
            margin-right: 20px
            background: #f3f3f3
            height: 420px
            &.category-overview
                width: 58.771%




</style>
