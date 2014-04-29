define(function (require, exports, module) {
	/**
	 * @class EventHandler 事件处理器
	 */
	var EventHandler = function(wrap){

        // 事件处理器的开关，默认开启
		this._on = false;

        // 事件列表
        this._eventMap = [];

        // dom区域
        this._wrap = wrap || $(document);

	}

    EventHandler.prototype = {

        /**
         * 绑定事件
         * @method bind
         * @param {String} 选择器
         * @param {String} 绑定的事件类型
         * @param {String} 子选择器（可选）
         * @param {Function} 绑定的方法
         */
        bind: function(){

            var that = this;

            var n = arguments.length;
     
            if((n == 3 || n == 4)){

                var _dom = this._wrap.find(arguments[0]);

                var _etype = arguments[1];

                if(_dom.length <= 0){
                    return false
                }

                // 存储绑定的事件
                that._eventMap.push({
                    dom: _dom,
                    event: _etype
                })

                // 4个参数
                if(n == 4){
                    fn = arguments[3];
                    _dom.on(_etype, arguments[2], function(e){
                        if(!that._on){
                            return false
                        }
                        
                        fn.call(this, e);
                    })
                }

                // 3个参数
                if(n == 3){
                    fn = arguments[2];
                    _dom.on(_etype, function(e){
                        if(!that._on){
                            return false
                        }
                        
                        fn.call(this, e);
                    })
                }

            }

        },

        /**
         * 解绑事件
         * @method unbind
         * @param {$Dom} dom 绑定事件的dom
         * @param {String} _event 绑定的事件类型
         */
        unbind: function(dom, _event){
            dom.off(_event);
        },

        // 开启事件监听状态
        on: function(){
            this._on = true;
        },

        // 关闭事件监听状态
        off: function(){
            this._on = false;
        },

        // 解绑所有事件
        unbindAll: function(){

            // 遍历所有事件并解绑
            for (var i = 0; i < this._eventMap.length; i++) {
                this.unbind(this._eventMap[i]['dom'],this._eventMap[i]['event'])
            };

            // 关闭监听状态
            this.off();
        }

    }

	module.exports = EventHandler;
});