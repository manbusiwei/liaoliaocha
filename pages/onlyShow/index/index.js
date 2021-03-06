// pages/home/index/index.js
var http = require('../../../utils/util.js').http;
var webHelper = require('../../../utils/util.js').webHelper;
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		shareVisit: 0,
		isSelbst: false,//自己的问题
		showAnswerBox: true,
		showAskBox: false,
		answerValue: '',
		answerValueNum: 0,
		askValue: '',
		askValueNum: 0,
		topicId: '',//题目id
		questionInfo: null,
		askFormIds: [],
		answerFormIds: [],
		askFormIdNum: Number,
		answerFormIdNum: Number,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (o) {
		// console.log(o)
		// o.topicId=25;
		if (o.topicId || wx.getStorageSync('shareTopicId')) {
			this.setData({
				topicId: o.topicId || wx.getStorageSync('shareTopicId') || '',
				shareVisit: o.shareVisit || 0
			})
		}
	},
	onShow: function () {
		const _id = this.data.topicId;
		wx.setNavigationBarTitle({
			title: _id ? '接头暗号' : '发暗号',
		})
		this.setData({
			answerValue: '',
			answerValueNum: 0,
			askValue: '',
			askValueNum: 0,
		})
		if (wx.getStorageSync('askOrAnswer')) {
			if (wx.getStorageSync('askOrAnswer') == 'ask') {
				this.setData({
					showAnswerBox: false,
					showAskBox: true,
				})
			} else {
				this.setData({
					showAnswerBox: true,
					showAskBox: false,
					topicId: '',
				})
			}
		}
		if (this.data.showAnswerBox) {
			console.log(this.data.topicId)
			http('post', webHelper.findByTopicId, {
				topicId: this.data.topicId,
				shareVisit: this.data.shareVisit
			}, app.globalData.token).then(res => {
				if (res.data.status == 200) {
					this.setData({
						questionInfo: res.data.data.topicReplyVO,
						topicId: res.data.data.topicReplyVO.topicId,
						askFormIdNum: res.data.data.sendnum,
						answerFormIdNum: res.data.data.backNum,
						shareVisit: res.data.data.topicReplyVO.isanswer,
					})
					wx.removeStorageSync('shareTopicId')
				}
			})
		}
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
				wx.navigateTo({
					url: '/pages/onlyShow/show/onlyShow',
				})
			})
		}

	},
	checkInputAnswer: function (e) {
		let _val = e.detail.value;
		_val = _val.replace(/\n+/g, '').replace(/\s+/g, '');
		this.setData({
			answerValue: _val || '',
			answerValueNum: _val.length
		})
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {
		wx.removeStorageSync('askOrAnswer');
		this.setData({
			questionInfo: null,
			topicId: '',
		})
	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {
		this.setData({
			showAnswerBox: true,
			showAskBox: false,
		})
	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

})