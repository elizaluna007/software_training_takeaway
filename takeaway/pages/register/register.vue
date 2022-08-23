<template>
	<view class="orange">
		<view class="help">
			<text style="color: #8f8f94;" @click="goto_help()">帮助</text>
		</view>

		<view class="welcome_block">
			<text class="welcome">欢迎注册小橘子</text>
		</view>

		<view>
			<view class="weui-input">
				<input class="input_style" v-model="account" placeholder="请输入账号 (4-11位)" maxlength='11' />
			</view>

			<view class="weui-input">
				<input class="input_style" :type="pwdType" v-model="password" placeholder="请输入密码 (6位及以上)" />
				<view>
					<image :src="seen?openeye:nopeneye" @click="changeType" class="pic_pos"></image>
				</view>
			</view>

			<view class="weui-input">
				<input class="input_style" :type="pwdType" v-model="repassword" placeholder="请确认密码 (6位及以上)" />
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
			<!-- <div class="line_block">
				<p class="element">xxx</p>
				<p class="content" style="position: relative;left: 100rpx;">xxx</p>
			</div> -->
			<view>
				<!-- <text class="agree">我已阅读并同意《小橘子协议》 《个人信息保护协议》</text> -->
				<div class="agree" style="display: flex;">
					<p class="agree1" style="position: relative;left: 5rpx;width: 530rpx;">
						我已阅读并同意<span>《小橘子协议》《个人信息保护协议》</span></p>
				</div>
			</view>
		</view>
		<view class="btn_block">
			<button class="btn_style" @click="_check_register">注册</button>
		</view>
		<view class="flexs">
			<a class="first" @click="goto1()">手机号登录</a>
			<a class="second" @click="goto2()">用户名登录</a>
		</view>

	</view>
</template>
<script>
	export default {
		data() {
			return {
				account: '',
				password: '',
				repassword: '',
				code: '',
				msg: '',
				sure: false,
				pwdType: "password",
				openeye: require("../../static/eye.png"), //小眼睛图片地址
				nopeneye: require("../../static/no_eye.png"),
				seen: 0,
			}
		},
		onLoad() {},
		methods: {
			//页面下拉刷新后，1.5秒后停止显示下拉刷新图标
			onPullDownRefresh() {
				console.log('refresh');
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 1500);
			},
			goto_help() {
				uni.navigateTo({
					url: '/pages/help/help'
				})
			},
			changeType() {
				this.pwdType = this.pwdType === "password" ? "text" : "password";
				this.seen = !this.seen;
			},
			checkChoose: function() { //点击单选框一次，改变一次sure值
				this.sure = !this.sure;
				console.log(this.sure);
			},
			_check_register() {
				if (this.account == '') { //如果账号为空，弹框提示
					uni.showToast({
						title: "账号为空",
						icon: 'error',
						duration: 850
					})
				} else if (this.password == '') { //如果第一次输入密码为空，弹框提示
					uni.showToast({
						title: "输入密码为空",
						icon: 'error',
						duration: 850
					})
				} else if (this.repassword == '') { //如果第二次输入密码为空，弹框提示
					uni.showToast({
						title: "确认密码为空",
						icon: 'error',
						duration: 850
					})
				} else if (this.sure == false) { //如果sure值为false，弹框提示
					uni.showToast({
						title: "请先阅读并同意协议",
						icon: 'error',
						duration: 850
					})
				} else if (this.account.length < 4) { //如果用户输入账号小于4位
					uni.showToast({
						title: "账号少于4位",
						icon: 'error',
						duration: 850
					})
				} else if (this.account.length > 11) { //如果用户输入账号大于11位
					uni.showToast({
						title: "账号大于11位",
						icon: 'error',
						duration: 850
					})
				} else if (this.password.length < 6) { //如果密码少于6位，弹框提示
					uni.showToast({
						title: "密码小于6位",
						icon: 'error',
						duration: 850
					})
				} else if (this.repassword != this.password) { //如果第二次输入密码不匹配，弹框提示
					uni.showToast({
						title: "密码输入不一致",
						icon: 'error',
						duration: 850
					})
				} else { //当全部输入正确时，向数据库发送手机号以及密码
					uni.request({
						url: getApp().globalData.customer_customerRegister, //真实接口地址。
						method: "POST", //不设置，默认为get方式
						data: {
							account: this.account,
							password: this.password
						},
						header: {},
						//发送成功，相应得到信息以及数据库传输过来的数据
						success: (res) => {
							this.code = res.data.code
							this.msg = res.data.msg
							console.log('code', this.code)
							console.log('msg', this.msg)

							if (this.code) {
								uni.navigateTo({
									url: '/pages/login/login_username?is_hint=1&account=' + this
										.account + '&password=' + this.password
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
			goto1(url) { //点击跳转到根据手机号登录页面
				uni.navigateTo({
					url: '/pages/login/login_phone'
				})
			},
			goto2(url) { //点击跳转到根据用户名登录页面
				uni.navigateTo({
					url: '/pages/login/login_username'
				})
			}
		}
	}
</script>

<style>
	.orange{
			background-image: url('@/pages/static2/orange4.png');
			background-size: 200rpx;
			background-repeat: no-repeat;
			background-position:550rpx 40rpx;
		}
	.help {
		text-align: right;
		margin-top: 30rpx; //设置上边距
		margin-right: 30rpx; //设置右边距
	}

	.welcome_block {
		margin-top: 60rpx; //设置上边距
		margin-left: 100rpx; //设置右边距
	}

	.pic_pos {
		width: 50rpx; //等比例改变图片大小
		height: 50rpx;
		/* 		margin-top: 60rpx;
		margin-left: 100rpx; */
	}

	.welcome {
		font-size: 60rpx; //改变字体大小
		font-weight: bolder; //改变字体粗细
	}

	.weui-input {
		display: flex; //居中显示
		margin-left: 100rpx;
		margin-top: 70rpx;
	}

	.input_style {
		width: 540rpx;
		border-bottom-style: solid;
		border-bottom-width: 2rpx; //输入框下划线
		border-bottom-color: #afafaf; //输入框下划线颜色
		border-left-width: 0rpx;
		border-top-width: 0rpx;
		border-right-width: 0rpx;
		font-size: 38rpx;
	}

	.agree_block {
		//设置同意框区域的大小与位置
		display: flex;
		text-align: center; //字体(内容)居中
		margin-top: 80rpx;
		width: 600rpx;
	}

	.choose {
		display: flex; //改变区域放置方式
		margin-left: 100rpx; //改变区域左边距
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
		display: flex; //放置位置一行
		justify-content: space-between; //内容位于左右两端
		align-items: center; //位置居中
		margin-top: 50rpx; //上边距
	}

	.first {
		margin-left: 90rpx; //左边距
		color: #8f8f94;
	}

	.second {
		margin-right: 90rpx; //右边距
		color: #8f8f94;
	}

	button::after {
		border: none;
	}

	.btn_style {
		background-color: #fefa83; //按钮颜色
		border-radius: 20rpx; //按钮弧度
		width: 500rpx; //宽度
		box-shadow: 4rpx 4rpx 2rpx 2rpx #8f8f94;
	}

	.btn_block {
		display: flex; //放置位置自由
		margin-top: 120rpx; //按钮上边距
	}

	.text_style {
		display: flex;
		text-align: center;
	}
</style>
