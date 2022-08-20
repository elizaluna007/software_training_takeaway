<template>
	<view>
		<image src="https://wx1.sinaimg.cn/mw2000/006Qjcu1gy1h59mwo17rlj30ay0ay0un.jpg" mode="" class="pay"></image>
		<!-- BUG：1，如果用户支付后并未点击此按钮，而是退出,此时购物车历史记录不会清空 -->
		<button class="btn_style" @click="_pay">我已支付，点击前往订单页面</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				name:'',
				dishes:'',
				pay_item:'',
			}
		},
		onLoad(shop_data) {
			this.name = shop_data.name;
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
			_pay(){
				//请求交换数据
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
						// this.sumprice = res.data.sumprice//可以接受，但没必要
						this.pay_item = res.data.goods
					}
				});
				uni.switchTab({
					url: '/pages/order/order',
					success:(res)=> {
						getApp().globalData.pre_return_from_shop = this.name;
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
