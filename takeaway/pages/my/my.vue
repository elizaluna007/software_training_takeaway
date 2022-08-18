<template>
	<view>
		<div class="login_or_register">
			<div class="img_block">
				<img :src="login_no" class="img_style" v-if="button_key" />
				<img :src="info.headphoto" class="img_style" v-if="key" @click="upload_img()" />
			</div>
			<button v-if="button_key" class="btn_style" type="default" @click="goto()"
				style="background-color: #fefa83;">登录/注册</button>
			<p v-if="key" class="p_1">{{info.name}}</p>
		</div>
		<div v-if="button_key" class="line"></div>
		<div v-if="key">
			<div style="display: flex;">
				<p class="p_2">基本资料</p>
				<button class="btn_1" @click="change()">编辑</button>
				<button class="btn_2" @click="save()">保存</button>
				<button class="btn_2" @click="change_passward()">修改密码</button>
			</div>
			<div v-if="change_no_key">
				<div class="line_block">
					<p class="element">用户名</p>
					<p class="content" style="position: relative;left: 100rpx;">{{info.name}}</p>
				</div>
				<div class="line"></div>
				<div class="line_block">
					<p class="element">性别</p>
					<p class="content" style="position: relative;left: 140rpx;">{{info.sex}}</p>
				</div>
				<div class="line"></div>
				<div class="line_block">
					<p class="element">地址</p>
					<p class="content" style="position: relative;left: 140rpx;">{{info.address}}</p>
				</div>
				<div class="line"></div>
				<div class="line_block">
					<p class="element">生日</p>
					<p class="content" style="position: relative;left: 140rpx;">{{info.birthday}}</p>
				</div>
				<div class="line"></div>
				<div class="line_block">
					<p class="element">手机号</p>
					<p class="content" style="position: relative;left: 100rpx;">{{info.phone}}</p>
				</div>
				<div class="line"></div>
			</div>
			<div v-if="change_key">
				<div class="line_block">
					<p class="element">用户名</p>
					<input class="content" style="position: relative;left: 100rpx;" placeholder="(可修改)"
						v-model="info.name"></input>
				</div>
				<div class="line"></div>
				<div class="line_block">
					<p class="element">性别</p>
					<input class="content" style="position: relative;left: 140rpx;" placeholder="(可修改)"
						v-model="info.sex"></input>
				</div>
				<div class="line"></div>
				<div class="line_block">
					<p class="element">地址</p>
					<input class="content" style="position: relative;left: 140rpx;" placeholder="(可修改)"
						v-model="info.address"></input>
				</div>
				<div class="line"></div>
				<div class="line_block">
					<p class="element">生日</p>
					<input class="content" style="position: relative;left: 140rpx;" placeholder="(可修改)"
						v-model="info.birthday"></input>
				</div>
				<div class="line"></div>
				<div class="line_block">
					<p class="element">手机号</p>
					<input class="content" style="position: relative;left: 100rpx;" placeholder="(可修改)"
						v-model="info.phone"></input>
				</div>
				<div class="line"></div>
			</div>
			<div class="line_block" v-if="change_pwd_key">
				<p class="element">旧密码</p>
				<input class="content" style="position: relative;left: 100rpx;" placeholder="请输入旧密码"
					v-model="pre_pwd"></input>
			</div>
			<div class="line" v-if="change_pwd_key"></div>
			<div class="line_block" v-if="change_pwd_key">
				<p class="element">新密码</p>
				<input class="content" style="position: relative;left: 100rpx;" placeholder="请输入新密码"
					v-model="new_pwd"></input>
					
			</div>
			<div class="line" v-if="change_pwd_key"></div>
			<button v-if="change_pwd_key" class="btn_style_3" @click="update_passward()">确认修改密码</button>
			<button class="btn_style_2" @click="logout()">退出当前账号</button>
		</div>

	</view>

</template>

