<template>
	<view>
		<!-- 该页面为帮助页面 -->
		<div class="content">
			<div class="out_block1">

				<div class="askhelpblock">
					<p class="askhelp">您好，请问有什么可以帮助您？</p>
				</div>

				<div class="problems_block">
					<div style="display: flex;">
						<p class="prob">账户无法登录</p>
						<p class="prob1">></p>
					</div>
					<div class="line"></div>
					<div style="display: flex;">
						<p class="prob">手机收不到验证码</p>
						<p class="prob1">></p>
					</div>
					<div class="line"></div>
					<div style="display: flex;">
						<p class="prob">更换手机号</p>
						<p class="prob1">></p>
					</div>
					<div class="line"></div>
					<div style="display: flex;">
						<p class="prob">账户无法登录</p>
						<p class="prob1">></p>
					</div>
					<div class="line"></div>
					<div style="display: flex;">
						<p class="prob">找回原账号</p>
						<p class="prob1">></p>
					</div>
					<div class="line"></div>
					<div style="display: flex;">
						<p class="prob">原手机号无法使用</p>
						<p class="prob1">></p>
					</div>

				</div>
			</div>
		</div>
	</view>
</template>

<script>

</script>

<style>
	.line {
		background-color: #bbbbbb;
		width: 96%;
		height: 2rpx;
		margin: auto;

		margin-top: 30rpx;
	}

	.askhelpblock {
		margin-top: 30rpx;
		margin-left: 20rpx;
		width: 600rpx;
		height: 80rpx;
		border-width: 50%;
		border: 3rpx solid #bbbbbb;
		box-shadow: #8f8f94;
		border-radius: 0rpx 30rpx 30rpx 30rpx;
		box-shadow:
			5.7px 3.8px 5.3px rgba(0, 0, 0, 0.04),
			19px 12.7px 17.9px rgba(0, 0, 0, 0.024),
			85px 57px 80px rgba(0, 0, 0, 0.016);
	}

	.askhelp {
		margin-top: 10rpx;
		margin-right: 0rpx;
		margin-bottom: 10rpx;
		margin-left: 20rpx;
		font-size: 40rpx;
	}

	.problems_block {
		margin: 20rpx;
		margin-top: 60rpx;
		border-width: 100%;
		border: 3rpx solid #bbbbbb;
		box-shadow: #8f8f94;
		border-radius: 20rpx;
		box-shadow:
			5.7px 3.8px 5.3px rgba(0, 0, 0, 0.04),
			19px 12.7px 17.9px rgba(0, 0, 0, 0.024),
			85px 57px 80px rgba(0, 0, 0, 0.016);


	}

	.prob {
		margin-top: 30rpx;
		margin-right: 0rpx;
		margin-bottom: 30rpx;
		margin-left: 20rpx;
		font-size: 35rpx;

	}

	.prob1 {
		margin-top: 30rpx;
		margin-right: 0rpx;
		margin-bottom: 35rpx;
		position: absolute;
		left: 670rpx;
		font-size: 35rpx;
	}

	.content {
		background-image: url("../static2/grape.jpg");
		background-size: 350rpx;
		background-repeat: no-repeat;
		background-position: 420rpx 600rpx;
		background-attachment: fixed;
	}
	
</style>
