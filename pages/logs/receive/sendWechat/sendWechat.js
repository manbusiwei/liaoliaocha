// pages/logs/receive/sendWechat/sendWechat.js
var http = require('../../../../utils/util.js').http;
var webHelper = require('../../../../utils/util.js').webHelper;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  myImg: '',
	  myName:'',
	replyId:'',
	weChatNum:'',
	topicId:'',
	friendName:'',
	friendImg:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (obj) {
	  let o = JSON.parse(obj.replyData)
	this.setData({
		replyId: o.id,
		topicId: o.topicId,
		myImg: app.globalData.userInfo.avatarUrl,
		myName: app.globalData.userInfo.nickName,
		friendName: o.replyUserNickName,
		friendImg: o.replyUserAvatarurl,
	})
  },
	setWechatNum:function(e){
		this.setData({
			weChatNum:e.detail.value
		})
	},
	sendWechatNum: function () {
		var that=this;
		if (!this.data.weChatNum){
			wx.showToast({
				title: '请输入微信号'
			})
			return;
		}
		http('post', webHelper.sendWeChatNum, {
			replyId: this.data.replyId,
			weChatNum: this.data.weChatNum
		}, app.globalData.token).then(res => {
			if (res.data.status == 200) {
				wx.showToast({
					title: '恭喜，发送成功！',
					icon: 'success',
				})
				setTimeout(function(){
					wx.redirectTo({
						url: '/pages/logs/receive/index/index?topicId=' + that.data.topicId,
					})
				},2000)
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