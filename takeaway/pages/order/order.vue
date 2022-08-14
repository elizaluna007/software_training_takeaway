<template>
	<view>
		<div class="all_block">
			<div class="out_block">
				<div class="first_line">
					<div style="display: flex;">
						<image src="/static/me.png" mode="" class="img_style"></image>
						<p class="p_1">名称></p>
					</div>
					<p class="p_2">已完成</p>
				</div>
				<div class="line"></div>
				<div class="content">
					<div class="img_block1">
						<div>
							<image src="../../static/home_on.png" style="width: 180rpx; height: 180rpx; "></image>
							<p class="des">图片名称</p>
						
					</div>
					<div class="img_block2">
						<div>
							<image src="../../static/home_on.png" style="width: 180rpx; height: 180rpx;  "></image>
							<p class="des">图片名称2</p>
						
						</div>
						
					</div>	
				</div>
				<div>	
					<p class=order_time>下单时间</p>
					<p class="total" style="position: relative; left: 500rpx; top: -41rpx">合计</p>
				</div>	
					<button class="btn_style" size="mini">再来一单</button>
				</div>
			</div>
		<div class="out_block">
			<div class="first_line">
				<div style="display: flex;">
					<image src="/static/me.png" mode="" class="img_style"></image>
					<p class="p_1">名称></p>
				</div>
				<p class="p_2">已完成</p>
			</div>
			<div class="line"></div>
			<div class="content">
				<div class="img_block1">
					<div>
						<image src="../../static/home_on.png" style="width: 180rpx; height: 180rpx; "></image>
						<p class="des">图片名称</p>
					
				</div>
				<div class="img_block2">
					<div>
						<image src="../../static/home_on.png" style="width: 180rpx; height: 180rpx;  "></image>
						<p class="des">图片名称2</p>
					
					</div>
					
				</div>	
			</div>
			<div>	
				<p class=order_time>下单时间</p>
				<p class="total" style="position: relative; left: 500rpx; top: -41rpx">合计</p>
			</div>	
				<button class="btn_style" size="mini">再来一单</button>
			</div>
		</div>
		</div>
		<!-- <div class="all_block" v-for="info in infos">
			<div class="out_block">
				<div class="first_line">
					<div style="display: flex;">
						<image src="info.logo" mode="" class="img_style">头像</image>
						<p class="p_1">名称</p>
					</div>
					<p class="p_2">已完成</p>
				</div>
				<div class="line"></div>
				<div class="content">
					<div class="img_block">
						<div>
							<image>图片</image>
							<p class="des">图片名称</p>
						</div>
						<div class="img_block">
							<image>图片</image>
							<p class="des"></p>
						</div>
					</div>
					<p>下单时间</p>
					<p>合计</p>
					<button class="btn_style">再来一单</button>
				</div>
			</div>
		</div> -->
	</view>
</template>

<script>
		
	export default{
		data() {
			return {
				token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjMuMDAwMTExMTEyNzcxNTUxZSsxOCwiaWF0IjoxNjYwNDM5ODIyLjA4NzU3OCwiaXNzIjoiQmJiYWNrIiwiZGF0YSI6eyJhY2NvdW50Ijoicm9vdCIsInBhc3N3b3JkIjoiMzMxMyIsInRpbWVzdGFtcCI6MTY2MDQzOTgyMi4wODc1Nzh9fQ.IQq2XL7zmFOR72uaa5E59XoEjiUPaaeJClCT0FfeG9Y',
				infos: ''
			}
		},
			
		onLoad(){
			uni.request({
				url:'http://127.0.0.1:4523/m1/1437509-0-default/order/getAllOrdersInfo',
				method:'GET',
				data:{
					
				},
				header:{
					token: this.token,
				},
				success:(res)=>{
					this.infos = res.data;
				}
			})
		},
		methods: {
			
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
		height: 80rpx;
	}

	.img_style {
/* 		margin-left: -300rpx; */
		width: 80rpx;
		height: 80rpx;
		margin-left: 30rpx;
	}
	.p_1{
		font-weight: bolder;
		margin-left: 10rpx;
		margin-top: 15rpx;
	}
	.p_2 {
		margin-left: 360rpx;
		color: #8f8f94;
		margin-top: 15rpx;
	}
	.line{
		background-color:#f4f5f5 ;
		width: 90%;
		height: 2rpx;
		margin: auto;
	}
	.img_block1{
		display: flex;
		size: 10px;
		width: 10px;

	}
	.img_block2{
		display: flex;
		size: 10px;
		
	}
	
	.des{
		margin-left: 25rpx;
		color: #8f8f94;
	}
	
	.content{
		;
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
		margin-left: 500rpx;
		margin-bottom: 25rpx;
		border-radius: 15rpx;
		background-color: #fefa83;
		text-align: center;
		box-shadow: 4rpx 4rpx 2rpx 0rpx #8f8f94;
		
	}
	
	button::after {
		border: none;
	}
</style>
