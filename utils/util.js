

var http = function (method, url, data, token) {
	return new Promise(function (resolve, reject) {
		if (!data.wxCode ) data.token = token;
		// var obj = {
		// 	"biz": data,
			// "token": token,
			// "sign": encrypt(biz + token)
		// };
		wx.request({
			method: method.toUpperCase(),
			url: url,
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			// header: {
			// 	'content-type': 'application/json;charset=utf-8',
			// },
			data: data,
			success:resolve,
			// success: res => {
			// 	if (res.data.status === 1) {
			// 		resolve(res);
			// 	} else {
			// 		wx.showModal({
			// 			title: '提示',
			// 			content: 'token失效，是否重新登录？',
			// 			success: function (res) {
			// 				if (res.confirm) {
			// 					wx.reLaunch({
			// 						url: '/pages/loading/loading',
			// 					})
			// 				}
			// 			},
			// 			complete: function (res) {
			// 			}
			// 		})
			// 	}
			// },
			// fail: reject
			// success:resolve,
			fail: function (res) {
				console.log(res)
				wx.showToast({
					title: '网络错误，请稍后再试',
					icon: 'none'
				})
			}
		})
	})
}
// const baseUrl = 'https://cha.junshan88.cn/liaoliaocha/liaoliaocha/'
const baseUrl = 'http://172.17.151.246/liaoliaocha/liaoliaocha/'
const webHelper = {
	enter: baseUrl + 'enter',
	findByTopicId: baseUrl + 'findByTopicId',//获取题目
	topicReply: baseUrl + 'topicReply',//答题
	talkTopic: baseUrl + 'talkTopic',//出题
	talkTopicList: baseUrl + 'talkTopicList',//出题列表
	myTopicDetail:baseUrl+'myTopicDetail',//出题详情
	updateReply: baseUrl + 'updateReply',//选择满意度
	sendWeChatNum: baseUrl + 'sendWeChatNum',//发送微信
	replyList: baseUrl + 'replyList',//答题列表
	searchReplyList: baseUrl + 'searchReplyList',//出题回复
	// getPhoneByKey: baseUrl + 'getPhoneByKey',//手机
}
module.exports = {
	http: http,
	webHelper: webHelper
}
