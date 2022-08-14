<template>
	<view>
		<div class="login_or_register">
			<div class="img_block">
			<image src="../../static/l_or_r.jpg" class="img_style"></image>
			</div>
			<button class="btn_style" type="default" @click="goto()" style="display: ;">登录/注册</button>
		</div>
		<div class="line">
		</div>
	</view>

</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			goto(url) {
				uni.navigateTo({
					url: '/pages/login/login_phone'
				})
			}
		},
		onLoad() {
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
</style>
