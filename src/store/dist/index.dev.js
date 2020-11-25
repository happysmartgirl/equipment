"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var store = new _vuex["default"].Store({
  state: {
    username: '',
    permissions: [],
    isShowToast: false,
    preStatusList: [],
    equipStatusList: [],
    categoryList: []
  },
  mutations: {
    setUsername: function setUsername(state, val) {
      state.username = val;
    },
    setPermissions: function setPermissions(state, list) {
      state.permissions = list;
    },
    setPreStatusList: function setPreStatusList(state, list) {
      state.preStatusList = list;
    },
    setEquipStatusList: function setEquipStatusList(state, list) {
      state.equipStatusList = list;
    },
    setCategoryList: function setCategoryList(state, list) {
      state.categoryList = list;
    }
  },
  actions: {},
  getters: {
    preStatusObj: function preStatusObj(state) {
      var obj = {};
      state.preStatusList.forEach(function (item) {
        obj[item.id] = item;
      });
      return obj;
    },
    equipStatusObj: function equipStatusObj(state) {
      var obj = {};
      state.equipStatusList.forEach(function (item) {
        obj[item.id] = item;
      });
      return obj;
    },
    categoryObj: function categoryObj(state) {
      var obj = {};
      state.categoryList.forEach(function (item) {
        obj[item.id] = item;
      });
      return obj;
    }
  }
});
var _default = store;
exports["default"] = _default;
//# sourceMappingURL=index.dev.js.map
