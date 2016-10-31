/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ApplicationData = __webpack_require__(1);

	var _NavigationBar = __webpack_require__(2);

	var _NavigationBar2 = _interopRequireDefault(_NavigationBar);

	var _Splitter = __webpack_require__(4);

	var _Splitter2 = _interopRequireDefault(_Splitter);

	var _Tree = __webpack_require__(5);

	var _Tree2 = _interopRequireDefault(_Tree);

	var _Menu = __webpack_require__(6);

	var _Menu2 = _interopRequireDefault(_Menu);

	var _Tabs = __webpack_require__(7);

	var _Tabs2 = _interopRequireDefault(_Tabs);

	var _Button = __webpack_require__(8);

	var _Button2 = _interopRequireDefault(_Button);

	var _ScheduleView = __webpack_require__(9);

	var _ScheduleView2 = _interopRequireDefault(_ScheduleView);

	var _ScoreList = __webpack_require__(20);

	var _ScoreList2 = _interopRequireDefault(_ScoreList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var splitter = new _Splitter2.default(); // import * as math from "./hello/math";
	// console.log("2π = " + math.sum(math.pi, math.pi));

	splitter.render($('#content-inside'));

	var data = [{
	  label: "Jadwal",
	  expanded: true,
	  items: [{
	    id: 'jadwal_umum',
	    label: "Jadwal Umum",
	    selected: true
	  }, {
	    id: 'jadwal_rs',
	    label: "Jadwal Rumah Sakit"
	  }]
	}, {
	  label: "Siswa",
	  expanded: true,
	  items: [{
	    id: 'data_siswa',
	    label: "Data Siswa"
	  }, {
	    id: 'data_nilai',
	    label: "Data Nilai"
	  }]
	}, {
	  label: "Dosen",
	  expanded: true,
	  items: [{
	    id: 'dosen',
	    label: "Data Dosen"
	  }, {
	    id: 'anggaran',
	    label: "Anggaran"
	  }]
	}];

	var tree = new _Tree2.default({
	  data: data,
	  onClick: function onClick(item) {

	    if (item.id == 'data_nilai') {
	      tabs.add(item.id, item.label, scoreList);
	    }
	  }
	});

	// var menu = new Menu({data: getMenuData()});
	// menu.render($('#top-menu'));

	var scoreList = new _ScoreList2.default();

	var navigationBar = new _NavigationBar2.default([{
	  title: 'Application',
	  content: tree
	}, {
	  title: 'Settings'
	}]);
	navigationBar.render($('#left-content'));

	var scheduleView = new _ScheduleView2.default();

	var tabs = new _Tabs2.default([{
	  title: 'Jadwal',
	  content: scheduleView
	}]);

	tabs.render($('#right-content'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getMenuData = getMenuData;
	function getMenuData() {
	    var data = [{
	        "id": "12",
	        "text": "Account",
	        "parentid": "-1",
	        "subMenuWidth": '250px'
	    }, {
	        "text": "Help",
	        "id": "1",
	        "parentid": "-1",
	        "subMenuWidth": '250px'
	    }, {
	        "id": "13",
	        "text": "Profile",
	        "parentid": "12"
	    }, {
	        "id": "14",
	        "text": "Logout",
	        "parentid": "12"
	    }];

	    return data;
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NavigationBar = function () {
	  function NavigationBar(items) {
	    _classCallCheck(this, NavigationBar);

	    this.id = (0, _Utils.guid)();
	    this.items = items;
	  }

	  _createClass(NavigationBar, [{
	    key: 'render',
	    value: function render(container) {
	      var navigationBarContainer = $('<div></div>');
	      navigationBarContainer.attr('id', this.id);
	      for (var i = 0; i < this.items.length; i++) {

	        var title = $('<div>' + this.items[i].title + '</div>');
	        title.appendTo(navigationBarContainer);

	        var contentContainer = $('<div></div>');
	        contentContainer.appendTo(navigationBarContainer);

	        if (this.items[i].content) {
	          this.items[i].content.render(contentContainer);
	        }
	      }
	      navigationBarContainer.appendTo(container);

	      navigationBarContainer.jqxNavigationBar({
	        theme: 'metro',
	        width: '101%',
	        height: '100%'
	      });
	    }
	  }]);

	  return NavigationBar;
	}();

	exports.default = NavigationBar;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.guid = guid;
	function guid() {
	  function s4() {
	    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	  }
	  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Splitter = function () {
	  function Splitter() {
	    _classCallCheck(this, Splitter);

	    this.id = (0, _Utils.guid)();
	  }

	  _createClass(Splitter, [{
	    key: 'render',
	    value: function render(container) {
	      container.jqxSplitter({ theme: 'metro', width: '100%', height: '100%', panels: [{ size: 200 }] });
	    }
	  }]);

	  return Splitter;
	}();

	exports.default = Splitter;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Tree = function () {
	  function Tree(options) {
	    _classCallCheck(this, Tree);

	    this.id = (0, _Utils.guid)();
	    this.source = options.data;
	    this.onClick = options.onClick;
	  }

	  _createClass(Tree, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;

	      var treeContainer = $('<div></div>');
	      treeContainer.appendTo(container);
	      treeContainer.jqxTree({
	        theme: 'metro',
	        // source: this.records,
	        source: this.source,
	        width: '100%',
	        height: '100%'
	      });

	      treeContainer.on('itemClick', function (event) {
	        var args = event.args;
	        var item = treeContainer.jqxTree('getItem', args.element);
	        if (_this.onClick) {
	          _this.onClick(item);
	        }
	      });
	    }
	  }]);

	  return Tree;
	}();

	exports.default = Tree;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Menu = function () {
	  function Menu(options) {
	    _classCallCheck(this, Menu);

	    this.id = (0, _Utils.guid)();
	    this.data = options.data;
	    this.onClick = options.onClick;
	  }

	  _createClass(Menu, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;

	      var source = {
	        datatype: "json",
	        datafields: [{ name: 'id' }, { name: 'parentid' }, { name: 'text' }, { name: 'subMenuWidth' }],
	        id: 'id',
	        localdata: _this.data
	      };

	      var dataAdapter = new $.jqx.dataAdapter(source);
	      dataAdapter.dataBind();

	      var records = dataAdapter.getRecordsHierarchy('id', 'parentid', 'items', [{ name: 'text', map: 'label' }]);

	      var menuContainer = $('<div></div>');
	      menuContainer.appendTo(container);
	      menuContainer.jqxMenu({
	        theme: 'metro',
	        source: records,
	        width: '100%',
	        height: '100%'
	      });

	      menuContainer.on('itemclick', function (event) {
	        var args = event.args;
	        if (_this.onClick) {
	          _this.onClick(args.id);
	        }
	      });
	    }
	  }]);

	  return Menu;
	}();

	exports.default = Menu;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Tabs = function () {
	  function Tabs(items) {
	    _classCallCheck(this, Tabs);

	    this.id = (0, _Utils.guid)();
	    this.items = items;
	  }

	  _createClass(Tabs, [{
	    key: 'render',
	    value: function render(container) {
	      var tabContainer = $('<div style="margin-top: -1px;"></div>');
	      tabContainer.appendTo(container);
	      tabContainer.attr('id', this.id);
	      var ul = $('<ul></ul>');
	      ul.appendTo(tabContainer);

	      for (var i = 0; i < this.items.length; i++) {

	        var title = $('<li>' + this.items[i].title + '</li>');
	        title.appendTo(ul);
	      }

	      var tempContainer = [];
	      for (var i = 0; i < this.items.length; i++) {

	        var contentContainer = $('<div></div>');
	        contentContainer.appendTo(tabContainer);
	        tempContainer.push(contentContainer);
	      }

	      tabContainer.jqxTabs({
	        theme: 'metro',
	        position: 'top',
	        showCloseButtons: true,
	        width: '100%',
	        height: '100.5%'
	      });

	      for (var i = 0; i < this.items.length; i++) {

	        if (this.items[i].content) {
	          this.items[i].content.render(tempContainer[i]);
	        }
	      }

	      this.component = tabContainer;
	    }
	  }, {
	    key: 'add',
	    value: function add(childTabId, title, content) {

	      var id = this.id + '_' + childTabId;
	      var _contentContainer = '<div id="' + id + '" style="height: 100%;"></div>';
	      this.component.jqxTabs('addLast', title, _contentContainer);

	      content.render($('#' + id));
	    }
	  }]);

	  return Tabs;
	}();

	exports.default = Tabs;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Button = function () {
	  function Button(options) {
	    _classCallCheck(this, Button);

	    this.id = (0, _Utils.guid)();
	    this.onClick = options.onClick;

	    if (options.title) {
	      this.title = options.title;
	    } else {
	      this.title = '';
	    }

	    if (options.width) {
	      this.width = options.width;
	    }

	    if (options.height) {
	      this.height = options.height;
	    }

	    if (options.imgSrc) {
	      this.imgSrc = options.imgSrc;
	    }

	    this.template = options.template;
	    this.theme = options.theme;
	  }

	  _createClass(Button, [{
	    key: 'render',
	    value: function render(container) {
	      var _this = this;

	      var buttonContainer = $('<input type="button" value="' + this.title + '" />');
	      buttonContainer.attr('id', this.id);
	      buttonContainer.appendTo(container);

	      var buttonOptions = {
	        theme: 'light'
	      };

	      if (this.template) {
	        buttonOptions['template'] = this.template;
	      }

	      if (this.theme) {
	        buttonOptions['theme'] = this.theme;
	      }

	      if (this.width) {
	        buttonOptions['width'] = this.width;
	      }

	      if (this.height) {
	        buttonOptions['height'] = this.height;
	      }

	      if (this.imgSrc) {
	        buttonOptions['imgSrc'] = this.imgSrc;
	      }

	      buttonContainer.jqxButton(buttonOptions);

	      if (this.onClick) {
	        $('#' + this.id).on('click', function () {
	          _this.onClick();
	        });
	      }
	    }
	  }]);

	  return Button;
	}();

	exports.default = Button;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _Button = __webpack_require__(8);

	var _Button2 = _interopRequireDefault(_Button);

	var _ToggleButton = __webpack_require__(10);

	var _ToggleButton2 = _interopRequireDefault(_ToggleButton);

	var _TextBox = __webpack_require__(11);

	var _TextBox2 = _interopRequireDefault(_TextBox);

	var _ComboBox = __webpack_require__(12);

	var _ComboBox2 = _interopRequireDefault(_ComboBox);

	var _GanttChart = __webpack_require__(13);

	var _GanttChart2 = _interopRequireDefault(_GanttChart);

	var _LevelComboBox = __webpack_require__(14);

	var _LevelComboBox2 = _interopRequireDefault(_LevelComboBox);

	var _AddScoreWindow = __webpack_require__(15);

	var _AddScoreWindow2 = _interopRequireDefault(_AddScoreWindow);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ScheduleView = function () {
	  function ScheduleView(data) {
	    _classCallCheck(this, ScheduleView);

	    this.id = (0, _Utils.guid)();
	    this.source = data;

	    this.ganttChart = new _GanttChart2.default();
	    this.ganttChartData = { data: [] };
	  }

	  _createClass(ScheduleView, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;

	      var addScheduleButton = new _Button2.default({
	        title: 'Tambah Jadwal',
	        template: 'primary',
	        onClick: function onClick() {
	          var addScoreWindow = new _AddScoreWindow2.default();
	          addScoreWindow.render($('#dialogWindowContainer'));
	          addScoreWindow.open();
	        }
	      });

	      var showWeekButton = new _ToggleButton2.default({
	        title: 'Show Week',
	        onButtonToggled: function onButtonToggled() {
	          _this.ganttChart.useWeekScale();
	        },
	        onButtonNotToggled: function onButtonNotToggled() {
	          _this.ganttChart.useDayScale();
	        }
	      });

	      //---ComboBox---

	      this.levelCmb = new _LevelComboBox2.default({
	        onChange: function onChange(value) {
	          _this.getGanttData();
	        }
	      });
	      //---------------

	      this.searchTextBox = new _TextBox2.default({ placeHolder: 'Stambuk atau Nama', width: 250, height: 24 });
	      var searchButton = new _Button2.default({
	        onClick: function onClick() {
	          _this.getGanttData();
	        },
	        imgSrc: '/ceu_assets/images/search.png',
	        theme: 'metro', width: 30, height: 26
	      });

	      var table = $('<table style="height: 100%; width: 100%; margin: -3px; "></table>');
	      var tr = $('<tr></tr>');
	      var td = $('<td style="padding: 0; height: 40px;"></td>');
	      table.appendTo(container);
	      tr.appendTo(table);
	      td.appendTo(tr);

	      var innerTable = $('<table style="height: 100%; width: 100%;"></table>');
	      var innerTr = $('<tr></tr>');
	      var innerTd = $('<td style="padding-top: 6px; padding-left: 10px; width: 120px; height: 100%;"></td>');
	      innerTable.appendTo(td);
	      innerTr.appendTo(innerTable);
	      innerTd.appendTo(innerTr);
	      addScheduleButton.render(innerTd);

	      innerTd = $('<td style="padding-top: 6px; height: 100%; width: 100px;"></td>');
	      innerTd.appendTo(innerTr);
	      showWeekButton.render(innerTd);

	      innerTd = $('<td style="padding-top: 6px; height: 100%; width: 86px;"></td>');
	      innerTd.appendTo(innerTr);
	      this.levelCmb.render(innerTd);

	      innerTd = $('<td style="padding-top: 6px; height: 100%; width: 250px;"></td>');
	      innerTd.appendTo(innerTr);
	      this.searchTextBox.render(innerTd);

	      innerTd = $('<td style="padding-top: 6px; height: 100%;"></td>');
	      var _tempContainer = $('<div style="margin-left: -5px;"></div>');
	      _tempContainer.appendTo(innerTd);
	      innerTd.appendTo(innerTr);
	      searchButton.render(_tempContainer);

	      tr = $('<tr></tr>');
	      td = $('<td style="padding: 0;"></td>');
	      tr.appendTo(table);
	      td.appendTo(tr);

	      this.ganttChart.render(td);
	    }
	  }, {
	    key: 'processData',
	    value: function processData(data) {

	      this.ganttChartData.data = [];

	      for (var i = 0; i < data.length; i++) {

	        if (data[i].parent_id != null) {
	          this.ganttChartData.data.push({
	            "id": data[i].id,
	            "text": data[i].nama_bagian,
	            "type": "project",
	            "parent": data[i].parent_id,
	            "start_date": new Date(data[i].start_date),
	            "end_date": new Date(data[i].end_date),
	            "order": "",
	            "duration": "",
	            "progress": "",
	            "open": false,
	            "color": data[i].color
	          });
	        } else {
	          this.ganttChartData.data.push({
	            "id": data[i].id,
	            "text": data[i].nama,
	            "type": "project",
	            "start_date": "",
	            "duration": "",
	            "progress": "0",
	            "open": false
	          });
	        }
	      }

	      this.ganttChart.reloadData(this.ganttChartData);
	    }
	  }, {
	    key: 'getGanttData',
	    value: function getGanttData() {
	      var _this = this;
	      var url = "/schedules?searchTxt=" + this.searchTextBox.getValue() + "&level=" + this.levelCmb.getValue();
	      $.ajax({
	        method: "GET",
	        url: url,
	        data: {}
	      }).done(function (data) {
	        _this.processData(data);
	      }).fail(function () {
	        alert('Error while doing operation');
	      });
	    }
	  }]);

	  return ScheduleView;
	}();

	exports.default = ScheduleView;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ToggleButton = function () {
	  function ToggleButton(options) {
	    _classCallCheck(this, ToggleButton);

	    this.id = (0, _Utils.guid)();

	    if (options.title) {
	      this.title = options.title;
	    } else {
	      this.title = 'Button';
	    }

	    if (options.width) {
	      this.width = options.width;
	    }

	    if (options.height) {
	      this.height = options.height;
	    }

	    this.onButtonToggled = options.onButtonToggled;
	    this.onButtonNotToggled = options.onButtonNotToggled;
	  }

	  _createClass(ToggleButton, [{
	    key: 'render',
	    value: function render(container) {
	      var buttonContainer = $('<button>' + this.title + '</button>');
	      buttonContainer.appendTo(container);

	      var buttonOptions = {
	        theme: 'light'
	      };

	      if (this.width) {
	        buttonOptions['width'] = this.width;
	      }

	      if (this.height) {
	        buttonOptions['height'] = this.height;
	      }

	      buttonContainer.jqxToggleButton(buttonOptions);

	      var _this = this;

	      buttonContainer.on('click', function () {
	        var toggled = buttonContainer.jqxToggleButton('toggled');
	        if (toggled) {
	          if (_this.onButtonToggled) {
	            _this.onButtonToggled();
	          }
	        } else {
	          if (_this.onButtonNotToggled) {
	            _this.onButtonNotToggled();
	          }
	        }
	      });
	    }
	  }]);

	  return ToggleButton;
	}();

	exports.default = ToggleButton;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TextBox = function () {
	  function TextBox(options) {
	    _classCallCheck(this, TextBox);

	    this.id = (0, _Utils.guid)();

	    if (options.title) {
	      this.title = options.title;
	    } else {
	      this.title = 'Button';
	    }

	    if (options.width) {
	      this.width = options.width;
	    }

	    if (options.height) {
	      this.height = options.height;
	    }

	    this.placeHolder = options.placeHolder;
	  }

	  _createClass(TextBox, [{
	    key: 'render',
	    value: function render(container) {
	      var textBoxContainer = $('<input type="text" />');
	      textBoxContainer.attr('id', this.id);
	      textBoxContainer.appendTo(container);

	      var textBoxOptions = {
	        theme: 'metro'
	      };

	      if (this.width) {
	        textBoxOptions['width'] = this.width;
	      }

	      if (this.height) {
	        textBoxOptions['height'] = this.height;
	      }

	      if (this.placeHolder) {
	        textBoxOptions['placeHolder'] = this.placeHolder;
	      }

	      textBoxContainer.jqxInput(textBoxOptions);

	      this.component = textBoxContainer;
	    }
	  }, {
	    key: 'getId',
	    value: function getId() {
	      return this.id;
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      return this.component.val();
	    }
	  }]);

	  return TextBox;
	}();

	exports.default = TextBox;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ComboBox = function () {
	  function ComboBox(options) {
	    _classCallCheck(this, ComboBox);

	    this.id = (0, _Utils.guid)();
	    this.localData = options.localData;
	    this.url = options.url;
	    this.dataFields = options.dataFields;
	    this.comboBoxOptions = options.comboBoxOptions;
	    this.onChange = options.onChange;
	    this.clearSelectionEnabled = options.clearSelectionEnabled;
	  }

	  _createClass(ComboBox, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;

	      var comboBoxContainer = $('<div></div>');
	      comboBoxContainer.appendTo(container);
	      comboBoxContainer.attr('id', this.id);

	      if (this.localData) {
	        this.comboBoxOptions['source'] = this.localData;
	      } else {
	        var source = {
	          datatype: "json",
	          datafields: this.dataFields,
	          url: _this.url,
	          data: {}
	        };
	        var dataAdapter = new $.jqx.dataAdapter(source);
	        this.comboBoxOptions['source'] = dataAdapter;
	      }

	      comboBoxContainer.jqxComboBox(this.comboBoxOptions);

	      if (this.onChange) {
	        comboBoxContainer.on('change', function (event) {
	          _this.onChange(comboBoxContainer.val());
	        });
	      }

	      if (this.clearSelectionEnabled) {
	        comboBoxContainer.on('keydown', function (event) {
	          if (event.keyCode == 8 || event.keyCode == 46) {
	            comboBoxContainer.jqxComboBox('clearSelection');
	          }
	        });
	      }

	      this.component = comboBoxContainer;
	    }
	  }, {
	    key: 'getId',
	    value: function getId() {
	      return this.id;
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      return this.component.val();
	    }
	  }]);

	  return ComboBox;
	}();

	exports.default = ComboBox;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GanttChart = function () {
	  function GanttChart() {
	    _classCallCheck(this, GanttChart);

	    this.id = (0, _Utils.guid)();
	    this.data = {
	      data: []
	    };

	    gantt.config.scale_unit = "month";
	    gantt.config.step = 1;
	    gantt.config.date_scale = "%F, %Y";
	    gantt.config.min_column_width = 50;

	    gantt.config.scale_height = 90;
	    gantt.config.column_height = 50;
	    // gantt.config.start_date = new Date(2013, 03, 09);
	    // gantt.config.end_date = new Date(2017, 03, 09);

	    gantt.config.fit_tasks = true;

	    this.weekScaleTemplate = function (date) {
	      var dateToStr = gantt.date.date_to_str("%d %M");
	      var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
	      return dateToStr(date) + " - " + dateToStr(endDate);
	    };

	    gantt.config.subscales = [{ unit: "week", step: 1, template: this.weekScaleTemplate },
	    // {unit:"day", step:1, date:"%D" }
	    { unit: "day", step: 1, date: "%d %D" }];

	    gantt.attachEvent("onTaskClick", function (id, e) {
	      // console.log("You've just clicked an item with id="+id);
	      return true;
	    });
	  }

	  _createClass(GanttChart, [{
	    key: "render",
	    value: function render(container) {
	      var ganttChartContainer = $('<div style="height: 100.5%; width: 100%;"></div>');
	      ganttChartContainer.attr('id', this.id);
	      ganttChartContainer.appendTo(container);

	      gantt.init(this.id);
	      gantt.parse(this.data);

	      var dp = new gantt.dataProcessor("schedules");
	      dp.init(gantt);
	      dp.setTransactionMode("REST");
	    }
	  }, {
	    key: "useWeekScale",
	    value: function useWeekScale() {

	      gantt.config.subscales = [{ unit: "week", step: 1, template: this.weekScaleTemplate }];

	      this.refresh();
	    }
	  }, {
	    key: "useDayScale",
	    value: function useDayScale() {
	      gantt.config.subscales = [{ unit: "week", step: 1, template: this.weekScaleTemplate }, { unit: "day", step: 1, date: "%D" }];

	      this.refresh();
	    }
	  }, {
	    key: "refresh",
	    value: function refresh() {
	      gantt.parse(this.data);
	    }
	  }, {
	    key: "reloadData",
	    value: function reloadData(newData) {
	      this.data = newData;
	      gantt.clearAll();
	      gantt.parse(this.data);
	    }
	  }]);

	  return GanttChart;
	}();

	exports.default = GanttChart;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _ComboBox = __webpack_require__(12);

	var _ComboBox2 = _interopRequireDefault(_ComboBox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LevelComboBox = function () {
	  function LevelComboBox(options) {
	    _classCallCheck(this, LevelComboBox);

	    var _this = this;

	    this.id = (0, _Utils.guid)();

	    var levelList = [{ id: 1, nama: 'Tingkat 1' }, { id: 2, nama: "Tingkat 2" }];
	    var comboBoxOptions = {
	      displayMember: "nama",
	      valueMember: "id",
	      selectedIndex: 0,
	      width: '100%',
	      height: 25,
	      theme: 'metro'
	    };

	    this.comboBox = new _ComboBox2.default({
	      localData: levelList,
	      comboBoxOptions: comboBoxOptions,
	      onChange: function onChange(value) {
	        if (options.onChange) {
	          options.onChange(value);
	        }
	      }
	    });
	  }

	  _createClass(LevelComboBox, [{
	    key: 'getId',
	    value: function getId() {
	      return this.comboBox.getId();
	    }
	  }, {
	    key: 'render',
	    value: function render(container) {
	      this.comboBox.render(container);
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      return this.comboBox.getValue();
	    }
	  }]);

	  return LevelComboBox;
	}();

	exports.default = LevelComboBox;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _Button = __webpack_require__(8);

	var _Button2 = _interopRequireDefault(_Button);

	var _Form = __webpack_require__(16);

	var _Form2 = _interopRequireDefault(_Form);

	var _Window = __webpack_require__(17);

	var _Window2 = _interopRequireDefault(_Window);

	var _DateRange = __webpack_require__(18);

	var _DateRange2 = _interopRequireDefault(_DateRange);

	var _StudentComboBox = __webpack_require__(19);

	var _StudentComboBox2 = _interopRequireDefault(_StudentComboBox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AddScoreWindow = function () {
	  function AddScoreWindow() {
	    _classCallCheck(this, AddScoreWindow);

	    this.id = (0, _Utils.guid)();
	    var _this = this;

	    var studentComboBox = new _StudentComboBox2.default();
	    var dateRange1 = new _DateRange2.default({
	      width: '100%',
	      height: 25
	    });
	    var dateRange2 = new _DateRange2.default({
	      width: '100%',
	      height: 25
	    });
	    var dateRange3 = new _DateRange2.default({
	      width: '100%',
	      height: 25
	    });
	    var dateRange4 = new _DateRange2.default({
	      width: '100%',
	      height: 25
	    });
	    var dateRange5 = new _DateRange2.default({
	      width: '100%',
	      height: 25
	    });
	    var dateRange6 = new _DateRange2.default({
	      width: '100%',
	      height: 25
	    });
	    var dateRange7 = new _DateRange2.default({
	      width: '100%',
	      height: 25
	    });

	    var formItems = [{
	      name: 'student',
	      label: 'Siswa',
	      content: studentComboBox,
	      validation: {
	        type: 'COMBOBOX',
	        rule: 'required'
	      }
	    }, {
	      name: 'pediatric',
	      label: 'Anak',
	      content: dateRange1
	    }, {
	      name: 'radiology',
	      label: 'Radiologi',
	      content: dateRange2
	    }, {
	      name: 'neurology',
	      label: 'Neurologi',
	      content: dateRange3
	    }, {
	      name: 'dermatology',
	      label: 'Kulit dan Kelamin',
	      content: dateRange4
	    }, {
	      name: 'interna',
	      label: 'Interna',
	      content: dateRange5
	    }, {
	      name: 'kardiology',
	      label: 'Kardiologi',
	      content: dateRange6
	    }, {
	      name: 'psychiatrist',
	      label: 'Jiwa',
	      content: dateRange7
	    }];
	    var formOptions = {
	      items: formItems,
	      labelColumnWidth: '120px',
	      onValidationSuccess: function onValidationSuccess(formValue) {
	        $.ajax({
	          method: "POST",
	          url: "/schedules",
	          data: formValue
	        }).done(function () {
	          $("#successNotification").jqxNotification("open");
	          _this.window.close();
	          // $("#searchBtn").trigger('click');
	        }).fail(function (jqXHR, textStatus, errorThrown) {
	          var errorMessage = 'Proses gagal. Status : ' + jqXHR.status + ' [' + jqXHR.statusText + '] : ' + jqXHR.responseText;
	          $("#errorNotification").html('<div>' + errorMessage + '</div>');
	          $("#errorNotification").jqxNotification("open");
	        });
	      }
	    };

	    var form = new _Form2.default(formOptions);

	    this.window = new _Window2.default({
	      width: 330,
	      height: 340,
	      title: 'Tambah Siswa',
	      content: form,
	      onSave: function onSave() {
	        form.validate();
	      },
	      onCancel: function onCancel() {
	        _this.window.close();
	      }
	    });
	  }

	  _createClass(AddScoreWindow, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;

	      // var table = $('<table style="height: 100%; width: 100%;"></table>');
	      // var tr = $('<tr></tr>');
	      // var td = $('<td></td>');
	      // table.appendTo(container);
	      // tr.appendTo(table);
	      // td.appendTo(tr);

	      this.window.render(container);
	    }
	  }, {
	    key: 'open',
	    value: function open() {
	      this.window.open();
	    }
	  }]);

	  return AddScoreWindow;
	}();

	exports.default = AddScoreWindow;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Form = function () {
	  function Form(options) {
	    _classCallCheck(this, Form);

	    this.id = (0, _Utils.guid)();
	    this.items = options.items;
	    this.onValidationSuccess = options.onValidationSuccess;
	    this.labelColumnWidth = options.labelColumnWidth;
	    this.contentColumnWidth = options.contentColumnWidth;
	  }

	  _createClass(Form, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;

	      this.formItems = [];

	      var validationRules = [];
	      var form = $('<form></form>');
	      form.appendTo(container);
	      var table = $('<table style="width: 100%;"></table>');
	      table.appendTo(form);
	      for (var i = 0; i < this.items.length; i++) {
	        var tr = $('<tr></tr>');
	        tr.appendTo(table);

	        var td = $('<td></td>');
	        td.appendTo(tr);
	        if (this.labelColumnWidth) {
	          td.css('width', this.labelColumnWidth);
	        }

	        var label = $('<span>' + this.items[i].label + '</span>');
	        label.appendTo(td);

	        td = $('<td></td>');
	        td.appendTo(tr);
	        if (this.contentColumnWidth) {
	          td.css('width', this.contentColumnWidth);
	        }

	        this.items[i].content.render(td);
	        this.formItems.push({
	          name: this.items[i].name,
	          content: this.items[i].content
	        });

	        var content = this.items[i].content;
	        var contentId = content.getId();

	        var itemValidation = this.items[i].validation;
	        if (itemValidation) {
	          if (itemValidation.type == 'COMBOBOX') {
	            if (itemValidation.rule == 'required') {

	              //---Closure
	              (function f() {

	                var closureContent = content;
	                validationRules.push({
	                  input: '#' + contentId,
	                  message: 'Wajib diisi',
	                  action: 'select', rule: function rule(input) {
	                    var value = closureContent.getValue();
	                    if (value == null || value == '') {
	                      return false;
	                    } else {
	                      return true;
	                    }
	                  }
	                });
	              })();
	              //----------
	            }
	          } else {
	            if (itemValidation.rule == 'required') {
	              validationRules.push({ input: '#' + contentId, message: 'Wajib diisi', action: 'keyup, blur', rule: 'required' });
	            }
	          }
	        }
	      }

	      form.jqxValidator({
	        rules: validationRules
	      });

	      form.on('validationSuccess', function () {
	        if (_this.onValidationSuccess) {
	          var formValues = {};
	          for (var i = 0; i < _this.formItems.length; i++) {
	            formValues[_this.formItems[i].name] = _this.formItems[i].content.getValue();
	          }
	          _this.onValidationSuccess(formValues);
	        }
	      });

	      this.form = form;
	    }
	  }, {
	    key: 'validate',
	    value: function validate() {
	      this.form.jqxValidator('validate');
	    }
	  }]);

	  return Form;
	}();

	exports.default = Form;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _Button = __webpack_require__(8);

	var _Button2 = _interopRequireDefault(_Button);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Window = function () {
	  function Window(options) {
	    _classCallCheck(this, Window);

	    this.id = (0, _Utils.guid)();
	    this.content = options.content;

	    if (options.title) {
	      this.title = options.title;
	    } else {
	      this.title = '';
	    }

	    if (options.width) {
	      this.width = options.width;
	    }

	    if (options.height) {
	      this.height = options.height;
	    }

	    if (options.buttons) {} else {
	      this.saveButton = new _Button2.default({
	        title: 'Save',
	        template: 'success',
	        onClick: function onClick() {
	          if (options.onSave) {
	            options.onSave();
	          }
	        }
	      });

	      this.cancelButton = new _Button2.default({
	        title: 'Cancel',
	        onClick: function onClick() {
	          if (options.onCancel) {
	            options.onCancel();
	          }
	        }
	      });
	    }
	  }

	  _createClass(Window, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;

	      var windowContainer = $('<div></div>');
	      windowContainer.appendTo(container);

	      windowContainer.attr('id', this.id);

	      var windowTitle = $('<div>' + this.title + '</div>');
	      windowTitle.appendTo(windowContainer);

	      var windowContent = $('<div></div>');
	      windowContent.appendTo(windowContainer);

	      var windowOptions = {
	        theme: 'metro',
	        isModal: true,
	        autoOpen: false
	      };

	      if (this.width) {
	        windowOptions['width'] = this.width;
	      }

	      if (this.height) {
	        windowOptions['height'] = this.height;
	      }

	      windowContainer.jqxWindow(windowOptions);

	      windowContainer.on('close', function (event) {
	        windowContainer.jqxWindow('destroy');
	      });

	      var table = $('<table style="height: 100%; width: 100%;"></table>');
	      var tr = $('<tr></tr>');
	      var td = $('<td></td>');
	      table.appendTo(windowContent);
	      tr.appendTo(table);
	      td.appendTo(tr);
	      this.content.render(td);

	      tr = $('<tr></tr>');
	      td = $('<td></td>');
	      tr.appendTo(table);
	      td.appendTo(tr);

	      var innerTable = $('<table style="height: 100%; width: 100%;"></table>');
	      var innerTr = $('<tr></tr>');
	      var innerTd = $('<td style="width: 90%;"></td>');
	      innerTable.appendTo(td);
	      innerTr.appendTo(innerTable);
	      innerTd.appendTo(innerTr);

	      innerTd = $('<td></td>');
	      innerTd.appendTo(innerTr);
	      this.cancelButton.render(innerTd);

	      innerTd = $('<td></td>');
	      innerTd.appendTo(innerTr);
	      this.saveButton.render(innerTd);

	      this.windowContainer = windowContainer;
	    }
	  }, {
	    key: 'getId',
	    value: function getId() {
	      return this.id;
	    }
	  }, {
	    key: 'open',
	    value: function open() {
	      this.windowContainer.jqxWindow('open');
	    }
	  }, {
	    key: 'close',
	    value: function close() {
	      this.windowContainer.jqxWindow('close');
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.windowContainer.jqxWindow('destroy');
	    }
	  }]);

	  return Window;
	}();

	exports.default = Window;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DateRange = function () {
	  function DateRange(options) {
	    _classCallCheck(this, DateRange);

	    this.id = (0, _Utils.guid)();

	    if (options.width) {
	      this.width = options.width;
	    }

	    if (options.height) {
	      this.height = options.height;
	    }
	  }

	  _createClass(DateRange, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;

	      var dateRangeContainer = $('<div></div>');
	      dateRangeContainer.appendTo(container);
	      dateRangeContainer.attr('id', this.id);

	      var dateRangeOptions = {
	        theme: 'metro',
	        selectionMode: 'range'
	      };

	      if (this.width) {
	        dateRangeOptions['width'] = this.width;
	      }

	      if (this.height) {
	        dateRangeOptions['height'] = this.height;
	      }
	      dateRangeContainer.jqxDateTimeInput(dateRangeOptions);

	      this.dateRangeContainer = dateRangeContainer;
	    }
	  }, {
	    key: 'getId',
	    value: function getId() {
	      return this.id;
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      return this.dateRangeContainer.jqxDateTimeInput('getRange');
	    }
	  }]);

	  return DateRange;
	}();

	exports.default = DateRange;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _ComboBox = __webpack_require__(12);

	var _ComboBox2 = _interopRequireDefault(_ComboBox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var StudentComboBox = function () {
	  function StudentComboBox() {
	    _classCallCheck(this, StudentComboBox);

	    this.id = (0, _Utils.guid)();

	    var comboBoxOptions = {
	      displayMember: "nama",
	      valueMember: "id",
	      placeHolder: 'Pilih Siswa',
	      width: '100%',
	      height: 25,
	      theme: 'metro'
	    };

	    this.comboBox = new _ComboBox2.default({
	      url: '/students_all',
	      comboBoxOptions: comboBoxOptions,
	      onChange: function onChange(value) {
	        //
	      }
	    });
	  }

	  _createClass(StudentComboBox, [{
	    key: "getId",
	    value: function getId() {
	      return this.comboBox.getId();
	    }
	  }, {
	    key: "render",
	    value: function render(container) {
	      this.comboBox.render(container);
	    }
	  }, {
	    key: "getValue",
	    value: function getValue() {
	      return this.comboBox.getValue();
	    }
	  }]);

	  return StudentComboBox;
	}();

	exports.default = StudentComboBox;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _Button = __webpack_require__(8);

	var _Button2 = _interopRequireDefault(_Button);

	var _ToggleButton = __webpack_require__(10);

	var _ToggleButton2 = _interopRequireDefault(_ToggleButton);

	var _TextBox = __webpack_require__(11);

	var _TextBox2 = _interopRequireDefault(_TextBox);

	var _DataGrid = __webpack_require__(21);

	var _DataGrid2 = _interopRequireDefault(_DataGrid);

	var _DivisionComboBox = __webpack_require__(22);

	var _DivisionComboBox2 = _interopRequireDefault(_DivisionComboBox);

	var _EditScoreWindow = __webpack_require__(23);

	var _EditScoreWindow2 = _interopRequireDefault(_EditScoreWindow);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ScoreList = function () {
	  function ScoreList() {
	    _classCallCheck(this, ScoreList);

	    this.id = (0, _Utils.guid)();
	  }

	  _createClass(ScoreList, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;

	      var url = "/scores";

	      var source = {
	        datatype: "json",
	        datafields: [{ name: 'id', type: 'int' }, { name: 'stambuk_lama', type: 'string' }, { name: 'stambuk_baru', type: 'string' }, { name: 'nama', type: 'string' }, { name: 'nama_bagian', type: 'string' }, { name: 'start_date', type: 'date', format: "yyyy-MM-ddTHH:mm:ss-HH:mm" }, { name: 'end_date', type: 'date', format: "yyyy-MM-ddTHH:mm:ss-HH:mm" }, { name: 'rumah_sakit_id', type: 'int' }, { name: 'rumah_sakit_nama', type: 'string' }, { name: 'puskesmas_id', type: 'int' }, { name: 'puskesmas_nama', type: 'string' }, { name: 'pre_test', type: 'float' }, { name: 'tugas_ilmiah', type: 'float' }, { name: 'persentase10', type: 'float' }, { name: 'diskusi_mingguan', type: 'float' }, { name: 'nilai_ujian', type: 'float' }, { name: 'post_test', type: 'float' }, { name: 'nilai_akhir', type: 'float' }, { name: 'seminar', type: 'float' }],
	        id: "stambuk",
	        url: url
	      };

	      var onSearch = function onSearch(data) {
	        data['searchTxt'] = searchTextBox.getValue();
	        data['searchDivision'] = divisionComboBox.getValue();
	        return data;
	      };

	      var dataGridOptions = {
	        width: '100%',
	        height: '100%',
	        pageable: true,
	        groupable: true,
	        altrows: true,
	        theme: 'metro',
	        columns: [{ text: 'Stambuk Lama', datafield: 'stambuk_lama', width: 150 }, { text: 'Stambuk Baru', datafield: 'stambuk_baru', width: 150 }, { text: 'Nama', datafield: 'nama', width: 250 }, { text: 'Bagian', datafield: 'nama_bagian', width: 200 }, { text: 'Tanggal Mulai (Masa KK)', datafield: 'start_date', cellsformat: 'dd-MM-yyyy', width: 150 }, { text: 'Tanggal Selesai (Masa KK)', datafield: 'end_date', cellsformat: 'dd-MM-yyyy', width: 160 }, { text: 'Rumah Sakit', datafield: 'rumah_sakit_nama', width: 150 }, { text: 'Puskesmas', datafield: 'puskesmas_nama', width: 150 }, { text: 'Nilai Pre-Test', datafield: 'pre_test', cellsalign: 'right', cellsformat: 'd2', width: 150 }, { text: 'Nilai Tugas Ilmiah', datafield: 'tugas_ilmiah', width: 150 }, { text: '10%', datafield: 'persentase10', cellsalign: 'right', cellsformat: 'd2', width: 150 }, { text: 'Nilai Diskusi Mingguan', datafield: 'diskusi_mingguan', width: 150 }, { text: '20%', datafield: 'persentase20', width: 150 }, { text: 'Nilai Ujian', datafield: 'nilai_ujian', width: 150 }, { text: '35%', datafield: 'persentase35', width: 150 }, { text: 'Nilai Post Test (CBT)', datafield: 'post_test', width: 150 }, { text: '35%', datafield: 'persentase35b', width: 150 }, { text: 'Nilai Akhir', datafield: 'nilai_akhir', width: 150 }, { text: 'Seminar', datafield: 'seminar', width: 150 }],
	        groups: []
	      };

	      this.dataGrid = new _DataGrid2.default({
	        source: source,
	        onSearch: onSearch,
	        onRowDoubleClick: function onRowDoubleClick(data) {
	          var editScoreWindow = new _EditScoreWindow2.default(data);
	          editScoreWindow.render($('#dialogWindowContainer'));
	          editScoreWindow.open();
	        },
	        dataGridOptions: dataGridOptions
	      });

	      var divisionComboBox = new _DivisionComboBox2.default();
	      var searchTextBox = new _TextBox2.default({ placeHolder: 'Stambuk atau Nama', width: 250, height: 24 });
	      var searchButton = new _Button2.default({
	        imgSrc: '/ceu_assets/images/search.png',
	        theme: 'metro',
	        width: 30,
	        height: 26,
	        onClick: function onClick() {
	          _this.dataGrid.refresh();
	        }
	      });

	      var table = $('<table style="height: 100%; width: 100%; margin: -3px; "></table>');
	      var tr = $('<tr></tr>');
	      var td = $('<td style="padding: 0; height: 40px;"></td>');
	      table.appendTo(container);
	      tr.appendTo(table);
	      td.appendTo(tr);

	      var innerTable = $('<table style="height: 100%; width: 100%;"></table>');
	      var innerTr = $('<tr></tr>');
	      var innerTd = $('<td style="padding-top: 6px; padding-left: 10px; width: 120px; height: 100%;"></td>');
	      innerTable.appendTo(td);
	      innerTr.appendTo(innerTable);
	      innerTd.appendTo(innerTr);
	      divisionComboBox.render(innerTd);

	      var innerTd = $('<td style="padding-top: 6px; padding-left: 10px; width: 120px; height: 100%;"></td>');
	      innerTd.appendTo(innerTr);
	      searchTextBox.render(innerTd);

	      innerTd = $('<td style="padding-top: 6px; height: 100%;"></td>');
	      var _tempContainer = $('<div style="margin-left: -5px;"></div>');
	      _tempContainer.appendTo(innerTd);
	      innerTd.appendTo(innerTr);
	      searchButton.render(_tempContainer);

	      tr = $('<tr></tr>');
	      td = $('<td style="padding: 0;"></td>');
	      tr.appendTo(table);
	      td.appendTo(tr);

	      this.dataGrid.render(td);
	    }
	  }]);

	  return ScoreList;
	}();

	exports.default = ScoreList;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DataGrid = function () {
	  function DataGrid(options) {
	    _classCallCheck(this, DataGrid);

	    this.id = (0, _Utils.guid)();
	    this.source = options.source;
	    this.onSearch = options.onSearch;
	    this.dataGridOptions = options.dataGridOptions;
	    this.onRowDoubleClick = options.onRowDoubleClick;
	  }

	  _createClass(DataGrid, [{
	    key: 'render',
	    value: function render(container) {
	      var _this = this;

	      var dataAdapter = new $.jqx.dataAdapter(this.source, {
	        formatData: function formatData(data) {
	          if (_this.onSearch) {
	            return _this.onSearch(data);
	          } else {
	            return data;
	          }
	        },
	        downloadComplete: function downloadComplete(data, status, xhr) {
	          if (!_this.source.totalRecords) {
	            _this.source.totalRecords = data.length;
	          }
	        }

	      });
	      this.dataGridOptions['source'] = dataAdapter;
	      this.dataGridOptions['altrows'] = true;
	      this.dataGridOptions['pagesizeoptions'] = ['50', '100', '500'];

	      var dataGridContainer = $('<div style="height: 100%"></div>');
	      dataGridContainer.appendTo(container);
	      dataGridContainer.jqxGrid(this.dataGridOptions);

	      if (this.onRowDoubleClick) {
	        dataGridContainer.on('rowdoubleclick', function (event) {
	          var args = event.args;
	          var rowIndex = args.rowindex;
	          var data = dataGridContainer.jqxGrid('getrowdata', rowIndex);
	          _this.onRowDoubleClick(data);
	        });
	      }

	      this.dataGridContainer = dataGridContainer;
	    }
	  }, {
	    key: 'refresh',
	    value: function refresh() {
	      this.dataGridContainer.jqxGrid('updatebounddata');
	    }
	  }]);

	  return DataGrid;
	}();

	exports.default = DataGrid;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _ComboBox = __webpack_require__(12);

	var _ComboBox2 = _interopRequireDefault(_ComboBox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DivisionComboBox = function () {
	  function DivisionComboBox() {
	    _classCallCheck(this, DivisionComboBox);

	    this.id = (0, _Utils.guid)();

	    var comboBoxOptions = {
	      displayMember: "nama",
	      valueMember: "id",
	      placeHolder: 'Pilih Bagian',
	      width: 200,
	      height: 25,
	      theme: 'metro'
	    };

	    this.comboBox = new _ComboBox2.default({
	      url: '/divisions_all',
	      comboBoxOptions: comboBoxOptions,
	      clearSelectionEnabled: true,
	      onChange: function onChange(value) {
	        //
	      }
	    });
	  }

	  _createClass(DivisionComboBox, [{
	    key: "getId",
	    value: function getId() {
	      return this.comboBox.getId();
	    }
	  }, {
	    key: "render",
	    value: function render(container) {
	      this.comboBox.render(container);
	    }
	  }, {
	    key: "getValue",
	    value: function getValue() {
	      return this.comboBox.getValue();
	    }
	  }]);

	  return DivisionComboBox;
	}();

	exports.default = DivisionComboBox;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _Button = __webpack_require__(8);

	var _Button2 = _interopRequireDefault(_Button);

	var _Form = __webpack_require__(16);

	var _Form2 = _interopRequireDefault(_Form);

	var _Window = __webpack_require__(17);

	var _Window2 = _interopRequireDefault(_Window);

	var _DateRange = __webpack_require__(18);

	var _DateRange2 = _interopRequireDefault(_DateRange);

	var _Label = __webpack_require__(24);

	var _Label2 = _interopRequireDefault(_Label);

	var _StudentComboBox = __webpack_require__(19);

	var _StudentComboBox2 = _interopRequireDefault(_StudentComboBox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EditScoreWindow = function () {
	  function EditScoreWindow(score) {
	    _classCallCheck(this, EditScoreWindow);

	    var _this = this;

	    this.id = (0, _Utils.guid)();

	    var nameStr = score.nama + ' [ ' + score.stambuk_lama + ' - ' + score.stambuk_baru + ' ]';
	    var startDateStr = $.format.date(score.start_date, "dd-MM-yyyy");
	    var endDateStr = $.format.date(score.end_date, "dd-MM-yyyy");

	    $("#masaKkLbl").html(startDateStr + ' / ' + endDateStr);

	    var nameLabel = new _Label2.default({
	      text: nameStr,
	      bold: true
	    });

	    var divisionLabel = new _Label2.default({
	      text: score.nama_bagian,
	      bold: true
	    });

	    var kkLabel = new _Label2.default({
	      text: startDateStr + ' / ' + endDateStr,
	      bold: true
	    });

	    var formItems = [{
	      name: 'studentName',
	      label: 'Nama',
	      content: nameLabel
	    }, {
	      name: 'divisionName',
	      label: 'Bagian',
	      content: divisionLabel
	    }, {
	      name: 'kk',
	      label: 'Masa KK',
	      content: kkLabel
	    }];
	    var formOptions = {
	      items: formItems,
	      labelColumnWidth: '120px',
	      onValidationSuccess: function onValidationSuccess(formValue) {
	        $.ajax({
	          method: "PUT",
	          url: "/scores",
	          data: formValue
	        }).done(function () {
	          $("#successNotification").jqxNotification("open");
	          _this.window.close();
	          // $("#searchBtn").trigger('click');
	        }).fail(function (jqXHR, textStatus, errorThrown) {
	          var errorMessage = 'Proses gagal. Status : ' + jqXHR.status + ' [' + jqXHR.statusText + '] : ' + jqXHR.responseText;
	          $("#errorNotification").html('<div>' + errorMessage + '</div>');
	          $("#errorNotification").jqxNotification("open");
	        });
	      }
	    };

	    var form = new _Form2.default(formOptions);

	    this.window = new _Window2.default({
	      width: 420,
	      height: 490,
	      title: 'Edit Nilai',
	      content: form,
	      onSave: function onSave() {
	        form.validate();
	      },
	      onCancel: function onCancel() {
	        _this.window.close();
	      }
	    });
	  }

	  _createClass(EditScoreWindow, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;
	      this.window.render(container);
	    }
	  }, {
	    key: 'open',
	    value: function open() {
	      this.window.open();
	    }
	  }]);

	  return EditScoreWindow;
	}();

	exports.default = EditScoreWindow;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Label = function () {
	  function Label(options) {
	    _classCallCheck(this, Label);

	    this.id = (0, _Utils.guid)();
	    this.text = options.text;
	    this.bold = options.bold;
	  }

	  _createClass(Label, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;

	      var labelContainer = $('<span>' + this.text + '</span>');
	      labelContainer.appendTo(container);
	      if (this.bold) {
	        labelContainer.css('font-weight', 'bold');
	      }
	    }
	  }, {
	    key: 'getId',
	    value: function getId() {
	      return this.id;
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      return this.text;
	    }
	  }]);

	  return Label;
	}();

	exports.default = Label;

/***/ }
/******/ ]);