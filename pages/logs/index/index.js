// pages/logs/index/index.js
var http = require('../../../utils/util.js').http;
var webHelper = require('../../../utils/util.js').webHelper;
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isHiddenReseive:false,
		myAskList:[],
		myAnswerList:[],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		
	},
	cutShowType:function(e){
		const _type = e.currentTarget.dataset.type;
		this.setData({
			isHiddenReseive:_type=='s'?true:false
		})
	},
	goReceiveDetail: function (e) {
		const _id = e.currentTarget.dataset.id;
		wx.navigateTo({
			url: '/pages/logs/receive/index/index?topicId=' + _id,
		})
	},
	goMyAnswer:function(e){
		const _item=e.currentTarget.dataset.item;
		wx.navigateTo({
			url: '/pages/logs/send/status/status?data='+JSON.stringify(_item),
		})
	},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

	},
	onShow: function () {
		//收到列表
		http('get', webHelper.talkTopicList,{},app.globalData.token).then(res=>{
			if (res.statusCode == 200) {
				const _outRoute = wx.getStorageSync('outRoute');
				if (_outRoute.indexOf('receive') > -1) {
					const _id = _outRoute.substr(_outRoute.indexOf('_') + 1);
					wx.navigateTo({
						url: '/pages/logs/receive/index/index?topicId=' + _id,
					})
				}
				this.setData({
					myAskList:res.data.rows
				})
			}
		})
		//发出列表
		http('get', webHelper.replyList,{},app.globalData.token).then(res=>{
			if (res.statusCode == 200) {
				const _outRoute = wx.getStorageSync('outRoute');
				if (_outRoute.indexOf('send') > -1) {
					const _id = _outRoute.substr(_outRoute.indexOf('_') + 1);
					const _item = res.data.rows.find(function (v, index) {
						return v.topicId == _id;
					})
					console.log(_item);
					wx.navigateTo({
						url: '/pages/logs/send/status/status?data=' + JSON.stringify(_item),
					})
				}
				this.setData({
					myAnswerList:res.data.rows
				})
			}
		})	
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

})