<template>
	<view class="content">
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

		<scroll-view class="dish_pos" scroll-y="true" @scrolltolower="scrolltolowerHandle"
			@scrolltoupper="scrolltoupperHandle">
			<!-- 列表框 -->
			<el-col class="home-card">
				<!-- 卡片 -->

				<el-card class="list_2" v-for="(item,index) in categories[active].dishes">
					<!-- 图片 -->
					<img :src="item.logo" class="img_style" mode='aspectFit' />
					<!-- 描述框 -->
					<div class="describe">
						<p class="p_1">菜名:{{item.name}}</p>
						<p class="p_2">价格:{{item.price}}</p>
						<p class="p_3">销量:{{item.sale}}</p>
						<p class="p_4">描述:{{item.description}}</p>
						<view class="add_sub">
							<view v-if="dish_number[index]" class="hide">
								<image  :src="sub_icon" class="p_sub"
									@click="click_sub(index)"></image>
								<text class="number">{{dish_number[index]}}</text>
							</view>
							<image :src="add_icon" class="p_add" @click="click_add(index)"></image>

						</view>
					</div>
				</el-card>
			</el-col>
		</scroll-view>
		<scroll-view class="cate_pos" scroll-y="true">
			<!-- 列表框 -->
			<el-col class="home-card">
				<!-- 卡片 -->
				<view :class="active===index?'active_list':'list'" v-for="(category,index) in categories"
					@click="leftClickHandle(index)">
					<!-- 描述框 -->
					<p :class="active===index?'active_p_5':'p_5'">{{category.category}}</p>
				</view>
			</el-col>
		</scroll-view>
		<view class="shop_car" @click="details">
			<text class="total_cost">¥250</text>
			<text class="shipping_fees">预估另需配送费¥5</text>
		</view>
		<button class="pay" @click="goto_pay">去结算</button>
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
				add_icon: '/static/add.png',
				sub_icon: '/static/sub.png',
				dish_number: [],
				categories: '',
				active: 0,
				shop_Car:[],
				pay_code:'',
				pay_msg:''
			}
		},
		onUnload(){
			for (let i = 0 , k = 0; i < this.categories.length; i++) {
				for (let j = 0; j < this.categories[i].dishes.length; j++,k++) {
					let obj = {
							item_name: this.categories[i].dishes[j].name,
							count:this.dish_number[k]
						}
					this.shop_Car.push(obj);
					console.log(this.shop_Car)
				}
			}
			uni.request({
				url: 'http://127.0.0.1:4523/m1/1437509-0-default/buy/addItemByName', //仅为示例，并非真实接口地址。
				method: "POST", //不设置，默认为get方式
				data: {
					name: this.name,
					dishes: this.shop_Car,
				},
				header: {
					token: this.token,
				},
				//登录时发送数据到数据库成功得到相应返回的数据
				success: (res) => {
					console.log(res)
					this.pay_code = res.data.code
					this.pay_msg = res.data.msg
				}
			});
		},
		onLoad(index_data) {
			// this.name = index_data.name
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
					console.log(res)
					this.shop_name = res.data.name
					this.needytime = res.data.needytime
					this.credit = res.data.credit
					this.logo = res.data.logo
					this.sale = res.data.sale
					this.threshold = res.data.threshold
					this.categories = res.data.categories
					console.log(this.categories)
					for (let i = 0; i < this.categories.length; i++) {
						for (let j = 0; j < this.categories[i].dishes.length; j++) {
							this.dish_number.push(0);
						}
					}
					console.log(this.dish_number)
					//res.后端定义的接口
				}
			});
		},
		methods: {
			click_add(index) {
				let idx = index;
				this.dish_number.splice(index, 1, this.dish_number[idx] + 1)
				console.log(this.dish_number)
			},
			click_sub(index) {
				let idx = index;
				this.dish_number.splice(index, 1, this.dish_number[idx] - 1)
				console.log(this.dish_number)
			},

			leftClickHandle(index) {
				this.active = index;
			},
			scrolltolowerHandle() {
				this.active = this.active + 1;
			},
			scrolltoupperHandle() {
				if (this.active > 0) {
					this.active = this.active - 1;
				}

			},
			details() {
			
			},
			goto_pay() {
				for (let i = 0 , k = 0; i < this.categories.length; i++) {
					for (let j = 0; j < this.categories[i].dishes.length; j++,k++) {
						let obj = {
								item_name: this.categories[i].dishes[j].name,
								count:this.dish_number[k]
							}
						this.shop_Car.push(obj);
						console.log(this.shop_Car)
					}
				}
				uni.request({
					url: 'http://127.0.0.1:4523/m1/1437509-0-default/buy/addItemByName', //仅为示例，并非真实接口地址。
					method: "POST", //不设置，默认为get方式
					data: {
						name: this.name,
						dishes: this.shop_Car,
					},
					header: {
						token: this.token,
					},
					//登录时发送数据到数据库成功得到相应返回的数据
					success: (res) => {
						console.log(res)
						this.pay_code = res.data.code
						this.pay_msg = res.data.msg
					}
				});
				
				uni.navigateTo({
					url: '/pages/index/pay'
				})
				
			}

		}
	}
