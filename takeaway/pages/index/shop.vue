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

		<scroll-view class="dish_pos" scroll-y="true" @scrolltolower="scrolltolowerHandle" @scrolltoupper="scrolltoupperHandle">
			<!-- 列表框 -->
			<el-col class="home-card">
				<!-- 卡片 -->
				<el-card class="list_2" v-for="(item,index) in categories[active].dishes"  >
					<!-- 图片 -->
					<img :src="item.logo" class="img_style" mode='aspectFit'/>
					<!-- 描述框 -->
					<div class="describe">
						<p class="p_1">菜名:{{item.name}}</p>
						<p class="p_2">价格:{{item.price}}</p>
						<p class="p_3">销量:{{item.sale}}</p>
						<p class="p_4">描述:{{item.description}}</p>
					</div>
				</el-card>			
				
			</el-col>
		</scroll-view>
		<scroll-view class="cate_pos" scroll-y="true">
			<!-- 列表框 -->
			<el-col class="home-card">
				<!-- 卡片 -->
				 <view :class="active===index?'active_list':'list'" v-for="(category,index) in categories" @click="leftClickHandle(index)" >
					<!-- 描述框 --> 
						<p :class="active===index?'active_p_5':'p_5'">{{category.category}}</p>
						
				</view> 
				
			</el-col>
		</scroll-view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				name: '肯德基',
				token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjMuMDAwMTExMTEyNzcxNTYwNGUrMTgsImlhdCI6MTY2MDQ0OTA5OS4wNTExNzkyLCJpc3MiOiJCYmJhY2siLCJkYXRhIjp7ImFjY291bnQiOiJyb290IiwicGFzc3dvcmQiOiIzMzEzIiwidGltZXN0YW1wIjoxNjYwNDQ5MDk5LjA1MTE3OTJ9fQ.GH4apj-ZTNSyI103pvnAKpD2E5GjWzWzDwAB3R5iAUg',
				shop_name: '',
				needytime: '',
				credit: '',
				logo: '',
				sale: '',
				threshold: '',
				categories: '',
				active:0
			}
		},
		onLoad(index_data) {
			// this.name = index_data.name
			// this.token = index_data.token
			uni.request({
				url: 'https://5t764096g4.goho.co/shop/getAllGoodsByName', //仅为示例，并非真实接口地址。
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
					this.categories = res.data.categories
					
					//res.后端定义的接口
				}
			});
		},
		methods: {
			leftClickHandle(index){
				this.active=index;
			},
			scrolltolowerHandle(){
				this.active = this.active+1;
			},
			scrolltoupperHandle(){
				if(this.active > 0){
					this.active = this.active-1;
					}
			}
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
	.active_list{
		align-items: center;
		height: 120rpx;
		width: 115rpx;
		vertical-align: center;
		display: flex;
		object-fit: fill;
		margin: 20rpx;
		border: 3rpx solid #f8f8f8;
		box-shadow: #8f8f94;
		border-radius: 7%;
		box-shadow:
			5.7px 3.8px 5.3px rgba(0, 0, 0, 0.04),
			19px 12.7px 17.9px rgba(0, 0, 0, 0.024),
			85px 57px 80px rgba(0, 0, 0, 0.016);
		background-color: antiquewhite;
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
		height:70%;
		width: 70%;
		display: flex;
		margin-left: 200rpx;
	}
	
	.cate_pos{
		height:70%;
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
	.active_p_5{
		height: 50rpx;
		margin-left: 20rpx;
		font-size: 30rpx;
	}
}
</style>
