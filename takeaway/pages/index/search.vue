<template>
	<view class="content">
		<!-- <view class="content1"></view>
		<view class="search-block">
			<view class="search-ico-wapper">
				<image src="../../static/search.png" class="search-ico" mode=""></image>
			</view>
			<input v-module="search_content"type="text" value="" placeholder=" 一切美食,尽在小橘子!" class="search-text" maxlength="10" focus />
		</view>
		<view class="shadow">
		</view>
		<view><button class="button-search" hover-class="bg-click"
				style="position: relative; left: 180rpx; top: -153rpx" @click="search_goto()">搜索</button>
		</view> -->
		<!-- 列表框 -->
		<el-col class="home-card">
			<!-- 卡片 -->
			<el-card class="list">
				<!-- 图片 -->
				<img :src="info.logo" class="img_style" @click="goto_shop()" />
				<!-- 描述框 -->
				<div class="describe" @click="goto_shop()">
					<p class="p_1">{{info.name}}</p>
					<p class="p_2">{{info.credit}}分</p>
					<p class="p_3">月售{{info.sale}}</p>
					<p class="p_3">起送￥{{info.thresholdprice}}</p>
				</div>
				<!-- 距离以及时间-->
				<div class="time" @click="goto_shop()">
					<p class="p_3">{{info.distance}}分钟</p>
					<p class="p_3">{{info.needytime}}km</p>
				</div>
			</el-card>
		</el-col>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NjA0ODEyMzQuMTU2MTY4NSwiaWF0IjoxNjYwNDc4MjM0LjE1NjE2ODUsImlzcyI6IkJiYmFjayIsImRhdGEiOnsiYWNjb3VudCI6IjM0MjEiLCJwYXNzd29yZCI6IjEyMzM0IiwidGltZXN0YW1wIjoxNjYwNDc4MjM0LjE1NjE2ODV9fQ.O94g6_9ejGT0BEdn6plT2T3q-D1QVOpag1yrZmGT6zg',
				info: '',
				search_content: ''
			}
		},

		onLoad(result) {
			this.name = result.search_content;
			uni.request({
				url: 'https://v3710z5658.oicp.vip/shop/searchShopByName', //仅为示例，并非真实接口地址。
				method: "GET", //不设置，默认为get方式
				data: {
					name: this.name
				},
				header: {
					token: this.token,
				},
				success: (res) => {
					this.info = res.data;
				}
			})
		},
		methods: {
			goto_shop(url) {
				uni.navigateTo({
					url: '/pages/index/shop?name=' + this.search_content + '&token=' + this.token
				})
			},
			// search_goto(){
			// 	console.log("这是要搜索的内容");
			// 	console.log(this.search_content);
			// 	uni.navigateTo({
			// 		url: '/pages/index/search?search_content=' + this.search_content + '&token=' + this.token
			// 		// url: '/pages/index/search?search_content=this.search_content & token=this.token'
			// 	})
			// }

		}
	}
</script>

<style>
	.pic_block {
		margin-left: 25px;
		border-radius: 100px;
	}

	.name_style {
		font-size: 30px;
		margin-top: -20px;
	}

	.evalute_style {
		color: darkorange;
		font-size: 20px;
		margin-top: 3px;
	}

	.number_style {
		color: #8f8f94;
		margin-top: 10px;
	}

	.pay_style {
		color: #8f8f94;
		margin-top: 10px;
	}

	.time {
		color: #8f8f94;
		margin-top: 10px;
	}

	.button-search {
		width: 130rpx;
		height: 60rpx;
		display: flex;
		margin-block: 0rpx;
		margin-left: 205px;
		line-height: 60rpx;
		justify-content: center;
		border-radius: 25px;

		/* background:linear-gradient(to right, #fefa83,#b0a7d7) ; */
		background-color: #fefa83;
		font-size: 13px;
	}

	.bg-click {
		background-color: #b0a7d7;
	}

	// 清除uniapp button按钮默认样式（去掉边框）
	button::after {
		border: none;
	}



	.content1 {

		height: 80upx;

	}

	page {}

	/* 搜索框 */

	.search-ico,
	.search-ico-1 {

		width: 40upx;

		height: 40upx;

	}

	.search-text {
		background-color: #f4f5f5;
		font-size: 14px;
		height: 60upx;
		width: 480upx;
		margin-left: 0rpx;
	}


	.search-block {

		display: flex;

		flex-direction: row;

		padding-left: 60upx;

		position: relative;

		top: -32upx;

	}

	.search-ico-wapper {

		background-color: #f4f5f5;

		display: flex;

		flex-direction: column;

		justify-content: center;

		padding: 0upx 0upx 1upx 40upx;

		border-bottom-left-radius: 18px;

		border-top-left-radius: 18px;

	}

	.search-ico-wapper1 {

		background-color: #f4f5f5;

		display: flex;

		flex-direction: column;

		justify-content: center;

		padding: 0upx 40upx 10upx 0upx;

		border-bottom-right-radius: 18px;

		border-top-right-radius: 18px;

	}

	.shadow {

		width: 638upx;

		height: 60upx;

		border-radius: 18px;

		-moz-box-shadow: 0 10 10px #e6e6e6;

		-webkit-box-shadow: 0 0 10px #e6e6e6;

		box-shadow: 0 10 10 10px #e6e6e6;

		position: relative;

		top: -90upx;

		left: 60upx;

	}


	.swiper_all {
		height: 100%;
		margin-top: -50px;
		text-align: center;
		box-shadow: 100 10 10 100px #ff557f;
		;
	}

	.home-card {
		background-color: #ffffff;
	}

	.swp_img {
		width: ;
	}

	p {
		text-align: left;
	}

	.p_1 {
		font-size: 50rpx;
		margin-left: 19rpx;
	}

	.p_2 {
		font-size: 40rpx;
		color: #ffb420;
		margin-left: 19rpx;
	}

	.p_3 {
		font-size: 40rpx;
		color: #8f96a0;
		margin-left: 19rpx;
	}


	.img_style {
		/* 		height: 100rpx; */
		/* 		object-fit: contain; */
		height: 180rpx;
		width: 180rpx;
		margin: 20rpx 0rpx 20rpx 20rpx;
		border-radius: 10%;
	}

	.list {
		align-items: center;
		vertical-align: center;
		display: flex;
		object-fit: fill;
		margin-top: 70rpx;
		border-width: 100%;
		border: 3rpx solid #f8f8f8;
		box-shadow: #8f8f94;
		border-radius: 7%;
		box-shadow:
			5.7px 3.8px 5.3px rgba(0, 0, 0, 0.04),
			19px 12.7px 17.9px rgba(0, 0, 0, 0.024),
			85px 57px 80px rgba(0, 0, 0, 0.016);
		margin-left: 20rpx;
		margin-right: 20rpx;

	}


	.describe {
		margin-top: 30rpx;
		margin-left: 50rpx;
	}

	.time {
		/* margin-top: 50rpx;
			margin-block-start: 30rpx; */
		margin: auto;
	}

	.content {
		background-image: url("https://wx1.sinaimg.cn/mw2000/006Qjcu1gy1h561t2xpz2j30dw0dqtaf.jpg");
		background-size: 300rpx;
		background-repeat: no-repeat;
		background-position: 450rpx 690rpx;
		background-attachment: fixed;

	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
