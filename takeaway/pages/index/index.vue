<template>
	<view class="content">
		<view class="search_block">
			<view class="search_logo">
				<image src="../../static/search.png" class="pic_pos"></image>
			</view>
			<view class="search_input">
				<input type="text" v-model="key_info" placeholder="一切美食,尽在小橘子!">
			</view>
			<view class="search_click">
				<button class="btn_style">搜索</button>
			</view>
		</view>
		<view class="swiper_all">

			<swiper circular indicator-dots>
				<!-- v-for循环遍历数组 -->
				<swiper-item v-for="item in swipers">
					<image :src="item"></image>
				</swiper-item>
			</swiper>

		</view>
		<!-- 列表框 -->
		<el-col class="home-card">
			<!-- 卡片 -->
			<el-card class="list" v-for="info in infos" :key="info">
				<!-- 图片 -->
				<img :src="info.logo" class="img_style" />
				<!-- 描述框 -->
				<div class="describe">
					<p class="p_1">{{info.name}}</p>
					<p class="p_2">{{info.credit}}</p>
					<p class="p_3">{{info.sale}}</p>
					<p class="p_3">{{info.thresholdprice}}</p>
				</div>
				<!-- 距离以及时间-->
				<div class="time">
					<p class="p_3">{{info.distance}}</p>
					<p class="p_3">{{info.needytime}}</p>
				</div>
			</el-card>
		</el-col>
		<button type="default" @click="goto_shop()" >肯德基</button>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				swipers: [
					'https://img-blog.csdnimg.cn/img_convert/ec13b1d884b422ad6ac1746504fa0454.png',
					'https://img-blog.csdnimg.cn/img_convert/462ba175388a6005201d8a73f186c527.png',
					'https://img-blog.csdnimg.cn/img_convert/213a362a143bd47b8b4e3dad5138d53d.png',
				],
				token: '',
				infos: [],
				token : 'this is a token',
				name : '123'
			}
		},

		onLoad() {
			uni.request({
				url: 'http://127.0.0.1:4523/m1/1437509-0-default/shop/getAllShopInfo', //仅为示例，并非真实接口地址。
				method: "GET", //不设置，默认为get方式
				data: {
					token: this.token,
				},
				header: {},
				success: (res) => {
					this.infos = res.data;
					console.log(this.infos)
				}
			})
		},
		methods: {
			goto(url) {
				// uni.navigateTo({
				// 	url:
				// })
			},
			goto_shop(url) {
				uni.navigateTo({
					url:'/pages/index/shop?id='+this.id+'&token='+this.token
				})
			}
		}
	}
</script>

<style>
	p {
		text-align: center;
	}

	.p_1 {
		font-size: 50rpx;
	}

	.p_2 {
		font-size: 40rpx;
		color: #ffb420;
	}

	.p_3 {
		font-size: 40rpx;
		color: #8f96a0;
	}

	.search_block {
		border-radius: 30%;
		display: flex;
		border: 1rpx;
		margin-top: 30rpx;
		margin-left: 30rpx;
		text-align: center;
	}

	.pic_pos {
		width: 50rpx;
		height: 50rpx;
	}

	.swiper_all {
		height: 100%;
		margin-top: 60rpx;
		margin-left: 30rpx;
		text-align: center;
	}

	.btn_style {
		background-color: #fefa83;
		border-radius: 30%;
	}

	.list_all {
		margin-top: 70rpx;
		border: 2rpx;
		border-color: #8f8f94;
	}

	/* 	.pic_block{
		width: 100rpx;
		height: 100rpx;
	} */
	.img_style {
		/* 		height: 100rpx; */
		object-fit: contain;
		height: 250rpx;
		width: 250rpx;
		margin: 20rpx 0rpx 20rpx 20rpx;
		border-radius: 10%;
	}

	.list {
		display: flex;
		object-fit: fill;
		margin: 30rpx;
		border-width: 100%;
		border: 3rpx solid #f8f8f8;
		box-shadow: #8f8f94;
		border-radius: 7%;
		box-shadow:
		  5.7px 3.8px 5.3px rgba(0, 0, 0, 0.04),
		  19px 12.7px 17.9px rgba(0, 0, 0, 0.024),
		  85px 57px 80px rgba(0, 0, 0, 0.016)
		;


	}


	.describe {
		margin-top: 30rpx;
		margin-left: 0rpx;
	}

	.time {
		margin-top: 70rpx;
		margin-left: 40rpx;
	}

	.content {

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
