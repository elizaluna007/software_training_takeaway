<template>
	<view class="content">
		<view class="content1"></view>
		<view class="search-block">
			<view class="search-ico-wapper">
				<image src="../../static/search.png" class="search-ico" mode=""></image>
			</view>
			<input v-model="search_content" type="text" value="" placeholder=" 一切美食,尽在小橘子!" class="search-text"
				maxlength="10" focus />
		</view>
		<view class="shadow">
		</view>
		<view><button class="button-search" hover-class="bg-click"
				style="position: relative; left: 180rpx; top: -153rpx" @click="search_goto()">搜索</button>
		</view>
		<view class="swiper_all">
			<swiper circular indicator-dots mode="widthFix" class="img_out" autoplay="true" interval="2000">
				<!-- v-for循环遍历数组 -->
				<swiper-item v-for="item in swipers">
					<image :src="item.url" class="swp_img" @click="swiper_to_shop(item.shop_name)"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 列表框 -->
		<view class="home-card">
			<!-- 卡片 -->
			<view class="list" v-for="info in infos" :key="info">
				<!-- 图片 -->
				<img :src="info.logo" class="img_style" @click="goto_shop(info)" />
				<!-- 描述框 -->
				<div class="describe" @click="goto_shop(info)">
					<p class="p_1">{{info.name}}</p>
					<p class="p_2">{{info.credit}}分</p>
					<p class="p_3">月售{{info.sale}}</p>
					<p class="p_3">
						<text>起送</text>
						<text style="color:#db5a6b">￥{{info.thresholdprice}}</text>
					</p>
				</div>
				<!-- 距离以及时间-->
				<div class="time" @click="goto_shop(info)">
					<p class="p_4">{{info.needytime}}分钟</p>
					<p class="p_5">{{info.distance}}km</p>
				</div>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				search_content: '',
				swipers: [{
						shop_name: "肯德基", //商铺名
						//图片地址
						url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx3.sinaimg.cn%2Flarge%2F001QcfDygy1gyhwv3uwv1j60ru0fowiy02.jpg&refer=http%3A%2F%2Fwx3.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662966717&t=e06074382f7891df18af746e56822534',
					},
					{
						shop_name: "星巴克专星送",
						url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F11072012838%2F641.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662966799&t=531da38a6586009ba571d90383635271',
					},
					{
						shop_name: "星巴克专星送",
						url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0156726107918911013eaf704b3222.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662972171&t=6c16760c4faac1aa82fdf28bccd23127',
					}
				],
				infos: '',
				key: ''
			}
		},

		onLoad() {
			uni.request({
				// url: 'http://127.0.0.1:4523/m1/1437509-0-default/shop/getAllShopInfo', //仅为示例，并非真实接口地址。
				//url: 'https://5t764096g4.goho.co/shop/getAllShopInfo', //真实端口
				url: 'https://v3710z5658.oicp.vip/shop/getAllShopInfo',
				method: "GET", //不设置，默认为get方式
				data: {

				},
				header: {
					// token: getApp().globalData.token,
				},
				success: (res) => {
					console.log("开始打印");
					console.log(res.data.length);
					console.log(res);
					this.infos = res.data;
				}
			})
		},
		methods: {
			swiper_to_shop(shop_name) {
				this.key = getApp().globalData.login_key;
				if (this.key == true) {
					uni.navigateTo({
						url: '/pages/index/shop?name=' + shop_name
					})
				} else {
					uni.navigateTo({
						url: '/pages/login/login_username'
					})
				}
			},
			goto_shop(object) {
				this.key = getApp().globalData.login_key;
				if (this.key == true) {
					console.log("前往商铺");
					console.log(object.name);
					uni.navigateTo({
						url: '/pages/index/shop?name=' + object.name
					})
				} else {
					uni.navigateTo({
						url: '/pages/login/login_username'
					})
				}
			},
			search_goto() {
				console.log("这是要搜索的内容");
				console.log(this.search_content);
				uni.navigateTo({
					url: '/pages/index/search?search_content=' + this.search_content
					// url: '/pages/index/search?search_content=this.search_content & token=this.token'
				})
			}

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
		/* height: 100%; */
		width: 80%;
		height: 180px;
		/* 			height: 9/16*100vw; */
		margin-top: -50px;
		text-align: center;
		box-shadow: 100 10 10 100px #ff557f;
		;
		background-color: #f4f4f4;
		margin-left: 10%;
		margin-right: 10%;
	}

	.img_out {
		width: 100%;
		height: 100%;
	}

	.home-card {
		background-color: #ffffff;
	}

	.swp_img {
		width: 100%;
		height: 100%;
		margin-left: 10rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
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

	.p_4 {
		font-size: 40rpx;
		color: #8f96a0;
		position: absolute;
		left: 550rpx;
		margin-top: -35rpx;

	}

	.p_5 {
		font-size: 40rpx;
		color: #8f96a0;
		position: absolute;
		left: 550rpx;
		margin-top: 15rpx;

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
		margin: 20rpx;
		border-width: 100%;
		border: 3rpx solid #f8f8f8;
		box-shadow: #8f8f94;
		border-radius: 7%;
		box-shadow:
			5.7px 3.8px 5.3px rgba(0, 0, 0, 0.04),
			19px 12.7px 17.9px rgba(0, 0, 0, 0.024),
			85px 57px 80px rgba(0, 0, 0, 0.016);


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
