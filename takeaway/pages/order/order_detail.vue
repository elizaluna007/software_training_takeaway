<template>
	<!-- 顾客订单详情页 -->
	<view>
		<div class="all_block">
			<!-- 显示配送状态 -->
			<p class="title">{{infos.delivered}}></p>
			<div class="out_block1">
				<!-- 显示商家姓名 -->
				<div class="first_line" style="display: flex;">
					<p class="shopname">{{infos.name}}</p>
					<p class="symbol">></p>
				</div>
				<div class="line"></div>
				<!-- 显示订单具体信息，包括菜名，数量和价格 -->
				<div class=content v-for="good in infos.goods">
					<div class="img_block1">
						<div class="first_block">
							<div class="second_line" style="display: flex;">
								<img :src="good.logo" class="img_style"></image>
								<p class="cost">￥{{good.price}}</p>
								<div style="margin-left: 20rpx;">
									<p class="foodname">{{good.item_name}}</p>
									<p class="des1">{{good.description}}</p>
									<p class="des2">x{{good.count}}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 显示订单配送费，总价 -->
				<div class="line"></div>
				<div class="sencond_line" style="display: flex;">
					<p class="fee1">用户配送费</p>
					<p class="fee2">￥{{infos.deliverprice}}</p>
				</div>
				<div class="line"></div>
				<div class="third_line" style="display: flex;">
					<p class="total1">合计</p>
					<p class="total2">￥{{infos.sumprice}}</p>
				</div>
				<div class="line"></div>
				<div class="btn_block" style="display: flex;">
					<button class="left_btn" size="mini">联系商家</button>
					<button class="right_btn" size="mini">致电商家</button>
				</div>
			</div>
		</div>
		<!-- 显示订单期望时间，配送地址，配送服务 -->
		<div class="out_block2">
			<p class="title2">配送信息</p>
			<div class="line"></div>
			<div style="display: flex;">
				<p class="expected_time1">期望时间</p>
				<p class="expected_time2">{{infos.customer_info.expect_time}}</p>
			</div>
			<div style="display: flex;">
				<p class="address1">配送地址</p>
				<p class="address2">默认地址</p>
			</div>

			<div style="display: flex;">
				<p class="service1">配送服务</p>
				<p class="service2">无接触安心送|商家配送</p>
			</div>
		</div>



	</view>

</template>

<script>
	export default {
		data() {
			return {
				infos: '', //接受后端接口/order/getOneOrderInfo发送的请求
				paytime: '' //支付时间，来源与上个界面(order)向后端发送
			}
		},
		//初始化界面时向/order/getOneOrderInfo接口发送请求，获得信息
		onLoad: function(option) {
			this.paytime = option.paytime;
			console.log("开始打印得到的时间");
			console.log(option);
			console.log(this.paytime);
			uni.request({
				// url: 'http://127.0.0.1:4523/m1/1437509-0-default/order/getAllOrdersInfo',
				//url: 'https://5t764096g4.goho.co/order/getOneOrderInfo',//kx
				url: getApp().globalData.order_getOneOrderInfo, //wj
				method: 'GET',
				data: {
					// timestamp:"2022-08-15 11:04:05",
					timestamp: this.paytime
				},
				header: {
					token: getApp().globalData.token
				},
				success: (res) => {
					console.log(res.data);
					console.log("开始获取订单具体信息");
					this.infos = res.data;
					// console.log(res.data);
				}
			})
		},
		methods: {
			//页面下拉刷新后，1.5秒后停止显示下拉刷新图标
			onPullDownRefresh() {
				console.log('refresh');
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 1500);
			}

		}
	}
</script>