</script>

<style lang="less">
	page {
		height: 100%;
	}

	.content {
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
			margin-left: -380rpx;
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

		.add_sub {
			position: relative;
			left: 200rpx;
		}

		.p_add {
			position: absolute;
			height: 40rpx;
			width: 40rpx;
			left: 80rpx;
		}

		.hide {
			position: absolute;
			left: -20rpx;
		}

		.p_sub {

			height: 40rpx;
			width: 40rpx;
			left: 0rpx;
		}

		.number {
			position: relative;
			font-size: 40rpx;
			left: 10rpx;
			top: -5rpx;
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

		.active_list {
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

		.dish_pos {
			height: 70%;
			width: 70%;
			display: flex;
			margin-left: 200rpx;
		}

		.cate_pos {
			height: 70%;
			width: 20%;
			display: flex;
			position: absolute;
			top: 330rpx;
			//width: 150rpx;
			margin-left: 10rpx;
		}

		.img_style {
			height: 150rpx;
			width: 150rpx;
		}

		p {
			text-align: center;
		}

		.p_1 {
			position: relative;
			font-size: 35rpx;
			margin-top: 10rpx;
			margin-left: 10rpx;
		}

		.p_2 {
			position: relative;
			font-size: 30rpx;
			color: #ffb420;

		}

		.p_3 {
			position: relative;
			font-size: 30rpx;
			color: #8f96a0;
		}

		.p_4 {
			position: relative;
			font-size: 30rpx;
			color: #8f96a0;
			margin-left: 20rpx;
		}

		.p_5 {
			height: 50rpx;
			margin-top: 0rpx;
			font-size: 30rpx;
		}

		.active_p_5 {
			height: 50rpx;
			margin-left: 20rpx;
			font-size: 30rpx;
		}

		.shop_car {
			position: absolute;
			margin-bottom: 20rpx;
			margin-left: 35rpx;
			background-color: #000000;
			height: 80rpx;
			width: 680rpx;
			border-radius: 50rpx;
		}

		.total_cost {
			position: absolute;
			font-size: 40rpx;
			margin-left: 50rpx;
			margin-top: 10rpx;
			color: #f8f8f8;
		}

		.shipping_fees {
			position: absolute;
			font-size: 25rpx;
			margin-left: 200rpx;
			margin-top: 22rpx;
			color: #f8f8f8;
		}

		.pay {
			position: absolute;
			text-align: center;
			font-size: 35rpx;
			margin-left: 540rpx;
			margin-top: 0rpx;
			height: 80rpx;
			width: 180rpx;
			border-radius: 50rpx;
			background-color: #f9d60f;
		}
	}
</style>
