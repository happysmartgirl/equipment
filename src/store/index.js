import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
    state:{
        username: '',
        permissions:[],
        isShowToast:false,
        preStatusList:[],
        equipStatusList:[],
        categoryList:[]
    },
    mutations:{
        setUsername(state,val){
            state.username = val
        },
        setPermissions(state,list){
            state.permissions = list
        },
        setPreStatusList(state,list){
            state.preStatusList = list
        },
        setEquipStatusList(state,list){
            state.equipStatusList = list
        },
        setCategoryList(state,list){
            state.categoryList = list
        }
    },
    actions:{},
    getters:{
        preStatusObj:state=>{
            let obj = {};
            state.preStatusList.forEach(item=>{
                obj[item.id] = item
            })
            return obj
        },
        equipStatusObj(state){
            let obj = {};
            state.equipStatusList.forEach(item=>{
                obj[item.id] = item
            })
            return obj
        },
        categoryObj(state){
            let obj = {};
            state.categoryList.forEach(item=>{
                obj[item.id] = item
            })
            return obj
        },
    }
})
export default store