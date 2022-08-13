<template>
	<view class="page_box">
		<view class="head">
			<!-- 页面头部图片以及标题 -->
			<image src=../../static/logo.png class="logo_img">
				<!-- 商店图标 -->
			</image>
			<text class="shop_name">
				<!-- 商店名 -->
				肯德基宅急送
			</text>
			<text class="shop_score">
				<!-- 评分 -->
				4.8分
			</text>
			<text class="shop_sale_number">
				<!-- 月售数量 -->
				月售1590
			</text>
			<text class="shop_delivery_time">
				<!-- 预估配送时间 -->
				配送约30分钟
			</text>
		</view>

		<view class="tabbar">
			<!-- 页面上中部导航栏 -->
			<text>点菜</text>
			<text>评价</text>
			<text>商家</text>
		</view>
		<view class="down">
			<scoll-view class="left" scroll-y>
				<!-- 页面左边滚动栏 -->
				<view>智能家居</view>
				<view>智能家居</view>
				<view>智能家居</view>
				<view>智能家居</view>
				<view>智能家居</view>
				<view>智能家居</view>
				<view>智能家居</view>
				<view>智能家居</view>
				<view>智能家居</view>
				<view>智能家居</view>
				<view>智能家居</view>
				<view>智能家居</view>
				<view>智能家居</view>
				<view>智能家居</view>
				<view>智能家居</view>
			</scoll-view>
			<scoll-view class="right" scroll-y>
				<!-- 页面右边滚动栏 -->
				<view>智能家居</view>
				<view>智能家居</view>
				<view>智能家居</view>
				<view>智能家居</view>
				<view>智能家居</view>
				<view>智能家居</view>
				<view>智能家居</view>
				<view>智能家居</view>
				<view>智能家居</view>
				<view>智能家居</view>
				<view>智能家居</view>
				<view>智能家居</view>
				<view>智能家居</view>
				<view>智能家居</view>
				<view>智能家居</view>
			</scoll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shop_id: '',
				token: '30',
				shop_name: '',
				needytime: '',
				credit: '',
				logo: '',
				sale: '',
				threshold: '',
				goods: ''
			}
		},
		onLoad(index_data) {
			this.shop_id= index_data.id
			this.token = index_data.token
			uni.request({
				url: 'http://127.0.0.1:4523/m1/1437509-0-default/shop/getAllGoodsByName', //仅为示例，并非真实接口地址。
				method: "GET", //不设置，默认为get方式
				data: {
					shop_id: this.shop_id,
				},
				header: {
					token: this.token,
				},
				//登录时发送数据到数据库成功得到相应返回的数据
				success: (res) => {
					console.log(res),
					this.shop_name = res.data.name
					this.needytime = res.data.needytime
					this.credit = res.data.credit
					this.logo = res.data.logo
					this.sale = res.data.sale
					this.threshold = res.data.threshold
					this.goods = res.data.goods
					//res.后端定义的接口
				}
			});
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
		width: 100%;
	}

	.page_box {
		height: 100%;

		.head {
			height: 30%;
			width: 100%;
			display: block;

			image {
				margin-top: 20rpx;
				margin-left: 10rpx;
				height: 200rpx;
				width: 200rpx;
			}

			.shop_name {
				position: relative;
				left: 230rpx;
				top: -200rpx;
				word-break: keep-all;
				text-align: center;
				font-size: 50rpx;
			}

			.shop_score {
				position: relative;
				left: -50rpx;
				top: -100rpx;
				word-break: keep-all;
				text-align: center;
				font-size: 30rpx;
			}

			.shop_sale_number {
				position: relative;
				top: -100rpx;
				right: 20rpx;
				word-break: keep-all;
				text-align: center;
				font-size: 30rpx;
			}

			.shop_delivery_time {
				position: relative;
				top: -100rpx;
				left: 20rpx;
				word-break: keep-all;
				text-align: center;
				font-size: 30rpx;
			}
		}

		.tabbar {
			display: flex;
			position: relative;
			bottom: 30rpx;

			text {
				font-size: 40rpx;

			}
		}

		.down {
			height: 70%;
			display: flex;
			.left {
				width: 180rpx;

				view {
					width: 180rpx;
					line-height: 100rpx;
					margin-left: 10rpx;
					color: #333;
					text-align: justify;
					font-size: 35rpx;
					background-color: #f5f5f5;
				}
			}

			.right {
				
			}
		}


	}
</style>
