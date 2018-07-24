// pages/components/goAnsOrAsk/goAnsOrAsk.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		btnText:{
			type:String,
			observer: null
		},
		goType:{
			type:String
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		
	},

	/**
	 * 组件的方法列表
	 */
	ready: function () {
		
	},
	methods: {
		goHomeAsk: function () {
			wx.setStorageSync('askOrAnswer', 'ask');
			this.goHomePage();
		},
		goHomeAnswer: function () {
			wx.setStorageSync('askOrAnswer', 'answer');
			this.goHomePage();
		},
		goHomePage: function () {
			wx.switchTab({
				url: '/pages/home/index/index',
			})
		},

	}
})
