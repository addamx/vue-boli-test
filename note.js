let data= {
    layoutObj: {
		groupName,
		describ,
		children: {
			id: {
				label,
				value
			}
		}
	},
    formStyle: '',
    flag: true, // 强制刷新
    currItem: {},
},

/*
a. group应该是只作为无状态(或只有isShow?), field应有由另外一个map管理而非layoutObj
b. field是否应该交由一个field-wrapper处理一切和page-service的互动?
c.




1. route 进入page组件
2. page获取layout(promise)
3. page通知page-service根据layout初始化数据data;
4. 初始化page-comp, 监听它的Load和Change事件, 传递data;
5. page
*/
