<template>
	<view>
		<p class="p_2">编辑信息</p>
		<div class="out_block">
		<!-- 下面放入你找到的+号图片 -->
<!-- 		<img :src="../../staick" @click="upload_img()"> -->
		<image src="../../static/upload.png"@click="upload_img()" class="logo" v-if="img_key"></image>
		<img class="logo" :src="imgArr"v-if="!img_key"@click="upload_img()">
		
		<div>
			<div class="line_block">
				<p class="element">商品名称</p>
				<input class="content" style="position: relative;left: 100rpx;" placeholder="请填写"
					v-model="name"></input>
			</div>
			<div class="line"></div>
			<div class="line_block">
				<p class="element">菜单分组</p>
				<input class="content" style="position: relative;left: 100rpx;" placeholder="请填写"
					v-model="category"></input>
			</div>
			<div class="line"></div>
			<div class="line_block">
				<p class="element">分量</p>
				<input class="content" style="position: relative;left: 100rpx;" placeholder="请填写"
					v-model="description"></input>
			</div>
			<div class="line"></div>
			<div class="line_block">
				<p class="element">价格</p>
				<input class="content" style="position: relative;left: 100rpx;" placeholder="请填写"
					v-model="price"></input>
			</div>
			<div class="line"></div>
			<div class="line_block">
				<p class="element">库存</p>
				<input class="content" style="position: relative;left: 100rpx;" placeholder="请填写"
					v-model="stock"></input>
			</div>
			<div class="line"></div>
			<button @click="save()" class="btn_style" >增加</button>
			<!-- 			<button @click="delete()">删除</button> -->
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
				img_key:1,
				imgArr: '',
				name: '',
				price: '',
				logo: '',
				description: '',
				category:'',
				stock:''
			}
		},
		methods: {
			//页面下拉刷新后，1.5秒后停止显示下拉刷新图标
					onPullDownRefresh() {
						console.log('refresh');
						setTimeout(function() {
							uni.stopPullDownRefresh();
						}, 1500);
					},
			upload_img() {
				let that = this;
				uni.chooseImage({
					count: 5,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success: res=> {
						console.log("选取图片成功");
						var tempFilePaths = res.tempFilePaths;
						that.imgArr = res.tempFilePaths
						uni.previewImage({
							//current, //当前的图片路径必填
							urls: this.imgArr, //数组文件路径必填
							loop: true, //循环在5+app才有效
							indicator: "default" //指数器同样也是5+app有效
						})
						that.img_key=0;
						pathToBase64(tempFilePaths[0]) //图像转base64工具
							.then(base64 => {
								that.avatar = base64; //将文件转化为base64并显示
								// console.log("开始上传");
								// console.log(base64);
								// console.log("开始打印base64");
								// console.log(JSON.stringify(base64));
								that.logo = JSON.stringify(base64);
								// that.logo = JSON.stringify(base64);
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
				console.log(this.logo);
				uni.request({
					method: "POST",
					// url: 'https://v3710z5658.oicp.vip/business/addGood',
					url: getApp().globalData.business_addGood,
					data: {
						name: this.name,
						price: this.price,
						logo: this.logo,
						description: this.description,
						category: this.category,
						stock:this.stock
					},
					header: {
						token: getApp().globalData.token
					},
					success: (res) => {
						console.log("添加成功");
						console.log(res);
						if(res.data.code==1)
						{
							uni.showToast({
								title: "添加成功",
								icon: 'exception',
								duration: 850
							})
							uni.switchTab({
								url:'/pages/index/index'
							})
						}
						else{
							uni.showToast({
								title: "添加失败",
								icon: 'error',
								duration: 850
							})
							uni.switchTab({
								url:'/pages/index/index'
							})
						}
					}
				})
			}
		},
		onLoad(res) {
			
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
	margin-left: 30rpx;
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
				width: 150rpx;
				margin-top: 30rpx;
				border-radius: 45rpx;
				/* font-size: 40rpx; */
				margin-bottom: 30rpx;
	}
	
	button::after{
		border: none;
	}
</style>
