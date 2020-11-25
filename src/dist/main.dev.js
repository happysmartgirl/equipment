"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App"));

var _router = _interopRequireDefault(require("./router"));

var _echarts = _interopRequireDefault(require("echarts"));

var _elementUi = _interopRequireDefault(require("element-ui"));

var _store = _interopRequireDefault(require("./store"));

require("element-ui/lib/theme-chalk/index.css");

require("@/assets/style/common.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
_vue["default"].use(_elementUi["default"]);

_vue["default"].prototype.$echarts = _echarts["default"];
_vue["default"].config.productionTip = false;
/* eslint-disable no-new */

new _vue["default"]({
  el: '#app',
  router: _router["default"],
  store: _store["default"],
  components: {
    App: _App["default"]
  },
  template: '<App/>'
});
//# sourceMappingURL=main.dev.js.map
