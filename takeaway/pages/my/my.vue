<template>
	<view>
		<div class="login_or_register">
			<div class="img_block">
				<img :src="login_no" class="img_style" v-if="button_key" />
				<img :src="info.headphoto" class="img_style" v-if="key" @click="upload_img()" />
			</div>
			<button v-if="button_key" class="btn_style" type="default" @click="goto()" style="display: ;">登录/注册</button>
			<p v-if="key" class="p_1">{{info.name}}</p>
		</div>
		<div v-if="button_key" class="line"></div>
		<div v-if="key">
			<div style="display: flex;">
				<p class="p_2">基本资料</p>
				<button class="btn_1" @click="change()">编辑</button>
				<button class="btn_2" @click="save()">保存</button>
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
				}
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
					data: {
						name:this.info.name,
						sex:this.info.sex,
						defaultaddress:this.info.address,
						birthday:this.info.birthday,
						phone:this.info.phone,
						headphoto:this.info.headphoto
					},
					header: {
						token: getApp().globalData.token
					},
					success: (res) => {
						// this.info = res.data;
						// console.log("修改信息成功");
					}
				})
			},
			upload_img() {
				// uni.chooseImage({
				// 	count: 1, //上传图片的数量，默认是9
				// 	sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				// 	sourceType: ['album'], //从相册选择
				// 	success: function(res) {
				// 		const tempFilePaths = res.tempFilePaths; //拿到选择的图片，是一个数组
				// 		console.log("选取图片成功");
				// 		console.log(res);
				// 		console.log(tempFilePaths);
				// 		console.log("开始上传");
				// 		uni.uploadFile({
				// 			url: 'http://localhost:3000/users/upload', //post请求的地址
				// 			filePath: tempFilePaths[0],
				// 			name: 'avatar',
				// 			// formData: {
				// 		 // 	'username': this.userInfo.username //formData是指除了图片以外，额外加的字段
				// 			// },
				// 			success: (uploadFileRes) => {
				// 				//这里要注意，uploadFileRes.data是个String类型，要转对象的话需要JSON.parse一下
				// 				var obj = JSON.parse(uploadFileRes.data);
				// 			}
				// 		})

				// 	}

				// });
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
								console.log("开始验证");
								console.log(base64);
								console.log(typeof(base64));
								that.avatar = base64; //将文件转化为base64并显示
								console.log("开始上传");
								console.log(base64);
								console.log("开始打印base64");
								console.log(JSON.stringify(base64));
								uni.request({
									// url: 'http://127.0.0.1:4523/m1/1437509-0-default/shop/getAllShopInfo', //仅为示例，并非真实接口地址。
									url: 'https://v3710z5658.oicp.vip/customer/changeHeadphoto', //真实端口
									method: "POST", //不设置，默认为get方式
									data: {
										headphoto:JSON.stringify(base64)
									},
									header: {
										token: getApp().globalData.token,
									},
									success: (res) => {
										console.log("接收成功");
										// console.log(res.data.length);
										// console.log(res);
										// this.infos = res.data;
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
			uni.request({
				method: "GET",
				url: 'https://v3710z5658.oicp.vip/customer/getCustomerInfo',
				// url:'http://127.0.0.1:4523/m1/1437509-0-default/customer/getCustomerInfo',
				data: {
				},
				header: {
					token: getApp().globalData.token
				},
				success: (res) => {
					this.info = res.data;
					console.log("开始打印个人信息");
					console.log(res.data);
				}
			})
		},
		onShow() {
			this.key = getApp().globalData.login_key;
			this.button_key = !this.key;
			uni.request({
				method: "GET",
				url: 'https://v3710z5658.oicp.vip/customer/getCustomerInfo',//wj
				// url:'http://127.0.0.1:4523/m1/1437509-0-default/customer/getCustomerInfo',
				//url: 'https://5t764096g4.goho.co/customer/getCustomerInfo',//kx
				data: {

				},
				header: {
					token: getApp().globalData.token
				},
				success: (res) => {
					this.info = res.data;
					console.log("开始打印个人信息");
					console.log(res.data);
				}
			})
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
		outline: none;
		border: 0px;
		border-color: #fff;
		width: 300rpx;
		height: 120rpx;
		margin-top: 50rpx;
		margin-left: 0rpx;
		text-align: center;
		justify-content: center;
		font-size: 50rpx;
		background-color: #fff;
		line-height: 60px;
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
		width: 150rpx;
		height: 100rpx;
		margin-top: 50rpx;
		margin-left: 0rpx;
		text-align: center;
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
		color: red;
		background-color: #fefa83;
		margin-top: 20%;
	}

	.btn_1 {
		background-color: #fff;
		border: none;
		background-color: #cccccc;
		text-align: center;
		justify-content: center;
		height: 90rpx;
		margin-top: 30rpx;
	}

	.btn_2 {
		background-color: #fff;
		border: none;
		background-color: #cccccc;
		text-align: center;
		justify-content: center;
		height: 90rpx;
		margin-top: 30rpx;
	}
	button::after {
		border: none;
	}
</style>
