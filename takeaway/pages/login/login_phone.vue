<template>
	<view>
		<view class="help">
			<text style="color: #8f8f94;"@click="goto_help()">帮助</text>
		</view>

		<view class="welcome_block">
			<text class="welcome">欢迎登录小橘子</text>
		</view>

		<view>
			<view class="weui-input">
				<input type="number" class="input_style" v-model="telephone" placeholder="请输入手机号" maxlength='11' />
			</view>

			<view class="weui-input">
				<input class="input_style" v-model="password" :type="pwdType" placeholder="请输入密码" />
				<view>
					<image :src="seen?openeye:nopeneye" @click="changeType" class="pic_pos"></image>
				</view>
			</view>

		</view>

		<view class="agree_block">

			<view class="choose">
				<checkbox-group @change="checkChoose">
					<label>
						<checkbox value="cb" />
					</label>
				</checkbox-group>
			</view>

			<view>
				<!-- <text class="agree">我已阅读并同意《小橘子协议》 《个人信息保护协议》</text> -->
				<div class="agree">
					<p class=agree1 style="position: relative;left: -35rpx;">我已阅读并同意</p>
					<p class=agree2 style="position: relative;left: 210rpx;top: -44rpx;">《小橘子协议》《个</p>
					<p class=agree3 style="position: relative;left: -18rpx;top: -25rpx;">人信息保护协议》</p>
				</div>
			</view>

		</view>
		<view class="btn_block">
			<button class="btn_style" @click="_check_register">登录</button>
		</view>
		<view class="flexs">
			<a class="first" href="" @click="toRegister">注册</a>
			<a class="second" href="" @click="toLogin_Username">用户名登录</a>
		</view>

	</view>
</template>
<script>
	export default {
		data() {
			return {
				telephone: '',
				account:'',
				password: '',
				code: '',
				msg: '',
				Data: '',
				sure: false,
				pwdType: "password",
				openeye: require("../../static/eye.png"), //小眼睛图片地址
				nopeneye: require("../../static/no_eye.png"),
				seen: 0,
				code:0,
			}
		},
		methods: {
			goto_help()
			{
				uni.navigateTo({
					url:'/pages/help/help'
				})
			},
			toRegister(url) {
				uni.navigateTo({
					url: '/pages/register/register'
				})
			},
			checkChoose: function() {
				this.sure = !this.sure;
				console.log(this.sure);
			},
			_check_register() {
				if (this.sure == false) {
					uni.showToast({
						title: "请先阅读并同意协议",
						icon: 'exception',
						duration: 850
					})
				} else if (this.telephone == '' | this.telephone.length != 11) {
					uni.showToast({
						title: "手机号错误",
						icon: 'exception',
						duration: 850
					})
				} else if (this.password.length < 6) {
					uni.showToast({
						title: "密码小于6位",
						icon: 'exception',
						duration: 850
					})
				} else {
					uni.request({
						url: 'https://v3710z5658.oicp.vip/customer/customerLogin', //仅为示例，并非真实接口地址。
						method: "POST", //不设置，默认为get方式
						data: {
							phone: this.telephone,
							account: this.account,
							password: this.password,
							code:this.code,
						},
						header: {},

						success: (res) => {
							console.log(res);
							this.code = res.code;
							this.msg = res.msg;
							this.Data = res.data;
							getApp().globalData.token = res.data.data.Oauth_Token;
							getApp().globalData.login_key = true;
							console.log("开始跳转");
							uni.reLaunch({
								url: '/pages/my/my'
							})
							//res.后端定义的接口
						}
					});
				}
			},
			toLogin_Username(url) {
				uni.navigateTo({
					url: '/pages/login/login_username'
				})
			},
			changeType() {
				this.pwdType = this.pwdType === "password" ? "text" : "password";
				this.seen = !this.seen;
			},

		},
	}
</script>

<style>
	.help {
		text-align: right;
		margin-top: 30rpx;
		margin-right: 30rpx;
	}

	.welcome_block {
		margin-top: 60rpx;
		margin-left: 100rpx;
	}

	.welcome {
		font-size: 60rpx;
		font-weight: bolder;
	}

	.weui-input {
		display: flex;
		margin-left: 100rpx;
		margin-top: 70rpx;
	}

	.input_style {
		width: 540rpx;
		border-bottom-style: solid;
		border-bottom-width: 2rpx;
		border-bottom-color: #afafaf;
	}

	.pic_pos {
		width: 50rpx;
		height: 50rpx;
		/* 		margin-top: 60rpx;
		margin-left: 100rpx; */
	}

	.agree_block {
		display: flex;
		text-align: center;
		margin-top: 80rpx;
		width: 600rpx;
	}

	.choose {
		display: flex;
		margin-left: 100rpx;
	}

	.agree {}

	.agree2 {
		color: #FFB400;
	}

	.agree3 {
		color: #FFB400;
	}

	.flexs {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 50rpx;
	}

	.first {
		left: 0;
		margin-left: 90rpx;
		color: #8f8f94;
	}

	.second {
		right: 0;
		margin-right: 90rpx;
		color: #8f8f94;
	}

	.btn_style {
		background-color: #fefa83;
		border-radius: 20rpx;
		width: 500rpx;
		box-shadow: 4rpx 4rpx 2rpx 2rpx #8f8f94;
	}

	.btn_block {
		display: flex;
		margin-top: 120rpx;
	}

	.text_style {
		display: flex;
		text-align: center;
	}

	button::after {
		border: none;
	}
</style>
