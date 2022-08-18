<template>
	<view class="content">
		<view class="order_page" @click="exit_shop_car">
			<view class="topic">
				<image class="logo" :src="logo"></image>
				<text class="shopName">{{name}}</text>
				<text class="topic_text" space="ensp">{{credit}}分 月售{{sale}} 配送约{{needytime}}分钟</text>
			</view>
			<view class="three_button">
				<button :class="active_tabBar===0?'active_order':'order'" @click="active_tabBar_Handle(0)">点菜</button>
				<button :class="active_tabBar===1?'active_command':'command'"
					@click="active_tabBar_Handle(1)">评价</button>
				<button :class="active_tabBar===2?'active_shop_inf':'shop_inf'"
					@click="active_tabBar_Handle(2)">商家</button>
			</view>

			<!-- 点菜 -->
			<view class="order_page_order" v-if="active_tabBar===0">
				<!-- 右侧滚动栏 -->
				<scroll-view class="dish_pos_right" scroll-y="true" @scroll="rightScroll" :scroll-into-view="active_id">
					<!-- 商品种类 -->
					<view class="right_box" v-for="(category,index1) in categories" :key="index1"
						:id="'category'+index1">
						<!-- 放置商品种类中具体商品 -->
						<view class="list_2" v-for="(goods,index2) in category.dishes" :key="index2">
							<!-- 图片 -->
							<img :src="goods.logo" class="img_style" mode='aspectFit' />
							<!-- 描述框 -->
							<div class="describe">
								<p class="p_1">{{goods.name}}</p>
								<p class="p_2">{{goods.description}}</p>
								<p class="p_3">销量:{{goods.sale}}</p>
								<p class="p_4">¥{{goods.price}}</p>
								<view class="add_sub">
									<view v-if="dish_number[index1][index2]" class="hide">
										<image :src="sub_icon" class="p_sub" @click="click_sub(index1,index2)"></image>
										<text class="number">{{dish_number[index1][index2]}}</text>
									</view>
									<image :src="add_icon" class="p_add" @click="click_add(index1,index2)"></image>

								</view>
							</div>

						</view>
					</view>
					<!-- 页面到底提示 -->
					<view class="bottom_hint">
						已经到底了！
					</view>
				</scroll-view>
				<!-- 左侧滚动栏 -->
				<scroll-view class="cate_pos_left" scroll-y="true">
					<!-- 卡片 -->
					<view :class="active===index?'active_list':'list'" v-for="(category,index) in categories"
						@click="leftClickHandle(index)">
						<!-- 描述框 -->
						<view :class="active===index?'active_p_5':'p_5'">{{category.category}}</view>
					</view>
				</scroll-view>
			</view>
			<!-- 评价 -->
			<view class="bottom_hint" v-else-if="active_tabBar===1">
				<div class="comment_all">
					<div class="logo_line">
						<img src="../../static/KFC.jpg" alt="" class="logo_style">
						<div class="des_logo_line">
							<p class="p_name">昵称</p>
							<p class="p_time">时间</p>
						</div>
					</div>
					<div>
						<img src="" alt="">
						<p></p>
					</div>
					<div>
						<textarea name="" id="" cols="30" rows="10">好吃好吃好吃</textarea>
						<img src="" alt="">
					</div>
				</div>
			</view>
			<!-- 商家 -->
			<view class="bottom_hint" v-else-if="active_tabBar===2">
				空空如也
			</view>
		</view>
		<!-- 购物车页面 -->
		<view class="shop_car_page" :hidden="hidden">
			<!-- top 背景条 -->
			<view class="shop_car_top"></view>
			<!-- 购物车清空 -->
			<view class="shop_car_clear" @click="shop_clear">清空购物车</view>
			<!-- 购物车物品项 -->
			<scroll-view class="shop_dish_pos_right" scroll-y="true">
				<!-- 商品种类 -->
				<view class="right_box" v-for="(category,index1) in categories" :key="index1" :id="'category'+index1">
					<!-- 放置商品种类中具体商品 -->
					<view class="list_2" v-for="(goods,index2) in category.dishes" :key="index2"
						v-if="dish_number[index1][index2]!=0">
						<!-- 图片 -->
						<img :src="goods.logo" class="img_style" mode='aspectFit' />
						<!-- 描述框 -->
						<div class="describe" style="display: table-column">
							<p class="p_1">{{goods.name}}</p>
							<p class="p_2">{{goods.description}}</p>
							<p class="p_3">销量:{{goods.sale}}</p>
							<p class="p_4">¥{{goods.price}}</p>
							<view class="add_sub">
								<view v-if="dish_number[index1][index2]" class="hide">
									<image :src="sub_icon" class="p_sub" @click="click_sub(index1,index2)"></image>
									<text class="number">{{dish_number[index1][index2]}}</text>
								</view>
								<image :src="add_icon" class="p_add" @click="click_add(index1,index2)"></image>

							</view>
						</div>

					</view>
				</view>
				<!-- 页面到底提示 -->
				<view class="bottom_hint">
					已经到底了！
				</view>
			</scroll-view>
		</view>

		<!-- 购物车底部黑框按钮 -->
		<view class="shop_car" @click="details">
			<text class="total_cost">¥{{sumprice}}</text>
			<text class="shipping_fees">预估另需配送费¥{{threshold}}</text>
		</view>
		<button class="pay" @click="goto_pay">去结算</button>
	</view>


