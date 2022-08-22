<template>
	<view>
		<image src="../static2/qrcode.jpg" mode="" class="pay"></image>
		<!-- 点击按钮，触发_pay()函数 -->
		<button class="btn_style" @click="_pay">我已支付，点击前往订单页面</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '', //商家名，由上个页面得到
				dishes: '', //点餐数 二维数组，每一项包括菜名，单价，总数
				pay_item: '', //接口/buy/confirmShoppingCart返回信息
				address: '', //判断用户是否有地址
			}
		},
		onLoad(shop_data) {
			this.name = shop_data.name;
			//页面间传递数组
			this.dishes = JSON.parse(decodeURIComponent(shop_data.shop_Car))
			console.log("看看我")
			console.log(this.dishes)
		},
		methods: {
			//页面下拉刷新后，1.5秒后停止显示下拉刷新图标
			onPullDownRefresh() {
				console.log('refresh');
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 1500);
			},
			_pay() {
				//向/customer/getCustomerInfo接口请求交换数据
				uni.request({
					method: "GET",
					url: getApp().globalData.customer_getCustomerInfo,
					data: {},
					header: {
						token: getApp().globalData.token
					},
					success: (res) => {
						this.address = res.data.address;
						console.log("开始打印个人地址");
						console.log(this.address);

						//如果有地址，则正常支付
						if (this.address) {
							//向/buy/confirmShoppingCart接口请求交换数据
							uni.request({
								url: getApp().globalData.buy_confirmShoppingCart, //仅为示例，并非真实接口地址。
								method: "POST", //不设置，默认为get方式
								data: {
									name: this.name,
									dishes: this.dishes,
								},
								header: {
									token: getApp().globalData.token,
								},
								//登录时发送数据到数据库成功得到相应返回的数据
								success: (res) => {
									console.log(res)
									console.log("结算成功！！！")
									this.pay_item = res.data
								}
							});
							//支付后跳转回订单页
							uni.switchTab({
								url: '/pages/order/order',
								success: (res) => {
									getApp().globalData.pre_return_from_shop = this.name;
								}
							})
						} else {
							//若用户未设置地址，则提醒其设置地址
							uni.showToast({
								title: "未设置地址",
								icon: 'error',
								duration: 850
							})
						}
					}
				})

			},
		}
	}
</script>

<style>
	.pay {
		width: 600rpx;
		height: 600rpx;
		position: relative;
		left: 80rpx;
		top: 100rpx;
	}

	.btn_style {
		background-color: #fefa83;
		border-radius: 20rpx;
		width: 600rpx;
		box-shadow: 4rpx 4rpx 2rpx 2rpx #8f8f94;
		margin-top: 200rpx;
	}
</style>
