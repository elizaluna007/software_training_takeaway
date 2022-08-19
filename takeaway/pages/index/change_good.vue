<template>
	<view>
		<p class="p_2">基础信息</p> 
		<div class="out_block">
		<img :src="info_get.logo" @click="upload_img()" class="logo">
		<div>
			<div class="line_block">
				<p class="element">商品名称</p>
				<input class="content" style="position: relative;left: 100rpx;" placeholder="请填写"
					v-model="info_get.item_name"></input>
			</div>
			<div class="line"></div>
			<div class="line_block">
				<p class="element">菜单分组</p>
				<input class="content" style="position: relative;left: 100rpx;" placeholder="请填写"
					v-model="info_get.category"></input>
			</div>
			<div class="line"></div>
			<div class="line_block">
				<p class="element">分量</p>
				<input class="content" style="position: relative;left: 100rpx;" placeholder="请填写"
					v-model="info_get.description"></input>
			</div>
			<div class="line"></div>
			<div class="line_block">
				<p class="element">价格</p>
				<input class="content" style="position: relative;left: 100rpx;" placeholder="请填写"
					v-model="info_get.price"></input>
			</div>
			<div class="line"></div>
			<div class="line_block">
				<p class="element">库存</p>
				<input class="content" style="position: relative;left: 100rpx;" placeholder="请填写"
					v-model="info_get.stock"></input>
			</div>
			<div class="line"></div>
			<div class="btn_block" style="display: flex;">
			<button @click="save()"  class="btn_style">完成</button>
			<button @click="delete_good()"  class="btn_style">删除</button>
			<!-- 			<button @click="delete()">删除</button> -->
		</div>
		</div>
		</div>
	</view>
</template>

<script>
	import {
		pathToBase64,
		base64ToPath
	} from '../../js_sdk/mmmm-image-tools/index.js';
	export default {
		data() {
			return {
				good_name: '',
				pre_name: '',
				info_get: '',
				new_logo: ''
			}
		},
		methods: {
			delete_good() {
				uni.request({
					method: 'GET',
					url: 'https://v3710z5658.oicp.vip/business/deleteGood',
					header: {
						token: getApp().globalData.token
					},
					data: {
						item_name: this.pre_name
					},
					success: (res) => {
						console.log("删除信息成功");
						console.log(res)
						if(res.data.code==1)
						{
							uni.showToast({
								title: "删除成功",
								icon: 'exception',
								duration: 850
							})
							uni.navigateTo({
								url:'/pages/index/index'
							})
						}
						else{
							uni.showToast({
								title: "删除失败",
								icon: 'error',
								duration: 850
							})
						}
					}
				})
			},
			upload_img() {
				let that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success: function(res) {
						console.log("选取图片成功");
						var tempFilePaths = res.tempFilePaths;
						pathToBase64(tempFilePaths[0]) //图像转base64工具
							.then(base64 => {
								that.avatar = base64; //将文件转化为base64并显示
								// console.log("开始上传");
								// console.log(base64);
								// console.log("开始打印base64");
								// console.log(JSON.stringify(base64));
								that.new_logo = JSON.stringify(base64);
								// that.avatarUpload(base64); //同时将头像上传至数据库进行存储
							})
						// .catch(error => {
						// 	console.error(error)
						// })
					}
				});
			},
			save() {
				console.log("开始打印修改过的信息");
				console.log(this.info_get);
				uni.request({
					method: "POST",
					url: 'https://v3710z5658.oicp.vip/business/changeGood',
					data: {
						pre_name: this.pre_name,
						new_name: this.info_get.item_name,
						price: this.info_get.price,
						logo: this.new_logo,
						description: this.info_get.description,
						category: this.info_get.category,
						stock: this.info_get.stock
					},
					header: {
						token: getApp().globalData.token
					},
					success: (res) => {
						console.log("修改信息成功");
						console.log(res);
						if(res.data.code==1)
						{
							uni.showToast({
								title: "修改成功",
								icon: 'exception',
								duration: 850
							})
							uni.navigateTo({
								url:'/pages/index/index'
							})
						}
						else{
							uni.showToast({
								title: "修改失败",
								icon: 'error',
								duration: 850
							})
						}
					}
				})
			}
		},
		onLoad(res) {
			this.good_name = res.good_name;
			uni.request({
				method: 'GET',
				url: 'https://v3710z5658.oicp.vip/business/getOneGood',
				data: {
					item_name: "香辣鸭腿堡"
				},
				header: {
					token: getApp().globalData.token
				},
				success: (res) => {
					console.log(res);
					this.info_get = res.data;
					console.log(this.info_get);
					this.pre_name = res.data.item_name;
				}
			})
		}

	}
</script>

<style>
.p_2{
	margin: 20rpx;
	font-size: 45rpx;
	font-weight: 600;
}
.line{
	background-color: #bbbbbb;
			width: 90%;
			height: 2rpx;
			margin: auto;
	
			margin-top: 10rpx;
}

.line_block{
	display: flex;
}

	
.logo{
	width: 250rpx;
	height: 250rpx;
	border-radius: 20rpx;
	margin-left: 20rpx;
	margin-top: 20rpx;
}

.out_block{
	align-items: center;
			vertical-align: center;
			/* display: flex; */
			object-fit: fill;
			margin: 20rpx;
			border-width: 100%;
			border: 3rpx solid #bbbbbb;
			box-shadow: #8f8f94;
			border-radius: 20rpx;
			/* box-shadow:
				5.7px 3.8px 5.3px rgba(0, 0, 0, 0.04),
				19px 12.7px 17.9px rgba(0, 0, 0, 0.024),
				85px 57px 80px rgba(0, 0, 0, 0.016); */

}

.element{
	color: #909090;
			margin-left: 30rpx;
			font-size: 40rpx;
			margin-top: 10rpx;
			width: 200rpx;
}

.line_block {
		display: flex;
		margin-left: 30rpx;
		margin-right: 30rpx;
		margin-top: 30rpx;
	}
	
	.content{
		font-size: 40rpx;
				padding-right: 30rpx;
				margin-right: 30rpx;
				margin-top: 10rpx;
	}
	
	.btn_block{
		margin-top: 30rpx;
		margin-bottom: 30rpx;
	}
	
	.btn_style{
		border: none;
				background-color: #f0e3f2;
				text-align: center;
				justify-content: center;
				height: 90rpx;
				margin-top: 30rpx;
				border-radius: 45rpx;
				/* font-size: 40rpx; */
	}
	
	button::after{
		border: none;
	}
</style>
