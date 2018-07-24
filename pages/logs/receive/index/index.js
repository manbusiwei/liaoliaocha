// pages/logs/receive/index/index.js
var http = require('../../../../utils/util.js').http;
var webHelper = require('../../../../utils/util.js').webHelper;
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isHiddenDialog:true,
		showDialogData:{},
		topicId:'',
		detailData:null,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (o) {
		wx.removeStorageSync('outRoute');
		this.setData({
			topicId: o.topicId
		})
	},
	onShow: function () {
		http('get', webHelper.myTopicDetail,{
			topicId:this.data.topicId
		}, app.globalData.token).then(res=>{
			if(res.data.status==200){
				this.setData({
					detailData:res.data.data
				})
			}else{}
		})
	},
	goChooseRevert: function (e) {
		const _item = e.currentTarget.dataset.item;
		this.setData({
			showDialogData: _item,
			['showDialogData.myQuestion']: this.data.detailData.myQuestion,
			['showDialogData.topicId']: this.data.topicId,
		})
		if (_item.matchState ==0) {
			this.setData({
				isHiddenDialog:false
			})
		}else{
			wx.navigateTo({
				url: '/pages/logs/receive/sendWechat/sendWechat?replyData=' + JSON.stringify(this.data.showDialogData) ,
			})
		}
	},
	closeDialog:function(){
		this.setData({
			isHiddenDialog:true
		})
	},
	chooseWhetherContentment:function(e){
		const _type = e.currentTarget.dataset.cont;
		http('post', webHelper.updateReply, {
			status: _type,
			replyId: this.data.showDialogData.id,
		},app.globalData.token).then(res=>{
			if(res.data.status==200){
				if (_type == 1) {
					wx.navigateTo({
						url: '/pages/logs/receive/sendWechat/sendWechat?replyData=' + JSON.stringify(this.data.showDialogData),
					})
				} else {
					this.onShow();
				}
				this.setData({
					isHiddenDialog: true
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