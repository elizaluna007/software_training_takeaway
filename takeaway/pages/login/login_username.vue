<template>
	<view>
		<view class="help">
			<text>帮助</text>
		</view>

		<view class="welcome_block">
			<text class="welcome">欢迎登录小橘子</text>
		</view>

		<view>
			<view class="weui-input">
				<input class="input_style" v-model="account" placeholder="请输入用户名" />
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
				<text class="agree">我已阅读并同意《小xx协议》 《个人信息保护协议》</text>
			</view>
		</view>
		<view class="btn_block">
			<button class="btn_style" @click="_check_register">登录</button>
		</view>
		<view class="flexs">
			<a class="first" href=""  @click="toRegister">注册</a>
			<a class="second" href=""  @click="toLogin_Phone">手机号登录</a>
		</view>
		
	</view>
</template>
<script>
	export default {
		data() {
			return {
				account:'',
				password: '',
				code: '0',
				msg: '',
				Oauth_Token: '',
				exprie:'',
				sure: false,
				pwdType: "password",
				openeye: require("../../static/eye.png"), //小眼睛图片地址
				nopeneye: require("../../static/no_eye.png"),
				seen:0,
			}
		},
		methods: {
			changeType() {
				this.pwdType = this.pwdType === "password" ? "text" : "password";
				this.seen = !this.seen;
			},
			checkChoose: function() {
				this.sure = !this.sure;
				console.log(this.sure);
			},
			_check_register(){
				if (this.sure == false) {
					uni.showToast({
						title: "请先阅读并同意协议",
						icon: 'exception',
						duration: 850
					})
				}
				else if(this.password.length<6){
						uni.showToast({
							title: "密码小于6位",
							icon: 'exception',
							duration: 850
						})			
				}
				else{
					uni.request({
						url: 'http://127.0.0.1:4523/m1/1437509-0-default/customer/customerLogin', //仅为示例，并非真实接口地址。
						method: "POST", //不设置，默认为get方式
						data: {
							account: this.account,
							password: this.password
						},
						header: {},
						//登录时发送数据到数据库成功得到相应返回的数据
						success: (res) => {
								console.log(res),
								this.code = res.data.code
								this.msg = res.data.msg
								this.Oauth_Token = res.data.data.Oauth_Token
								this.exprie = res.data.data.exprie
							//res.后端定义的接口
						}
					});
				}	
			},
			toRegister(url) {
				uni.navigateTo({
					url:'/pages/register/register'
				})
			},
			toLogin_Phone(url) {
				uni.navigateTo({
					url:'/pages/login/login_phone'
				})
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

	.flexs {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 50rpx;
	}

	.first {
		left: 0;
		margin-left: 90rpx;
	}

	.second {
		right: 0;
		margin-right: 90rpx;
	}

	.btn_style {
		background-color: #fefa83;
		border-radius: 20rpx;
		width: 500rpx;
	}

	.btn_block {
		display: flex;
		margin-top: 120rpx;
	}

	.text_style {
		display: flex;
		text-align: center;
	}
</style>
