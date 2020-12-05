# trunPage
## 基于栈的翻页组件 打开文件夹，返回上一层，搜索，刷新，切换版本等等，需要进行初始化

1.dom部分

    <div className="file-table-list-pagination" style={{display:(this.state.paginationIsShow?'block':'none')}}>
        <Button className="file-table-list-pagination-pre" onClick={this.tableListPre} disabled={this.state.tablePreAndNextBtnDisable || this.state.tablePreBtnDisable || (this.turnPage.size() <= 0)} loading={this.state.tablePreLoading}>上一页</Button>
        <Button className="file-table-list-pagination-next" onClick={this.tableListNext} disabled={this.state.tablePreAndNextBtnDisable  || this.state.tableNextBtnDisable} loading={this.state.tableNextLoading}>下一页</Button>
    </div>

2.组件引入

    const PageTurn = require('trunPage');

3.插件初始化

    turnPageInit=(result)=>{
            if(result?.nextMarker || result?.nextKeyMarker){
                this.turnPage.init({nextMarker:result?.nextMarker || result?.nextKeyMarker,nextVersionIdMarker:result?.nextVersionIdMarker || ''});
                this.setState({
                    tablePreBtnDisable:true,
                    tableNextBtnDisable:false,
                    tablePreAndNextBtnDisable:false
                });
            }else{
                this.setState({
                    tablePreBtnDisable:true,
                    tableNextBtnDisable:true,
                    tablePreAndNextBtnDisable:true
                });
            }
        };

4.上一页

    tableListPre=()=>{
            this.setState({
                tablePreLoading:true,
                tableLoading:true,
                tablePreAndNextBtnDisable:true
            });
            const currentPage = this.turnPage.PrePage();
            this.search({
                properties:{
                    marker:currentPage?.nextMarker,
                    keyMarker:currentPage?.nextMarker,
                    versionIdMarker:currentPage?.nextVersionIdMarker
                }
            },(result)=>{
                if(result?.nextMarker || result?.nextKeyMarker){
                    this.turnPage.PrePage({nextMarker:result.nextMarker || result.nextKeyMarker,nextVersionIdMarker:result.nextVersionIdMarker || ''});
                    this.setState({
                        tablePreBtnDisable:false,
                        tableNextBtnDisable:false
                    });
                }
            }, () =>{
                this.turnPage.PrePageErrHandle();
            }, () => {
                this.setState({
                    tablePreLoading:false,
                    tableLoading:false,
                    tablePreAndNextBtnDisable:false
                });
                scrollTop(0,'file-table-list');
            });
        };

5.下一页

    tableListNext=()=>{

            const NextPage = this.turnPage.NextPage();
            this.setState({
                tableNextLoading:true,
                tableLoading:true,
                tablePreAndNextBtnDisable:true
            });
            this.search({
                properties:{
                    marker:NextPage?.nextMarker,
                    keyMarker:NextPage?.nextMarker,
                    versionIdMarker:NextPage.nextVersionIdMarker
                }
            },(result)=>{
                if(result?.nextMarker || result?.nextKeyMarker){
                    this.turnPage.NextPage({nextMarker:result.nextMarker || result.nextKeyMarker,nextVersionIdMarker:result.nextVersionIdMarker || ''});
                    this.setState({
                        tablePreBtnDisable:false,
                        tableNextBtnDisable:false
                    });
                }else{
                    this.setState({
                        tablePreBtnDisable:false,
                        tableNextBtnDisable:true
                    });
                }
            }, () =>{
            }, () => {
                this.setState({
                    tableNextLoading:false,
                    tableLoading:false,
                    tablePreAndNextBtnDisable:false,
                });
                scrollTop(0,'file-table-list');
            });
        };

6.其他
- 最好和antd或者ele等现在市面上的ui框架结合使用效果更加
- 使用场景：当你需要用到的时候，自会用，无须思考的那种
- 当数据只有一页的时候，按钮是隐藏还是禁用，自己做处理，本插件不负责
- 原生js，ng,vue,react随便用
- 兼容性：支持所有主流浏览器
- 如果需要使用本逐渐的状态：按钮状态需要再调用前后分别调用getBtnStatus获取，需要注意的一点，接口拿到数据后，eg:存值一定要放在获取状态之前啊，否则会出错