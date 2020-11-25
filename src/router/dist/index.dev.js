"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Login = _interopRequireDefault(require("@/views/Login.vue"));

var _about = _interopRequireDefault(require("@/views/about.vue"));

var _OverView = _interopRequireDefault(require("@/views/OverView.vue"));

var _register = _interopRequireDefault(require("@/views/register.vue"));

var _dictionary = _interopRequireDefault(require("@/views/dictionary.vue"));

var _management = _interopRequireDefault(require("@/views/management.vue"));

var _RegisterDetail = _interopRequireDefault(require("@/views/RegisterDetail.vue"));

var _RegisterAdd = _interopRequireDefault(require("@/views/RegisterAdd.vue"));

var _RegisterEdit = _interopRequireDefault(require("@/views/RegisterEdit.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueRouter["default"]);

var router = new _vueRouter["default"]({
  routes: [{
    path: '/',
    //直接跳转到/login
    redirect: '/login'
  }, {
    path: '/login',
    name: 'login',
    component: _Login["default"]
  }, {
    path: '/about',
    name: 'about',
    component: _about["default"],
    children: [{
      path: 'overview',
      name: 'overview',
      component: _OverView["default"]
    }, {
      path: 'register',
      name: 'register',
      component: _register["default"]
    }, {
      path: 'dictionary',
      name: 'dictionary',
      component: _dictionary["default"]
    }, {
      path: 'management',
      name: 'management',
      component: _management["default"]
    }, {
      path: 'registerdetail/:id',
      name: 'registerdetail',
      component: _RegisterDetail["default"]
    }, {
      path: 'registeradd',
      name: 'registeradd',
      component: _RegisterAdd["default"]
    }, {
      path: 'registeredit/:id',
      name: 'registeredit',
      component: _RegisterEdit["default"]
    }]
  }]
});
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=index.dev.js.map
