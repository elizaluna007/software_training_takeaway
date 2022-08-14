<template>
	<view class="all">
		<div class="login_or_register">
			<div class="img_block">
				<image src="../../static/home.png" class="img_style"></image>
			</div>
			<p class="p_1">姓名</p>
		</div>
		
		<div>
			<p class="p_2">基本资料</p>
			<div class="line_block">
				<p class="element">用户名</p>
				<p class="content" style="position: relative;left: 100rpx;">xxx</p>
			</div>
			<div class="line"></div>
			<div class="line_block">
				<p class="element">性别</p>
				<p class="content" style="position: relative;left: 140rpx;">xxx</p>
			</div>
			<div class="line"></div>
			<div class="line_block">
				<p class="element">地址</p>
				<p class="content" style="position: relative;left: 140rpx;">xxx</p>
			</div>
			<div class="line"></div>
			<div class="line_block">
				<p class="element">生日</p>
				<p class="content" style="position: relative;left: 140rpx;">xxx</p>
			</div>
			<div class="line"></div>
			<div class="line_block">
				<p class="element">手机号</p>
				<p class="content" style="position: relative;left: 100rpx;">xxx</p>
			</div>
			<div class="line"></div>
		</div>
		<button class="btn_style">退出当前账号</button>
	</view>

</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			goto(url) {
				uni.navigateTo({
					url: '/pages/login/login_phone'
				})
			}
		},
		onLoad() {}
	}
</script>

<style>
	.all{
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

	.btn_style {
		width: 300rpx;
		margin-top: 30rpx;
		color: red;
	}
</style>

