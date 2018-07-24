// pages/template/moreFormTemplate/moreFormTemplate.js
var http = require('../../../utils/util.js').http;
var webHelper = require('../../../utils/util.js').webHelper;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
	answerFormIdNum:Number,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  console.log(this.data.answerFormIdNum)
  },

  sendAnswer: function (e) {
	  var that = this;
	  if (this.data.isSelbst) {
		  wx.showToast({
			  title: '这是自己的问题，不要皮哟！！！',
			  icon: 'none'
		  })
		  return;
	  }
	  if (!this.data.answerValue) {
		  wx.showToast({
			  title: '亲，要有内容哟',
			  icon: 'none'
		  })
		  return;
	  }
	  let _id = e.detail.formId;
	  this.data.answerFormIds.push(_id)
	  if (this.data.answerFormIds.length == this.data.answerFormIdNum) {
		  // if(false){
		  http('post', webHelper.topicReply, {
			  topicId: this.data.topicId,
			  replyContent: this.data.answerValue,
			  formids: this.data.answerFormIds
		  }, app.globalData.token).then(res => {
			  this.setData({
				  answerFormIds: []
			  })
			  if (res.data.status == 200) {
				  wx.navigateTo({
					  url: '/pages/home/wait/wait?data=' + JSON.stringify(res.data.data),
				  })
			  } else {
				  wx.showToast({
					  title: res.errMsg,
					  icon: 'none'
				  })
			  }
		  })
	  }

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