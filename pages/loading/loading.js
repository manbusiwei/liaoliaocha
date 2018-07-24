// pages/loading/loading.js
var http = require('../../utils/util.js').http;
var webHelper = require('../../utils/util.js').webHelper;
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */

	data: {
		canIUse:wx.canIUse('button.open-type.getUserInfo'),
		hasUserInfo:true,
		topicId:'',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (o) {
		if (o.outRoute) {
			console.log(o.outRoute)
			wx.setStorageSync('outRoute', o.outRoute)
		}else if (o.topicId) {
			wx.setStorageSync('shareTopicId', o.topicId)
		}
		wx.getSetting({
			success:res=>{
				if (!res.authSetting['scope.userInfo']) {
					this.setData({
						hasUserInfo:false
					})
				} else {
					wx.getUserInfo({
						success: res => {
							app.globalData.userInfo = res.userInfo
							this.setData({
								hasUserInfo: true
							})
							this.getToken();
						}
					})
				}
			}
		})
	},
	getUserInfo:function(e){
		if(!e.detail.userInfo)return;
		app.globalData.userInfo = e.detail.userInfo;
		this.getToken();
	},
	getToken: function () {
		wx.login({
			success: res => {
				http('post', webHelper.enter, { 
					wxCode: res.code,
					nickName: app.globalData.userInfo.nickName,
					avatarUrl: app.globalData.userInfo.avatarUrl
					 }).then(r => {
					if (r.data.status == 1) {
						app.globalData.token = r.data.data.token;
						// wx.redirectTo({
						// 	url: '/pages/loadingsub/loading',
						// })
						// return;
						if(r.data.data.ischeckid==1){
							app.globalData.ischeckid = 1;
							wx.redirectTo({
								url: '/pages/onlyShow/show/onlyShow',
							})
							return ;
						}else{
							app.globalData.ischeckid = 0;
						}
						if (wx.getStorageSync('outRoute')){
							wx.switchTab({
								url: '/pages/logs/index/index'
							})
						} else {
							wx.switchTab({
								url: '/pages/home/index/index'
							})
						}
					}
				})
			}
		})
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

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