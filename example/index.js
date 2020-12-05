( function( global, factory ) {
    "use strict";
    if ( typeof module === "object" && typeof module.exports === "object" ) {
        // For CommonJS and CommonJS-like environments where a proper `window`
        // is present, execute the factory and get Stack.
        // For environments that do not have a `window` with a `document`
        // (such as Node.js), expose a factory as module.exports.
        // This accentuates the need for the creation of a real `window`.
        // e.g. var Stack = require("Stack")(window);
        module.exports = global.document ?
            factory( global, true ) :
            function( w ) {
                if ( !w.document ) {
                    throw new Error( "Stack requires a window with a document" );
                }
                return factory( w );
            };
    } else {
        factory( global );
    }

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
    /*
    *说明：栈：后进先出
    *使用方法：clear push 这两个接口可以连用
    * status:状态可以用，可以不用，
    *参数：
    */
    "use strict";
    class Stack{
        constructor(){
            this._stackArr = [];
        };
        pop(){
            /*
            *说明：用域删除数组的第一位元素
            */
            console.log('this._stackArr',this._stackArr);
            return this._stackArr.pop();
        }
        push(ele){
            /*
            *说明：添加数据到栈顶
            */
            this._stackArr.push(ele);
            console.log('this._stackArr',this._stackArr);
            return this;
        }
        peek(nth){
            /*
            *说明：返回栈顶的元素
            */
            nth = nth || (this.size() - 1);
            return this._stackArr[nth];
        }
        isEmpty(){
            /*
            *说明：数组是否为空
            */
            return this._stackArr.length === 0 ? true : false;
        }
        _clear(){
            /*
            *说明：清除数组
            */
            this._stackArr = [];
            return this;
        }
        size(){
            /*
            *说明：返回栈里的元素
            */
            return this._stackArr.length
        }
    }
    if ( typeof define === "function" && define.amd ) {
        define( "Stack", [], function() {
            return Stack;
        } );
    }
    Stack.noConflict = function(custom) {
        if(custom){
            window[custom] = Stack;
        }
        return Stack;
    };
    window.Stack = Stack;
});

( function( global, factory ) {
    "use strict";
    if ( typeof module === "object" && typeof module.exports === "object" ) {
        // For CommonJS and CommonJS-like environments where a proper `window`
        // is present, execute the factory and get PageTurn.
        // For environments that do not have a `window` with a `document`
        // (such as Node.js), expose a factory as module.exports.
        // This accentuates the need for the creation of a real `window`.
        // e.g. var PageTurn = require("PageTurn")(window);
        module.exports = global.document ?
            factory( global, true ) :
            function( w ) {
                if ( !w.document ) {
                    throw new Error( "Stack requires a window with a document" );
                }
                return factory( w );
            };
    } else {
        factory( global );
    }

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
    "use strict";
    /*
    *说明：上一页下一页的触底按钮禁用自己在外面配置
    *使用方法：
    *参数：
    */
    class PageTurn extends Stack{
        constructor(){
            super();
            this.loadBtnStatus = {
                preBtnLoadingStatus:false,

                nextBtnLoadingStatus:false,

                preAndNextDisable:false
            };
            this.tempShift = null;
            this.tempStackData = null;
        };
        PrePage(data) {
            /*
            *说明：当不传值的时候获取到上一页下一页的数据，注意获取上一页的数据，会清理原数组的一条数据,返回上一页的时候只减不加，但是保留一个临时数据，以备点击下一页的时候存到数组中
            *使用方法：
            *参数：
            */
            if(data){
                this.loadBtnStatus = {
                    preBtnLoadingStatus:false,

                    nextBtnLoadingStatus:false,

                    preAndNextDisable:false
                };
                this.tempStackData = data;
                return
            }
            this.tempShift = this.pop();
            this.loadBtnStatus = {
                preBtnLoadingStatus:true,

                nextBtnLoadingStatus:false,

                preAndNextDisable:true
            };
            return this.isEmpty() ? "" : this.peek();
        }
        PrePageErrHandle(){
            /*
            *说明：返回上一页失败的情况,调用这个函数，保证历史记录的完整性
            */
            this.push(this.tempShift);
        }
        NextPage(data) {
            /*
            *说明：下一页，点击下一页的时候，接收值同上一页
            */
            if(data){
                this.loadBtnStatus = {
                    preBtnLoadingStatus:false,

                    nextBtnLoadingStatus:false,

                    preAndNextDisable:false
                };
                this.push(data);
                return
            }
            /*
            *说明：这里再点击下一页的时候把记录的当前页面的数据存到数组中
            */
            if(this.tempStackData){
                this.push(this.tempStackData);
                this.tempStackData = null;
            }
            this.loadBtnStatus = {
                preBtnLoadingStatus:false,

                nextBtnLoadingStatus:true,

                preAndNextDisable:true
            };
            return this.peek();
        }
        clear(){
            this._clear();
            this.tempShift = null;
            this.tempStackData = null;
            this.loadBtnStatus = {
                preBtnLoadingStatus:false,

                nextBtnLoadingStatus:false,

                preAndNextDisable:false
            };
        }
        init(fetchData,callBack){
            /*
            *说明：重置刷新，打开文件夹，搜索等场景时调用这个,初始化的时候，按钮的状态自己负责
            */
            this.clear();
            this.push(fetchData);
            callBack && callBack();
        }
        getBtnStatus(){
            return this.loadBtnStatus;
        }
    }
    if ( typeof define === "function" && define.amd ) {
        define( "PageTurn", [], function() {
            return PageTurn;
        } );
    }
    window.PageTurn = PageTurn;
});