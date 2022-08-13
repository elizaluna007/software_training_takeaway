<template>
	<view class="content">
		<view class="topic">
			<image class="logo" :src="logo"></image>
			<text class="shopName">商家名称：{{shop_name}}</text>
			<text class="topic_text" space="ensp">{{credit}}分   月售{{sale}}   配送约{{needytime}}</text>
		</view>
		<view class="three_button">
			<button class="order">点菜</button>
			<button class="command">评价</button>
			<button class="shop_inf">商家</button>
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

<style>
	button::after{border: initial;}
	
	.topic{
		display: flex;

	}
	
	.logo {
		height: 150rpx;
		width: 150rpx;
		margin-top: 10rpx;
		margin-left: 10rpx;
	}

	.shopName {
		display: flex;
		margin-top: 15rpx;
		font-size: 50rpx;
		margin-left: 20rpx;
	}
	
	.topic_text{
		display: flex;
		margin-top: 100rpx;
		font-size: 30rpx;
		margin-left: -320rpx;
	}
	
	.three_button{
		display: flex;
		flex-wrap: nowrap;
	}
	
	.order{
		height: 80rpx;
		width: 150rpx;
		font-size: 35rpx;
		margin-top: 20rpx;
		margin-left: 0rpx;
		background-color: #ffffff;
	}
	
	.command{
		height: 80rpx;
		width: 150rpx;
		font-size: 35rpx;
		margin-top: 20rpx;
		margin-left: -270rpx;
		background-color: #ffffff;
		border-radius: 100rpx;
	}
	
	.shop_inf{
		height: 80rpx;
		width: 150rpx;
		font-size: 35rpx;
		margin-top: 20rpx;
		margin-left: -260rpx;
		background-color: #ffffff;
		border-radius: 100rpx;
	}
	
</style>