<style>
	.out_block1 {
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

	.out_block2 {
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

	.title {
		font-size: 50rpx;
		margin-top: 30rpx;
		margin-left: 20rpx;
		font-weight: 600;
	}

	.img_style {
		width: 210rpx;
		height: 180rpx;
		margin-left: 10rpx;
		border-radius: 15rpx;
		margin-top: 15rpx;
	}

	.shopname {
		margin-top: 15rpx;
		margin-left: 15rpx;
		font-size: 35rpx;
		font-weight: 600;
	}

	.symbol {
		position: absolute;
		left: 650rpx;
		color: #bbbbbb;
		margin-top: 15rpx;
	}

	.line {
		background-color: #bbbbbb;
		width: 96%;
		height: 2rpx;
		margin: auto;

		margin-top: 15rpx;
	}

	.foodname {
		margin-top: 25rpx;
		width: 300rpx;
		overflow: hidden;
		/* break-all(允许在单词内换行。) */
		word-break: break-all;
		/* 超出部分省略号 */
		text-overflow: ellipsis;
		/* 对象作为伸缩盒子模型显示 */
		display: -webkit-box;
		/* 设置或检索伸缩盒对象的子元素的排列方式 */
		-webkit-box-orient: vertical;
		/* 显示的行数 */
		-webkit-line-clamp: 1;
	}

	.des1 {
		color: #8f8f94;
		margin-top: 15rpx;
		
		width: 300rpx;
		overflow: hidden;
		/* break-all(允许在单词内换行。) */
		word-break: break-all;
		/* 超出部分省略号 */
		text-overflow: ellipsis;
		/* 对象作为伸缩盒子模型显示 */
		display: -webkit-box;
		/* 设置或检索伸缩盒对象的子元素的排列方式 */
		-webkit-box-orient: vertical;
		/* 显示的行数 */
		-webkit-line-clamp: 1;
	}

	.des2 {
		color: #8f8f94;
		margin-top: 15rpx;
		width: 300rpx;
		
		overflow: hidden;
		/* break-all(允许在单词内换行。) */
		word-break: break-all;
		/* 超出部分省略号 */
		text-overflow: ellipsis;
		/* 对象作为伸缩盒子模型显示 */
		display: -webkit-box;
		/* 设置或检索伸缩盒对象的子元素的排列方式 */
		-webkit-box-orient: vertical;
		/* 显示的行数 */
		-webkit-line-clamp: 1;
	}

	.cost {
		position: absolute;
		left: 610rpx;
		margin-top: 25rpx;
		font-weight: 600;
	}

	.fee1 {
		margin-left: 15rpx;
		margin-top: 25rpx;
		margin-bottom: 15rpx;
	}

	.fee2 {
		position: absolute;
		left: 610rpx;
		margin-top: 25rpx;
		margin-bottom: 15rpx;
		font-weight: 600;
	}

	.total1 {
		margin-top: 25rpx;
		margin-bottom: 15rpx;
		margin-left: 400rpx;
		font-size: 35rpx;
		font-weight: 600;
	}

	.total2 {
		margin-top: 25rpx;
		margin-bottom: 15rpx;
		margin-left: 100rpx;
		font-size: 35rpx;
		font-weight: 600;
	}

	.left_btn {
		height: 70rpx;
		width: 400rpx;
		font-size: 30rpx;
		background-color: #f4f4f4;
	}

	.right_btn {
		height: 70rpx;
		width: 400rpx;
		font-size: 30rpx;
		background-color: #f4f4f4;
	}

	.title2 {
		font-size: 35rpx;
		margin-top: 20rpx;
		margin-left: 15rpx;
		font-weight: 600;
		margin-bottom: 20rpx;
	}

	.expected_time1 {
		margin-left: 15rpx;
		color: #8f8f94;
		margin-top: 15rpx;
		width: 200rpx;
	}

	.expected_time2 {
		margin-left: 320rpx;
		margin-top: 15rpx;
	}

	.address1 {
		margin-left: 15rpx;
		color: #8f8f94;
		margin-top: 15rpx;
		width: 200rpx;
	}

	.address2 {
		margin-left: 320rpx;
		margin-top: 15rpx;
	}

	.service1 {
		margin-left: 15rpx;
		color: #8f8f94;
		margin-top: 15rpx;
		width: 200rpx;
	}

	.service2 {
		margin-left: 120rpx;
		margin-top: 15rpx;
		margin-bottom: 15rpx;
	}

</style>
