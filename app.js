//app.js
App({
	onLaunch: function (e) {
	console.log(e)
	this.globalData.scene=e.scene;
    // 登录
    // wx.login({
    //   success: res => {
	// 	  // 发送 res.code 到后台换取 openId, sessionKey, unionId
	// 	  wx.getUserInfo({
	// 		  success: function (res) {
	// 			  console.log(res)
	// 		  },
	// 		  complete: res => {
	// 			  console.log(res)
	// 		  }
	// 	  })
    //   }
    // })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    
	token:'',
	scene:Number,
  }
})