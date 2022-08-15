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
		<!-- 右侧滚动栏 -->
		<scroll-view class="dish_pos_right" scroll-y="true" @scroll="rightScroll" :scroll-into-view="active_id">
			<!-- 商品种类 -->
			<view class="right_box" v-for="(category,index) in categories" :key="index" :id="'category'+index">
				<!-- 放置商品种类中具体商品 -->
				<view class="list_2" v-for="(goods,index) in category.dishes" :key="index">
					<!-- 图片 -->
					<img :src="goods.logo" class="img_style" mode='aspectFit' />
					<!-- 描述框 -->
					<div class="describe">
						<p class="p_1">菜名:{{goods.name}}</p>
						<p class="p_2">价格:{{goods.price}}</p>
						<p class="p_3">销量:{{goods.sale}}</p>
						<p class="p_4">描述:{{goods.description}}</p>
						<view>
							<view v-if="dish_number[index]">
								<image :src="add" class="p_add" @click="click_sub(index)">{{dish_number[index]}}</image>
							</view>
							<image :src="add" class="p_sub" @click="click_add(index)"></image>
						</view>
					</div>
				</view>
			</view>
		</scroll-view>
		<!-- 左侧滚动栏 -->
		<scroll-view class="cate_pos_left" scroll-y="true">
			<!-- 卡片 -->
			<view :class="active===index?'active_list':'list'" v-for="(category,index) in categories"
				@click="leftClickHandle(index)">
				<!-- 描述框 -->
				<p :class="active===index?'active_p_5':'p_5'">{{category.category}}</p>
			</view>
		</scroll-view>

		<!-- 购物车页面 -->
		<view class="shop_car_page" :hidden="hidden">
			<!-- top 背景条 -->
			<view class="shop_car_top"></view>
			<!-- 购物车清空 -->
			<view class="shop_car_clear">清空购物车</view>
			<!-- 购物车物品项 -->
			<scroll-view class="shop_car_item" scroll-y="true">
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
							<view>
								<view v-if="dish_number[index]">
									<image :src="add" class="p_add" @click="click_sub(index)">{{dish_number[index]}}
									</image>
								</view>
								<image :src="add" class="p_sub" @click="click_add(index)"></image>
							</view>
						</div>
					</el-card>

				</el-col>
			</scroll-view>
		</view>

		<!-- 购物车底部黑框按钮 -->
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
				add: '/static/logo.png',
				dish_number: [0, 0, 0, 0, 0, 0],
				categories: '',
				active: 0,
				active_id: '',
				rightHeightList: [], //右侧滚动栏数据的高度数组
				hidden: 1
			}
		},
		onLoad(index_data) {
			// this.name = index_data.name
			// this.token = index_data.token
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
					console.log(res)
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
		onReady(){
			// 延迟2秒后再获取页面组件高度信息
			setTimeout(() => { 
				this.getHeightList();			
			}, 5000);
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
				this.active_id = 'category' + index;
			},
			//得到右侧数据的高度数组 rightHeightList
			getHeightList() {
				let that = this;
				let selectorQuery = uni.createSelectorQuery().in(this);
				selectorQuery.selectAll('.right_box').boundingClientRect(function(rects) {
					let arr = [0];
					let top = 0;
					rects.forEach(function(rect) {
						top += rect.height;
						arr.push(top);
					});
					that.rightHeightList = arr; //主要是它
					console.log(that.rightHeightList);
				}).exec()
			},
			//右侧滚动栏滑动监听
			rightScroll(e) {
				let scrollTop = e.detail.scrollTop;
				for (let i = 0; i < this.rightHeightList.length; i++) {
					let h1 = this.rightHeightList[i]
					let h2 = this.rightHeightList[i + 1]
					//当右侧滑动到两个分类之间时改变左侧标签
					if (scrollTop >= h1 && scrollTop < h2) {
						this.active = i  //左侧选择第i个标签
					}
				}
			},
			scrolltolowerHandle() {
				if (this.active <= this.categories.length) {
					this.active = this.active + 1;
				}
			},
			scrolltoupperHandle() {
				if (this.active > 0) {
					this.active = this.active - 1;
				}

			},
			details() {
				this.hidden = !this.hidden;
			},
			goto_pay() {
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


		.p_add {
			font-size: 30rpx;
			height: 50rpx;
			width: 50rpx;
			margin-top: -50rpx;
			margin-left: 0rpx;
		}

		.p_sub {
			font-size: 30rpx;
			height: 50rpx;
			width: 50rpx;
			margin-top: -50rpx;
			margin-left: 60rpx;
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


		.dish_pos_right {
			height: 70%;
			width: 70%;
			display: flex;
			margin-left: 200rpx;
			.right_box{
				display: block;
				//overflow: hidden;
				border-bottom: 50rpx solid #ffffff;
			}
		}

		.cate_pos_left {
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

		.p_4 {
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

		//购物车页面
		.shop_car_page {
			background-color: #ffffff;
			border: 1rpx solid #dddddd;
			border-radius: 30rpx 30rpx 0rpx 0rpx;
			height: 50%;
			width: 100%;
			position: absolute;
			bottom: 0rpx;

			.shop_car_top {
				background-color: #fefa83;
				border-radius: 30rpx 30rpx 0rpx 0rpx;
				height: 60rpx;

			}

			.shop_car_clear {
				background-color: #ffffff;
				border-bottom: 0.5rpx solid #8f8f94;
				height: 80rpx;
				text-align: center;
				line-height: 80rpx;
			}

			.shop_car_item {
				height: 50%;

				view {
					height: 100rpx;
					width: 100%;
				}
			}
		}

		//底部购物车按钮黑框样式
		.shop_car {
			position: absolute;
			bottom: 40rpx;
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
			bottom: 40rpx;
			text-align: center;
			font-size: 35rpx;
			margin-left: 540rpx;
			margin-bottom: 20rpx;
			height: 80rpx;
			width: 180rpx;
			border-radius: 50rpx;
			background-color: #f9d60f;
		}
	}
</style>
