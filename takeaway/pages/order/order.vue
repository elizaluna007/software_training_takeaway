<template>
	<view>
		<div class="all_block" v-if="key">
			<div class="out_block" v-for="info in infos":key="info" @click="goto_detail(info)">
				<div class="first_line">
					<div style="display: flex;">
						<!-- <image src="info.logo_shop" mode="" class="img_style"></image> -->
						<img :src="info.logo_shop" mode="" class="img_style"></image>
						<p class="p_1">{{info.name_shop}}></p>
					</div>
					<p class="p_2">{{info.delivered}}</p>
				</div>
				<div class="line"></div>
				<div class="content">
				
					<div class="img_block1" v-for="info_good in info.goods":key="info_good">
						<div>
							<img :src="info_good.logo" style="width: 150rpx; height: 150rpx; " class="imgkiddingme">
							<p class="des">{{info_good.name}}</p>
						</div>
					</div>
				
					<div>
						<p class=order_time>下单时间{{info.paytime}}</p>
						<p class="total" style="position: relative; left: 500rpx; top: -41rpx">合计￥{{info.sumprice}}</p>
					</div>
					<button class="btn_style" size="mini" @click="restart()">再来一单</button>
				</div>
			</div>
		</div>
		<div v-if="key_not">
			<image class="grape" src="https://wx1.sinaimg.cn/mw2000/006Qjcu1gy1h561t2xpz2j30dw0dqtaf.jpg"></image>
			<p class="warning">您还没有登录，请登录后查看订单</p>
			<button class="login" @click="goto()">登录/注册</button>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				infos: '',
				key:false,
				key_not:true
			}
		},

		onLoad() {
			this.key=getApp().globalData.login_key;
			this.key_not=! this.key;
			uni.request({
				// url: 'http://127.0.0.1:4523/m1/1437509-0-default/order/getAllOrdersInfo',
				url: 'https://v3710z5658.oicp.vip/order/getAllOrdersInfo',
				method: 'GET',
				data: {

				},
				header: {
					token: getApp().globalData.token
				},
				success: (res) => {
					console.log("开始获取订单信息");
					this.infos = res.data;
					// console.log(res.data);
					console.log(res.data);
				}
			})
		},
		onShow() {
			this.key=getApp().globalData.login_key;
			this.key_not=! this.key;
			uni.request({
				// url: 'http://127.0.0.1:4523/m1/1437509-0-default/order/getAllOrdersInfo',
				url: 'https://v3710z5658.oicp.vip/order/getAllOrdersInfo',
				method: 'GET',
				data: {
		
				},
				header: {
					token: getApp().globalData.token
				},
				success: (res) => {
					console.log("开始获取订单信息");
					this.infos = res.data;
					// console.log(res.data);
					console.log(res.data);
				}
			})
		},
		methods: {
			restart()
			{
				// 返回商家页面
				uni.navigateTo({
					
				})
			},
			goto_detail(object){
				console.log("跳转到详细页面");
				uni.navigateTo({
					url:'/pages/order/order_detail?paytime='+ object.paytime
				})
			},
			goto(url) {
				uni.navigateTo({
					url: '/pages/login/login_username'
				})
			}
		}
	}
</script>
<style>
	.out_block {
		/* 		align-items: center; */
		/* 		vertical-align: center; */
		/* 		object-fit: fill; */
		margin: 20rpx;
		border-width: 100%;
		border: 3rpx solid #bbbbbb;
		box-shadow: #8f8f94;
		border-radius: 20rpx;
		box-shadow:
			5.7px 3.8px 5.3px rgba(0, 0, 0, 0.04),
			19px 12.7px 17.9px rgba(0, 0, 0, 0.024),
			85px 57px 80px rgba(0, 0, 0, 0.016);

	}

	.first_line {
		display: flex;
		height: 100rpx;
	}

	.img_style {
/* 		margin-left: -300rpx; */
		width: 80rpx;
		height: 80rpx;
		margin-left: 30rpx;
		margin-top: 10rpx;
		border-radius: 10rpx;
	}
	.p_1{
		font-weight: bolder;
		margin-left: 10rpx;
		margin-top: 15rpx;
	}

	.p_2 {
		color: #8f8f94;
		margin-top: 15rpx;
		position: absolute;left: 600rpx;
	}
	.line{
		background-color:#f4f5f5 ;
		width: 90%;
		height: 2rpx;
		margin: auto;
	}
	
	.content{
		
	            /* display: flex; */

	        justify-content: flex-start;
	}
	
	.img_block1{
		display: inline-table;
		size: 10px;
		width: 10px;
		margin-left: 10rpx;
	}
	
	.imgkiddingme{
	
	}

	
	.des{
		margin-left: 27rpx;
		color: #8f8f94;
		font-size: 17rpx;
	}
	
	
	
	.order_time{
		margin-left: 25rpx;
		color: #8f8f94;
		margin-top: 30rpx;
	}
	
	.total{
		color: #8f8f94;
		
		
	}
	
	.btn_style{
		margin-left: 470rpx;
		margin-bottom: 25rpx;
		border-radius: 15rpx;
		background-color: #fefa83;
		text-align: center;
		box-shadow: 4rpx 4rpx 2rpx 0rpx #8f8f94;
		
	}
	
	button::after {
		border: none;
	}
	.grape{
		width: 400rpx;
		height: 400rpx;
		position: relative;top: 230rpx;left: 200rpx;
	}
	.warning{
		position: relative;top: 230rpx;left: 150rpx;
	}
	.login{
		background-color: #fefa83; //按钮颜色
				border-radius: 20rpx; //按钮弧度
				width: 300rpx; //宽度
				box-shadow: 4rpx 4rpx 2rpx 2rpx #8f8f94;
				position: relative;top: 300rpx;left: 0rpx;
	}
</style>
