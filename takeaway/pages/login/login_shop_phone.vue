<template>
	<!-- 商家手机号登录页面 -->
	<view class="orange">
		<!-- 跳转至帮助页面 -->
		<view class="help">
			<text style="color: #8f8f94;margin-right:20rpx;" @click="goto_cust()">顾客登录</text>
			<text style="color: #8f8f94;" @click="goto_help()">帮助</text>
		</view>

		<view class="welcome_block">
			<text class="welcome">欢迎登录小橘子</text>
		</view>
		<!-- 输入手机号和密码框 -->
		<view>
			<view class="weui-input">
				<input type="number" class="input_style" v-model="telephone" placeholder="请输入商家号码" />
			</view>

			<view class="weui-input">
				<input class="input_style" v-model="password" :type="pwdType" placeholder="请输入密码" />
				<!-- 点击图片可显示密码是否可见 -->
				<view>
					<image :src="seen?openeye:nopeneye" @click="changeType" class="pic_pos"></image>
				</view>
			</view>

		</view>

		<view class="agree_block">
			<!-- 选择输入同意协议 -->
			<view class="choose">
				<checkbox-group @change="checkChoose">
					<label>
						<checkbox value="cb" />
					</label>
				</checkbox-group>
			</view>

			<view>
				<!-- <text class="agree">我已阅读并同意《小橘子协议》 《个人信息保护协议》</text> -->
				<div class="agree" style="display: flex;">
					<p class="agree1" style="position: relative;left: 5rpx;width: 530rpx;">
						我已阅读并同意<span>《小橘子协议》《个人信息保护协议》</span></p>
				</div>
			</view>

		</view>
		<!-- 登录按钮 -->
		<view class="btn_block">
			<button class="btn_style" @click="_check_register">登录</button>
		</view>
		<view class="flexs">
			<!-- 前往商家名登录 -->
			<a class="second" @click="toLogin_shop_Username">商家名登录</a>
		</view>
	</view>

	</view>
</template>
<script>
	export default {
		data() {
			return {
				telephone: '', //商家输入的手机号
				account: '', //商家账号
				password: '', //商家输入的密码
				code: '', //用于接受后端发送的登录状态
				msg: '', //用于接受后端发送的登录信息
				Data: '', //用于接受后端发送的登录数据
				sure: false, //用于判断用户是否同意协议 true同意 false不同意
				pwdType: "password", //判断密码是否可见的类型
				openeye: require("../../static/eye.png"), //密码可视图片地址
				nopeneye: require("../../static/no_eye.png"), //密码不可视图片地址
				seen: 0, //判断密码是否可见
				get_code: 0, //用于判断登录方式 0手机登录 1账号登录
			}
		},
		methods: {
			//页面下拉刷新后，1.5秒后停止显示下拉刷新图标
			onPullDownRefresh() {
				console.log('refresh');
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 1500);
			},
			//跳转至帮助界面
			goto_help() {
				uni.navigateTo({
					url: '/pages/help/help'
				})
			},
			//前往顾客登录
			goto_cust() {
				uni.navigateTo({
					url: '/pages/login/login_phone'
				})
			},
			toLogin_shop_Username() {
				uni.navigateTo({
					url: '/pages/login/login_shop_username',
				})

			},
			//用于判断用户是否同意协议 true同意 false不同意
			checkChoose: function() {
				this.sure = !this.sure;
				// console.log(this.sure);
			},
			//检验是否可以登录，不满足条件则提示信息 已满足发送请求
			_check_register() {
				if (this.telephone == '') {
					uni.showToast({
						title: "手机号为空",
						icon: 'error',
						duration: 850
					})
				} else if (this.password == '') {
					uni.showToast({
						title: "密码为空",
						icon: 'error',
						duration: 850
					})
				} else if (this.sure == false) {
					uni.showToast({
						title: "请先阅读并同意协议",
						icon: 'error',
						duration: 850
					})
				} else if (this.telephone.length != 11) {
					uni.showToast({
						title: "手机号错误",
						icon: 'error',
						duration: 850
					})
				} else if (this.password.length < 6) {
					uni.showToast({
						title: "密码小于6位",
						icon: 'error',
						duration: 850
					})
				} else {
					//条件已满足，向/business/business_shopLogin接口发送请求
					uni.request({
						url: getApp().globalData.business_shopLogin, //仅为示例，并非真实接口地址。
						// url: 'https://5t764096g4.goho.co/customer/customerLogin', //仅为示例，并非真实接口地址。
						method: "POST", //不设置，默认为get方式
						data: {
							phone: this.telephone,
							account: this.account,
							password: this.password,
							code: this.get_code,
						},
						header: {},

						success: (res) => {
							console.log(res);
							this.code = res.data.code;
							this.msg = res.data.msg;
							this.Data = res.data;
							getApp().globalData.token = res.data.data.token;
							getApp().globalData.login_key = true;
							getApp().globalData.cstm_or_sp = 0;
							if (res.data.code == 1) {
								uni.reLaunch({
									url: '/pages/my/my'
								})
							} else {
								uni.showToast({
									title: this.msg,
									icon: 'error',
									duration: 850
								})
							}

						}
					});
				}
			},
			//转换密码是否可见
			changeType() {
				this.pwdType = this.pwdType === "password" ? "text" : "password";
				this.seen = !this.seen;
			},

		},
	}
</script>

<style>
	.orange {
		background-image: url('@/pages/static2/orange4.png');
		background-size: 200rpx;
		background-repeat: no-repeat;
		background-position: 550rpx 40rpx;
	}

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
		border-left-width: 0rpx;
		border-top-width: 0rpx;
		border-right-width: 0rpx;
		border-bottom-color: #afafaf;
		font-size: 38rpx;
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

	.agree1 {
		text-align: left;
	}

	.agree span {
		color: #FFB400;
	}

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
		position: absolute;
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
