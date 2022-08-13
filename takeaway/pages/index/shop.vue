<template>
	<view class="content" >
		<view class="topic">
			<image class="logo" :src="logo"></image>
			<text class="shopName">商家名称：{{shop_name}}</text>
			<text class="topic_text" space="ensp">{{credit}}分 月售{{sale}} 配送约{{needytime}}分钟</text>
		</view>
		<view class="three_button">
			<button class="order">点菜</button>
			<button class="command">评价</button>
			<button class="shop_inf">商家</button>
		</view>

		<scroll-view class="dish_pos" scroll-y="true">
			<!-- 列表框 -->
			<el-col class="home-card">
				<!-- 卡片 -->
				<el-card class="list_2" v-for="good in goods" :key="good">
					<!-- 图片 -->
					<img :src="good.logo" class="img_style" mode='aspectFit'/>
					<!-- 描述框 -->
					<div class="describe">
						<p class="p_1">菜名:{{good.name}}</p>
						<p class="p_2">价格:{{good.price}}</p>
						<p class="p_3">销量:{{good.sale}}</p>
						<p class="p_4">描述:{{good.description}}</p>
					</div>
				</el-card>			
				
			</el-col>
		</scroll-view>
		<scroll-view class="cate_pos" scroll-y="true">
			<!-- 列表框 -->
			<el-col class="home-card">
				<!-- 卡片 -->
				 <el-card class="list" v-for="good in goods" :key="good">
					<!-- 描述框 --> 
					<div class="describe">
						<p class="p_5">菜名</p>
					</div>
				</el-card> 
				
			</el-col>
		</scroll-view>
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
				url: 'https://mock.apifox.cn/m1/1437509-0-default/shop/getAllGoodsByName', //仅为示例，并非真实接口地址。
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

<style lang="less">
	page{
		height: 100%;
	}
.content{
	height: 100%;	
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
	
	.list {
		align-items: center;
		height: 120rpx;
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
	
	.list_2 {
		align-items: center;
		height: 250rpx;
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
	
 // 	.home-card{
	// 	height: 200rpx;
	// } 
	
	.dish_pos{
		height:100%;
		width: 70%;
		display: flex;
		margin-left: 200rpx;
	}
	
	.cate_pos{
		height:100%;
		width: 20%;
		display: flex;
		position: absolute;
		top: 330rpx;
		//width: 150rpx;
		margin-left: 10rpx;
	}
	
	.img_style{
		height: 150rpx;
		width: 150rpx;
	}
	
	p {
		text-align: center;
	}
	
	.p_1 {
		margin-top: 0rpx;
		font-size: 35rpx;
	}
	
	.p_2 {
		font-size: 30rpx;
		color: #ffb420;
		margin-left: -230rpx;
	}
	
	.p_3 {
		font-size: 30rpx;
		color: #8f96a0;
		margin-left: -230rpx;
	}
	
	.p_4{
		font-size: 30rpx;
		color: #8f96a0;
		margin-left: 20rpx;
	}
	.p_5 {
		height: 50rpx;
		margin-top: 0rpx;
		font-size: 30rpx;
	}
}
</style>
