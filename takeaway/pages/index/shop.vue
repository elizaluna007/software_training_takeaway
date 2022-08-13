<template>
	<view class="content">
		<view class="topic">
			<image class="logo" :src="logo"></image>
			<text class="shopName">商家名称：{{shop_name}}</text>
			<text class="topic_text" space="ensp">{{credit}}分   月售{{sale}}   配送约{{needytime}}</text>
		</view>

		<view class="tabbar">
			<!-- 页面上中部导航栏 -->
			<text>点菜</text>
			<text>评价</text>
			<text>商家</text>
		</view>
		<view>
			<view v-for="item,index in goods">
				{{index}} : {{item}}
				<text style="font-size: 20px;">序号：{{index}},</text>
			</view>
		</view>
		<view>look:{{shop_name}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '肯德基',
				token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NjAzOTA1NjguMTM5MDYyMiwiaWF0IjoxNjYwMzg3NTY4LjEzOTA2MjIsImlzcyI6IkJiYmFjayIsImRhdGEiOnsiYWNjb3VudCI6InJvb3QiLCJwYXNzd29yZCI6IjMzMzMiLCJ0aW1lc3RhbXAiOjE2NjAzODc1NjguMTM5MDYyMn19.HTdQdVwEgXKAWddnPreTM5fI90HmnEkZ0beGL9V7kBE',
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
			this.name = index_data.name
			this.token = index_data.token
			uni.request({
				url: 'http://127.0.0.1:4523/m1/1437509-0-default/shop/getAllGoodsByName', //仅为示例，并非真实接口地址。
				method: "GET", //不设置，默认为get方式
				data: {
					name: this.name,
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

<style>
	button::after {
		border: initial;
	}

	.topic {
		display: flex;

	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 10rpx;
		margin-left: 0rpx;
	}

	.shopName {
		display: flex;
		margin-top: 15rpx;
		font-size: 50rpx;
		margin-left: 20rpx;
	}

	.topic_text {
		display: flex;
		margin-top: 100rpx;
		font-size: 30rpx;
		margin-left: -320rpx;
	}

	.three_button {
		display: flex;
		flex-wrap: nowrap;
	}

	.order {
		height: 80rpx;
		width: 150rpx;
		font-size: 35rpx;
		margin-top: 20rpx;
		margin-left: 0rpx;
		background-color: #ffffff;
	}

	.command {
		height: 80rpx;
		width: 150rpx;
		font-size: 35rpx;
		margin-top: 20rpx;
		margin-left: -270rpx;
		background-color: #ffffff;
		border-radius: 100rpx;
	}

	.shop_inf {
		height: 80rpx;
		width: 170rpx;
		font-size: 35rpx;
		margin-top: 20rpx;
		margin-left: -240rpx;
		background-color: #ffffff;
		border-radius: 100rpx;
	}
	
</style>