</template>


<script>
	export default {
		//该页面所需要的定义的数据
		data() {
			return {
				name: '', //该商家的名称，有index界面传过来
				needytime: '', //配送时间
				credit: '', //评分
				logo: '', //商家图标
				sale: '', //销量
				threshold: '', //起送费
				categories: [], //菜单，所有商品的信息
				active: 0, //左侧滚动栏选中项的id
				active_id: '', //右侧与左侧对应所需的变量
				active_tabBar: 0, //标识中部点菜、评论、商家选中哪一个，0：点菜 1：评论 2：商家
				rightHeightList: [], //右侧滚动栏数据的高度数组
				hidden: 1, //用于在用户点击主页面时隐藏购物车界面
				add_icon: '/static/add.png', //加号按钮图片地址
				sub_icon: '/static/sub.png', //减号按钮图片地址
				dish_number: [], //这是一个二维数组，代表
				shop_Car: [], //购物车信息，confirmShoppingCart接口所需要的的信息
				leave_shop_Car: [],
				pay_code: '', //退出页面时从setAll_Item接口获取的状态码
				pay_msg: '', //退出页面时从setAll_Item接口获取的状态信息
				pay_item: [], //当前结算订单信息，从confirmShoppingCart接口获得，可能会用于订单界面，暂时无用
				sumprice: 0, //购物车总金额
			}
		},
		onUnload() {
			this.shop_transform();
		},
		onLoad(index_data) {
			this.name = index_data.name;
			console.log("名字");
			console.log(this.name);
			uni.request({

				url: 'https://v3710z5658.oicp.vip/shop/getAllGoodsByName', //仅为示例，并非真实接口地址。
				method: "GET", //不设置，默认为get方式
				data: {
					name: this.name,
				},
				header: {
					token: getApp().globalData.token,
				},
				//登录时发送数据到数据库成功得到相应返回的数据
				success: (res) => {
					console.log(res)
					this.name = res.data.name
					this.needytime = res.data.needytime
					this.credit = res.data.credit
					this.logo = res.data.logo
					this.sale = res.data.sale
					this.threshold = res.data.threshold
					this.categories = res.data.categories
					//尝试获取购物车历史记录
					uni.getStorage({
						key: 'shop_car_history' + this.name,
						//获取成功，直接拿到历史购物车数据
						success: (res) => {
							console.log("成功拿到商家：" + this.name + "的历史购物车数据");
							console.log("res.data:", res.data);
							this.dish_number = res.data.dish_number;
							this.sumprice = res.data.sumprice;
						},
						//获取失败，全部初始化为0
						fail: (res) => {
							//初始化 购物车中菜品数量 使用二维数组存储 : 第一维是种类，第二维是菜品
							for (let i = 0; i < this.categories.length; i++) {
								let now = [];
								for (let j = 0; j < this.categories[i].dishes.length; j++) {
									now.push(0);
								}
								this.dish_number.push(now);
							}
							console.log(this.dish_number)
						}
					});
				}
			});
		},
		onReady() {
			// 延迟2秒后再获取页面组件高度信息
			setTimeout(() => {
				this.getHeightList();
			}, 5000);
		},
		methods: {
			exit_shop_car() {
				this.hidden = 1
			},
			click_add(index1, index2) {
				let idx = index2;
				this.dish_number[index1].splice(index2, 1, this.dish_number[index1][idx] + 1)
				this.sumprice += this.categories[index1].dishes[index2].price
				console.log(this.dish_number)
			},
			click_sub(index1, index2) {
				let idx = index2;
				this.dish_number[index1].splice(index2, 1, this.dish_number[index1][idx] - 1)
				this.sumprice -= this.categories[index1].dishes[index2].price
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
						this.active = i //左侧选择第i个标签
					}
				}
			},
			details() {
				this.hidden = !this.hidden;
			},
			//用于退出商家页面时，将购物车历史记录存于本地缓存之中以及将当前购物车内容发给后端
			shop_transform() {
				console.log('数组', this.dish_number.length)
				if (this.dish_number.length != 0) //加此判断原因是：有可能 在本页onLoad函数的请求request还没响应时 就被用户退出页面，
				//从而执行onUnload函数 但是这时 this.dish_number 是一个空数组 ， 不能将其存于本地缓存，
				//否则下次加载时就会出错
				{
					// 将购物车历史记录存于本地缓存之中
					uni.setStorage({
						key: 'shop_car_history' + this.name,
						data: {
							dish_number: this.dish_number,
							sumprice: this.sumprice
						},
						success: (res) => {
							console.log('成功将商家：' + this.name + '的购物车历史记录存于本地缓存');
						}
					});
				}
				//将 this.dish_number 的数据解析成接口需求的格式,结果存放在 this.shop_Car 中
				for (let i = 0; i < this.categories.length; i++) {
					for (let j = 0; j < this.categories[i].dishes.length; j++) {
						if (this.dish_number[i][j] != 0) {
							let obj = {
								item_name: this.categories[i].dishes[j].name,
								count: this.dish_number[i][j]
							}
							this.shop_Car.push(obj);
							console.log(this.shop_Car)
						}
					}
				}
				//请求交换数据
				uni.request({
					url: 'https://v3710z5658.oicp.vip/buy/setAllitem', //仅为示例，并非真实接口地址。
					method: "POST", //不设置，默认为get方式
					data: {
						shop_name: this.name,
						dishes: this.shop_Car,
					},
					header: {
						token: getApp().globalData.token,
					},
					//登录时发送数据到数据库成功得到相应返回的数据
					success: (res) => {
						console.log(res)
						this.pay_code = res.data.code
						this.pay_msg = res.data.msg
					}
				});
			},
			//跳转到支付页面
			goto_pay() {
				//购物车数据处理及与后端交换数据
				for (let i = 0; i < this.categories.length; i++) {
					for (let j = 0; j < this.categories[i].dishes.length; j++) {
						if (this.dish_number[i][j] != 0) {
							let obj = {
								name: this.categories[i].dishes[j].name,
								count: this.dish_number[i][j],
								price: this.categories[i].dishes[j].price
							}
							this.shop_Car.push(obj);
							console.log(this.shop_Car)
						}
					}
				}
				//请求交换数据
				uni.request({
					url: 'https://v3710z5658.oicp.vip/buy/confirmShoppingCart', //仅为示例，并非真实接口地址。
					method: "POST", //不设置，默认为get方式
					data: {
						name: this.name,
						dishes: this.shop_Car,
					},
					header: {
						token: getApp().globalData.token,
					},
					//登录时发送数据到数据库成功得到相应返回的数据
					success: (res) => {
						console.log(res)
						// this.sumprice = res.data.sumprice//可以接受，但没必要
						this.pay_item = res.data.goods
					}
				});
				//实现跳转
				uni.navigateTo({
					url: '/pages/index/pay?name=' + this.name + '&shop_Car=' + encodeURIComponent(JSON.stringify(
						this.shop_Car))
				})

			},
			// 清空购物车事件
			shop_clear() {
				//dish_number全置为0，清空
				for (let i = 0; i < this.dish_number.length; i++) {
					for (let j = 0; j < this.dish_number[i].length; j++) {
						this.dish_number[i].splice(j, 1, 0) //数组中该元素置零
					}
				}
				this.sumprice = 0;
				console.log(this.dish_number)
			},
			////标识中部点菜、评论、商家选中哪一个的处理函数
			active_tabBar_Handle(index) {
				if (index == 0) {
					this.active_tabBar = 0;
				} else if (index == 1) {
					this.active_tabBar = 1;
				} else {
					this.active_tabBar = 2;
				}
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

		.order_page {
			height: 90%;

			.order_page_order {
				height: 85%;
			}
		}

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
			font-weight: 600;
		}

		.topic_text {
			display: flex;
			margin-top: 130rpx;
			font-size: 30rpx;
			position: absolute;
			left: 220rpx;
			color: #8f8f94;
		}

		.three_button {
			display: flex;
			flex-wrap: nowrap;
			width: 70%;
		}

		.order {
			height: 80rpx;
			width: 150rpx;
			font-size: 35rpx;
			margin-top: 20rpx;
			background-color: #ffffff;
		}

		.active_order {
			height: 80rpx;
			width: 150rpx;
			font-size: 35rpx;
			margin-top: 20rpx;
			background-color: #ffffff;
			border-bottom: 10rpx solid #fefa83;
		}

		.command {
			height: 80rpx;
			width: 150rpx;
			font-size: 35rpx;
			margin-top: 20rpx;
			background-color: #ffffff;
			border-radius: 100rpx;
		}

		.active_command {
			height: 80rpx;
			width: 150rpx;
			font-size: 35rpx;
			margin-top: 20rpx;
			background-color: #ffffff;
			border-bottom: 10rpx solid #fefa83;
		}

		.shop_inf {
			height: 80rpx;
			width: 170rpx;
			font-size: 35rpx;
			margin-top: 20rpx;
			background-color: #ffffff;
			border-radius: 100rpx;
		}

		.active_shop_inf {
			height: 80rpx;
			width: 170rpx;
			font-size: 35rpx;
			margin-top: 20rpx;
			background-color: #ffffff;
			border-bottom: 10rpx solid #fefa83;
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

			font-size: 35rpx;
			position: relative;
			left: 55rpx;
			top: -50rpx;
		}

		.list {
			align-items: center;
			height: 120rpx;
			width: 120rpx;
			margin-left: 10rpx;
			vertical-align: center;
			display: flex;
			object-fit: fill;
			background-color: #ffffff;
			border-width: 100%;
			border-top: 1rpx solid #f8f8f8;
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
			width: 123rpx;
			margin-left: 10rpx;
			vertical-align: center;
			display: flex;
			object-fit: fill;
			border: 1rpx solid #f8f8f8;
			box-shadow: #8f8f94;
			border-radius: 7%;
			box-shadow:
				5.7px 3.8px 5.3px rgba(0, 0, 0, 0.04),
				19px 12.7px 17.9px rgba(0, 0, 0, 0.024),
				85px 57px 80px rgba(0, 0, 0, 0.016);
			background-color: #fefa83;
		}



		.dish_pos_right {
			height: 90%;
			width: 70%;
			display: flex;
			margin-left: 200rpx;

			.right_box {
				display: block;
				//overflow: hidden;
				border-bottom: 50rpx solid #ffffff;
			}
		}

		.shop_dish_pos_right {
			height: 70%;
			width: 100%;
			display: flex;

			.right_box {
				display: block;
				overflow: hidden;
				// border-bottom: 50rpx solid #ffffff;
			}
		}

		.bottom_hint {
			text-align: center;
			margin-top: 100rpx;
			font-size: 30rpx;
			height: 300rpx;
		}

		.cate_pos_left {
			height: 70%;
			width: 20%;
			display: flex;
			position: absolute;
			top: 330rpx;
			//width: 150rpx;
			margin-left: 10rpx;
			background-color: #f8f8f8;
		}


		.list_2 {

			height: 250rpx;
			display: flex;
			margin-top: 20rpx;
			border-width: 100%;
			border: 3rpx solid #f8f8f8;
			box-shadow: #8f8f94;
			border-radius: 7%;
			box-shadow:
				5.7px 3.8px 5.3px rgba(0, 0, 0, 0.04),
				19px 12.7px 17.9px rgba(0, 0, 0, 0.024),
				85px 57px 80px rgba(0, 0, 0, 0.016);

		}

		.add_sub {
			position: absolute;
			left: 380rpx;
			margin-top: -35rpx;
		}

		.img_style {
			border-radius: 20%;
			height: 180rpx;
			width: 180rpx;
			position: relative;
			top: 20rpx;
		}


		p {
			// text-align: center;
			position: relative;
			left: 15rpx;
		}

		.p_1 {
			margin-top: 10rpx;
			font-size: 35rpx;
			width: 260rpx;
			// font-weight: 600;
			// display: table-column;


		}

		.p_2 {

			color: #ffb420;
			margin-top: 10rpx;
		}

		.p_3 {

			color: #8f96a0;
			margin-top: 10rpx;
		}

		.p_4 {

			color: #c83c23;
			margin-top: 10rpx;
		}

		.p_5 {
			text-align: center;
			width: 100%;
			height: 50rpx;
			font-size: 30rpx;
		}

		.active_p_5 {
			text-align: center;
			width: 100%;
			height: 50rpx;
			font-size: 30rpx;
		}

		//购物车页面
		.shop_car_page {
			background-color: #ffffff;
			border: 1rpx solid #dddddd;
			border-radius: 30rpx 30rpx 0rpx 0rpx;
			height: 70%;
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


	.img_style2 {
		width: 200rpx;
		height: 200rpx;
		margin-left: 30rpx;
	}
</style>