<script>
	import {
		pathToBase64,
		base64ToPath
	} from '../../js_sdk/mmmm-image-tools/index.js';
	export default {
		data() {
			return {
				key: '',
				button_key: '',
				login_on: require("../../static/eye.png"),
				login_no: require("../../static/l_or_r.jpg"),
				info: '',
				change_key: false,
				change_no_key: true,
				update_info: {
					name: '',
					sex: '',
					address: '',
					birthday: '',
					phone: '',
					headphoto: ''
				},
				change_pwd_key: false,
				pre_pwd: '',
				new_pwd: ''
			}
		},
		methods: {
			goto(url) {
				uni.navigateTo({
					url: '/pages/login/login_username'
				})
			},
			logout() {
				getApp().globalData.login_key = false;
				this.key = false;
				this.button_key = true;
			},
			change() {
				this.change_key = true;
				this.change_no_key = false;
			},
			save() {
				// console.log("开始打印修改后的信息");
				// console.log(this.info);
				uni.request({
					method: "POST",
					// url: 'http://127.0.0.1:4523/m1/1437509-0-default/customer/changeCustomerInfo',
					url: 'https://v3710z5658.oicp.vip/customer/changeCustomerInfo',
					// url: 'https://5t764096g4.goho.co/customer/changeCustomerInfo',
					data: {
						name: this.info.name,
						sex: this.info.sex,
						defaultaddress: this.info.address,
						birthday: this.info.birthday,
						phone: this.info.phone,
						headphoto: this.info.headphoto
					},
					header: {
						token: getApp().globalData.token
					},
					success: (res) => {
						// this.info = res.data;
						// console.log("修改信息成功");
						uni.showToast({
							title: "修改成功",
							icon: 'exception',
							duration: 850
						})
					}
				})
			},
			change_passward() {
				this.change_pwd_key = !this.change_pwd_key;
			},
			update_passward() {
				console.log("开始发送密码信息")
				uni.request({
					method: 'POST',
					url: 'https://v3710z5658.oicp.vip/customer/ChangePassword',
					data: {
						pre_pwd: this.pre_pwd,
						new_pwd: this.new_pwd
					},
					header: {
						token: getApp().globalData.token
					},
					success: (res) => {
						this.change_pwd_key=0;
						console.log("开始打印修改密码信息")
						console.log(res)
						
						if(res.data.code==1)
						{
							getApp().globalData.token=res.data.Oauth_Token;
							uni.showToast({
								title: "修改成功",
								icon: 'exception',
								duration: 850
							})
						}
						else{
							uni.showToast({
								title: "修改失败",
								icon: 'error',
								duration: 850
							})
						}
					}
				})
			},
			upload_img() {
				let that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success: function(res) {
						console.log("选取图片成功");
						var tempFilePaths = res.tempFilePaths;
						pathToBase64(tempFilePaths[0]) //图像转base64工具
							.then(base64 => {
								that.avatar = base64; //将文件转化为base64并显示
								// console.log("开始上传");
								// console.log(base64);
								// console.log("开始打印base64");
								// console.log(JSON.stringify(base64));
								uni.request({
									// url: 'http://127.0.0.1:4523/m1/1437509-0-default/shop/getAllShopInfo', //仅为示例，并非真实接口地址。
									url: 'https://v3710z5658.oicp.vip/customer/changeHeadphoto', //真实端口
									method: "POST", //不设置，默认为get方式
									data: {
										headphoto: JSON.stringify(base64)
									},
									header: {
										token: getApp().globalData.token,
									},
									success: (res) => {
										console.log("接收成功");
										// console.log(res.data.length);
										// console.log(res);
										// this.infos = res.data;
										// uni.request({
										// 	method: "GET",
										// 	url: 'https://v3710z5658.oicp.vip/customer/getCustomerInfo',
										// 	// url:'http://127.0.0.1:4523/m1/1437509-0-default/customer/getCustomerInfo',
										// 	data: {},
										// 	header: {
										// 		token: getApp().globalData.token
										// 	},
										// 	success: (res) => {
										// 		info.headphoto = res.data.headphoto;
										// 		console.log("开始打印个人信息X2");
										// 		console.log(res.data);
										// 	}
										// })
									}
								})
								// that.avatarUpload(base64); //同时将头像上传至数据库进行存储
							})
							.catch(error => {
								console.error(error)
							})
					}
				});
			}
		},
		onLoad() {
			this.key = getApp().globalData.login_key;
			this.button_key = !this.key;
			if (this.key == true) {
				uni.request({
					method: "GET",
					url: 'https://v3710z5658.oicp.vip/customer/getCustomerInfo',
					// url:'http://127.0.0.1:4523/m1/1437509-0-default/customer/getCustomerInfo',
					// url: 'https://5t764096g4.goho.co/customer/getCustomerInfo',
					data: {},
					header: {
						token: getApp().globalData.token
					},
					success: (res) => {
						this.info = res.data;
						console.log("开始打印个人信息");
						console.log(res);
					}
				})
			} else {}
		},
		onShow() {
			this.key = getApp().globalData.login_key;
			this.button_key = !this.key;
			if (this.key == true) {
				uni.request({
					method: "GET",
					url: 'https://v3710z5658.oicp.vip/customer/getCustomerInfo',
					// url:'http://127.0.0.1:4523/m1/1437509-0-default/customer/getCustomerInfo',
					// url: 'https://5t764096g4.goho.co/customer/getCustomerInfo',
					data: {},
					header: {
						token: getApp().globalData.token
					},
					success: (res) => {
						this.info = res.data;
						console.log("开始打印个人信息");
						console.log(res);
					}
				})
			} else {}
		}
	}
