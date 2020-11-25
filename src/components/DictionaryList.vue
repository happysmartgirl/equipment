<template>
 <ul class="dictionary-list">
    <li class="title">
        <div>编号</div>
        <div>名称</div>
        <div v-if="type!='categoryList'">颜色</div>
    </li>
    <draggable v-model="list">
        <transition-group>
          
          <li v-for="item,index in list" :key="index">
              <div>{{item.id}}</div>
              <div  @dblclick="onEdit(index,'name')">
                  <input :value="item.name" v-if="index===activeItem.index && activeItem.type==='name'" @blur="onSave($event.target.value)"/>
                  <p v-else>{{item.name}}</p>
              </div>
              <div v-if="type!='categoryList'" @dblclick="onEdit(index,'color')">
                  <input :value="item.color" v-if="index===activeItem.index && activeItem.type==='color'"  @blur="onSave($event.target.value)"/>
                  <p v-else>{{item.color}}</p>
              </div>
          </li>
        </transition-group>
    </draggable>
</ul>
</template>

<script>
import draggable from 'vuedraggable'
import axios from 'axios'
export default{
    data(){
        return{
            list: JSON.parse(JSON.stringify(this.$store.state[this.type])),
            //標記每个单元格
            activeItem:{
                index:-1,
                type:""
            }
        }
    },
    props:['type'],
    components:{
        draggable
    },
    methods: {
        onEdit(index,type){
            this.activeItem.index = index
            this.activeItem.type = type
            console.log(this.activeItem)
        },
        onSave(val){
            const {type,list} = this
            const currentRow = list[this.activeItem.index]
            console.log(currentRow.id)
            let dt={
              id: currentRow.id
            }
            let url = ''
            if(type==="categoryList"){
                url = '/equipment/category-edit'
                dt.name = val
            }else{
                url = '/equipment/status-edit'
                if(type==='preStatusList'){
                  dt.type = 'pre'
                }else {
                  dt.type = 'equip'
                }
                dt.name = this.activeItem.type==='name'?val:currentRow.name;
                dt.color = this.activeItem.type==="color"?val:currentRow.color
            }
            console.log(this.activeItem.type)

            axios.post(url,dt).then(()=>{
              console.log(this.activeItem,val)
              this.list[this.activeItem.index][this.activeItem.type] = val
              this.$notify.success({
                title:'编辑成功',
                showClose:false
              })
              this.activeItem = {
                index:-1,
                type:""
              }
              if(type==="categoryList"){
                this.$store.commit('setCategoryList',this.list.slice())
              }else if(type==='equipStatusList'){
                this.$store.commit('setEquipStatusList',this.list.slice())
              }else if(type==='preStatusList'){
                 this.$store.commit('setPreStatusList',this.list.slice())
              }
              console.log(this.list)

            })


        },
        saveOrder(){
            const {type,list} = this
            const ids = this.list.map(i=>i.id)
            let dt={ids}
            let url = ''
            if(type=="categoryList"){
                url = '/equipment/category-order'
            }else{
                url = '/equipment/status-order'
                dt.type=type==='preStatusList'?'pre':'equip'
            }
            axios.post(url,dt).then(()=>{
                if(type=="categoryList"){
                    this.$store.commit('setCategoryList',this.list.slice())
                }else  if(type=='equipmentStatusList'){
                  this.$store.commit('setPreStatusList',this.list.slice())
                }else{
                    this.$store.commit('setEquipStatusList',this.list.slice())
                }
                this.$notify({
                    title: '排序成功'
                });
            })
        }
    },
    watch:{
        list(){
            const {activeItem:item} = this
            if(item.index===-1 && item.type===""){
                this.saveOrder()
            }
        }
    }
    //- computed:{
    //-     list:{
    //-         get(){
    //-             return this.$store.state[this.type].slice()
    //-         },
    //-         set(val){

    //-         }
    //-     }
    //- }
}
</script>
<style lang="sass">
.dictionary-list
    li
        border-bottom: 1px solid #eee
        display: flex
        width: 100%
        line-height: 40px
        justify-content: space-between
        &:hover
            opacity: .6
        div
            line-height: 40px
            text-align: center
            width: 30%
</style>
