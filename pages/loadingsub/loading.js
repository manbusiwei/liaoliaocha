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
		tempFilePaths:Array,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (o) {
	},
	getPic: function (e) {
		var that=this;
		wx.chooseImage({
			count: 1, // 默认9
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			success: function (res) {
				// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
				console.log(res)
				that.setData({
					tempFilePaths:res.tempFilePaths
				})
				wx.saveImageToPhotosAlbum({
					filePath: res.tempFilePaths[0],
					success:function(e){
						console.log(e)
					}
				})
			}
		})

	},
	getphonenumber: function (e) {
		http('post', webHelper.getPhoneByKey, {
			encryptedData: e.detail.encryptedData,
			iv: e.detail.iv
		}, app.globalData.token).then(r => {
			if (r.data.status == 1) {

			}
		})
		// wx.requestPayment({
		// 	'timeStamp': '',
		// 	'nonceStr': '',
		// 	'package': '',
		// 	'signType': 'MD5',
		// 	'paySign': '',
		// 	'success': function (res) {
		// 	},
		// 	'fail': function (res) {
		// 	}
		// })
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