</script>

<style>
	.login_or_register {
		display: flex;
	}

	.img_block {
		/* 		align-items: center;
		vertical-align: center; */
		display: flex;
		margin: 50rpx;
		border: 4rpx solid black;
		border-radius: 50%;
		padding: 10rpx;
	}

	.img_style {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
	}

	.btn_style {

		background-color: #fefa83; //按钮颜色
		border-radius: 20rpx; //按钮弧度
		width: 290rpx; //宽度
		height: 95rpx;
		box-shadow: 4rpx 4rpx 2rpx 2rpx #8f8f94;
		position: relative;
		left: -110rpx;
		top: 75rpx;
	}

	.line {
		background-color: black;
		width: 90%;
		height: 2rpx;
		margin: auto;
		color: #bbbbbb;
	}

	.all {
		margin-bottom: 0;
	}

	.login_or_register {
		display: flex;
	}

	.img_block {
		/* 		align-items: center;
		vertical-align: center; */
		display: flex;
		margin: 50rpx;
		border: 4rpx solid black;
		border-radius: 50%;
		padding: 10rpx;
	}

	.img_style {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
	}

	.p_1 {
		width: 550rpx;
		height: 100rpx;
		margin-top: 50rpx;
		margin-left: 0rpx;
		/* text-align: center; */
		justify-content: center;
		font-size: 60rpx;
		background-color: #fff;
		line-height: 60px;
		font-weight: bolder;
	}

	.p_2 {
		font-weight: 500;
		font-size: 60rpx;
		margin: 30rpx;
		margin-bottom: 70rpx;
	}

	.line {
		background-color: #bbbbbb;
		width: 90%;
		height: 2rpx;
		margin: auto;

		margin-top: 10rpx;
	}

	/* 	.detail {
		display: flex;
	}
	
	.line_block {
		display: flex;
		margin-left: 30rpx;
	}
	
	.element {
		color: #bbbbbb;
		margin-left: 30rpx;
	}
	
	.content {
		float: right;
	} */
	.element {
		color: #909090;
		margin-left: 30rpx;
		font-size: 40rpx;
		margin-top: 10rpx;
	}

	.line_block {
		display: flex;
		margin-left: 30rpx;
		margin-right: 30rpx;
		margin-top: 30rpx;
	}

	.content {
		font-size: 40rpx;
		padding-right: 30rpx;
		margin-right: 30rpx;
		margin-top: 10rpx;
	}

	.btn_style_2 {
		width: 300rpx;
		margin-top: 30rpx;
		color: #8f8f94;
		background-color: #fefa83;
		margin-top: 20%;
		border-radius: 25rpx;
		box-shadow: 4rpx 4rpx 2rpx 2rpx #8f8f94;

	}

	.btn_style_3 {
		width: 300rpx;
		margin-top: 30rpx;
		margin-bottom: -60rpx;
		color: #8f8f94;
		background-color: #fefa83;
/* 		margin-top: 20%; */
		border-radius: 25rpx;
		box-shadow: 4rpx 4rpx 2rpx 2rpx #8f8f94;

	}

	.btn_1 {

		border: none;
		background-color: #f0e3f2;
		text-align: center;
		justify-content: center;
		height: 90rpx;
		margin-top: 30rpx;
		border-radius: 45rpx;

	}

	.btn_2 {
		border: none;
		background-color: #f0e3f2;
		text-align: center;
		justify-content: center;
		height: 90rpx;
		margin-top: 30rpx;
		border-radius: 45rpx;
	}

	button::after {
		border: none;
	}
</style>
