<template>
	<view class="content">
		<!-- 列表框 -->
		<el-col class="home-card">
			<!-- 卡片 -->
			<el-card class="list">
				<!-- 图片 -->
				<!-- 点击会触发goto_shop函数，前往对应商家 -->
				<img :src="info.logo" class="img_style" @click="goto_shop(info)" />
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
				name: '', //搜索结果，来自上个界面
				info: ///shop/searchShopByName接口得到的信息
				{
					name: '',
					credit: '',
					sale: '',
					thresholdprice: '',
					distance: '',
					needytime: ''

				},
				//search_content: ''之前需求的变量，暂时无用
				key: false, //布尔 true登录 false未登录
			}
		},
		//页面初始加载 通过name向/shop/searchShopByName接口发送请求
		onLoad(result) {
			this.name = result.search_content;
			uni.request({
				url: getApp().globalData.shop_searchShopByName,
				method: "GET", //不设置，默认为get方式
				data: {
					name: this.name
				},
				header: {
					// token: getApp().globalData.token
				},
				success: (res) => {
					this.info = res.data[0];
					console.log("开始打印搜索获得的信息");
					console.log(res);
				}
			})
		},
		methods: {
			//页面下拉刷新后，1.5秒后停止显示下拉刷新图标
			onPullDownRefresh() {
				console.log('refresh');
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 1500);
			},
			//前往对应商铺
			goto_shop(object) {
				this.key = getApp().globalData.login_key;
				//已登录前往商家
				if (this.key == true) {
					console.log("前往商铺");
					console.log(object.name);
					uni.navigateTo({
						url: '/pages/index/shop?name=' + object.name
					})
				} else {
					// 未登录前往登录
					uni.navigateTo({
						url: '/pages/login/login_username'
					})
				}
			},

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

/* 	清除uniapp button按钮默认样式（去掉边框） */
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
		width:200rpx;
		overflow: hidden;
		/* break-all(允许在单词内换行。) */
		word-break: break-all;
		/* 超出部分省略号 */
		text-overflow: ellipsis;
		/* 对象作为伸缩盒子模型显示 */
		display: -webkit-box;
		/* 设置或检索伸缩盒对象的子元素的排列方式 */
		-webkit-box-orient: vertical;
		/* 显示的行数 */
		-webkit-line-clamp: 1;
	}

	.p_2 {
		font-size: 40rpx;
		color: #ffb420;
		margin-left: 19rpx;
		width:200rpx;
		overflow: hidden;
		/* break-all(允许在单词内换行。) */
		word-break: break-all;
		/* 超出部分省略号 */
		text-overflow: ellipsis;
		/* 对象作为伸缩盒子模型显示 */
		display: -webkit-box;
		/* 设置或检索伸缩盒对象的子元素的排列方式 */
		-webkit-box-orient: vertical;
		/* 显示的行数 */
		-webkit-line-clamp: 1;
	}

	.p_3 {
		font-size: 40rpx;
		color: #8f96a0;
		margin-left: 19rpx;
		width:200rpx;
		overflow: hidden;
		/* break-all(允许在单词内换行。) */
		word-break: break-all;
		/* 超出部分省略号 */
		text-overflow: ellipsis;
		/* 对象作为伸缩盒子模型显示 */
		display: -webkit-box;
		/* 设置或检索伸缩盒对象的子元素的排列方式 */
		-webkit-box-orient: vertical;
		/* 显示的行数 */
		-webkit-line-clamp: 1;
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
