// pages/logs/send/status/status.js
var http = require('../../../../utils/util.js').http;
var webHelper = require('../../../../utils/util.js').webHelper;
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		pageData: null,
		hiddenCopyResult:true,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (o) {
		wx.removeStorageSync('outRoute');
		var _d = JSON.parse(o.data);
		if (_d) {
			this.setData({
				pageData: _d || null,
			})
		}
	},
	copyWechat: function (e) {
		const _num = e.currentTarget.dataset.chat;
		const that = this;
		wx.hideToast();
		wx.setClipboardData({
			data: _num||'111',
			success: function () {
				wx.hideToast();
				that.setData({
					hiddenCopyResult: false
				})
				setTimeout(() => {
					that.setData({
						hiddenCopyResult: true
					})
				}, 1500)
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