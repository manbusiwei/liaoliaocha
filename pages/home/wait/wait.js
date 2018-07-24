// pages/home/wait/wait.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		pageData: null,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (o) {
		var _d = JSON.parse(o.data);
		if (_d) {
			this.setData({
				pageData: _d || null,
			})
		}
	},
	goHomeAsk: function () {
		wx.setStorageSync('askOrAnswer', 'ask');
		this.goHomePage();
	},
	goHomeAnswer: function () {
		wx.setStorageSync('askOrAnswer', 'answer');
		this.goHomePage();
	},
	goHomePage:function(){
		wx.switchTab({
			url: '/pages/home/index/index',
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