<template>
	<view>
		<!-- 商家端增加商品界面 由商家端首页index进入-->
		<p class="p_2">编辑信息</p>
		<div class="out_block">
			<!-- 下面放入你找到的+号图片 -->	
			<view style="display: flex;">
				<!-- 用户所上传的图片，点击可预览 -->
				<img v-if="!img_key" class="logo_style" :src="imgArr" @click="pre_pic()"> </img>	
				<!-- 默认图片 点击该图片时触发upload_img()函数 上传图片 更改img_ke变0 -->
				<img v-if="img_key" src="../../static/upload.png" @click="upload_img()" class="logo_style"></img>
				<!-- 用户更改图片 点击可重新上传 -->
				<img v-if="!img_key" src="../../static/modify_img.png" @click="upload_img()" class="logo_style"></img>
			</view>
			<!-- 商家信息框 可以修改名称，菜单 分量 价格 库存 -->
			<div>
				<!-- 修改商品名称 -->
				<div class="line_block">
					<p class="element">商品名称</p>
					<input class="content" style="position: relative;left: 100rpx;" placeholder="请填写"
						v-model="name"></input>
				</div>
				<!-- 修改菜单分组 -->
				<div class="line"></div>
				<div class="line_block">
					<p class="element">菜单分组</p>
					<input class="content" style="position: relative;left: 100rpx;" placeholder="请填写"
						v-model="category"></input>
				</div>
				<!-- 修改分量 -->
				<div class="line"></div>
				<div class="line_block">
					<p class="element">分量</p>
					<input class="content" style="position: relative;left: 100rpx;" placeholder="请填写"
						v-model="description"></input>
				</div>
				<!-- 修改价格 -->
				<div class="line"></div>
				<div class="line_block">
					<p class="element">价格</p>
					<input class="content" style="position: relative;left: 100rpx;" placeholder="请填写"
						v-model="price"></input>
				</div>
				<!-- 修改库存 -->
				<div class="line"></div>
				<div class="line_block">
					<p class="element">库存</p>
					<input class="content" style="position: relative;left: 100rpx;" placeholder="请填写" v-model="stock"></input>
				</div>
				<div class="line"></div>
				<!-- 添加按钮 点击按钮触发save()函数 提交修改请求 -->
				<button @click="save()" class="btn_style">增加</button>
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
				img_key: 1, //决定上传图片处 1为默认图片 0为上传图片
				imgArr: '', //上传图片 需转变为base64格式
				name: '', //商品名称 商家输入 通过/business/addGood接口向后端发送
				price: '', //菜单分组 商家输入 通过/business/addGood接口向后端发送
				logo: '', //商品图片 商家输入 通过/business/addGood接口向后端发送
				description: '', //分量 商家输入 通过/business/addGood接口向后端发送
				category: '', //菜单分组 商家输入 通过/business/addGood接口向后端发送
				stock: '' //库存 商家输入 通过/business/addGood接口向后端发送
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
			//上传图片函数
			upload_img() {
				let that = this;
				uni.chooseImage({
					//设置格式
					count: 5,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success: res => {
						console.log("选取图片成功");
						var tempFilePaths = res.tempFilePaths;
						that.imgArr = res.tempFilePaths

						that.img_key = 0;

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
			//预览图片
			pre_pic() {
				uni.previewImage({
					//current, //当前的图片路径必填
					urls: this.imgArr, //数组文件路径必填
					loop: true, //循环在5+app才有效
					indicator: "default" //指数器同样也是5+app有效
				});
			},
			//增加按钮的函数 向/business/addGood接口发送请求
			save() {
				console.log("开始打印修改过的信息");
				console.log(this.logo);
				uni.request({
					method: "POST",
					// url: 'https://v3710z5658.oicp.vip/business/addGood',
					url: getApp().globalData.business_addGood,
					data: {
						//发送的数据
						name: this.name,
						price: this.price,
						logo: this.logo,
						description: this.description,
						category: this.category,
						stock: this.stock
					},
					header: {
						//token统一放在header中
						token: getApp().globalData.token
					},
					success: (res) => {
						//发送成功后接受的数据
						console.log("添加成功");
						console.log(res);
						//当后端发送的code为1时添加成功
						if (res.data.code == 1) {
							//显示添加成功
							uni.showToast({
								title: "添加成功",
								icon: 'exception',
								duration: 850
							})
							//返回主页面
							uni.switchTab({
								url: '/pages/index/index'
							})
						} else {
							//显示添加失败
							uni.showToast({
								title: "添加失败",
								icon: 'error',
								duration: 850
							})
							//返回主页面
							uni.switchTab({
								url: '/pages/index/index'
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
	.p_2 {
		margin: 20rpx;
		font-size: 45rpx;
		font-weight: 600;
	}

	.line {
		background-color: #bbbbbb;
		width: 90%;
		height: 2rpx;
		margin: auto;

		margin-top: 10rpx;
	}

	.line_block {
		display: flex;
	}


	.logo_style {
		width: 250rpx;
		height: 250rpx;
		border-radius: 20rpx;
		margin-left: 30rpx;
		margin-top: 20rpx;
	}

	.out_block {
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

	.element {
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

	.content {
		font-size: 40rpx;
		padding-right: 30rpx;
		margin-right: 30rpx;
		margin-top: 10rpx;
	}

	.btn_block {
		margin-top: 30rpx;
		margin-bottom: 30rpx;
	}

	.btn_style {
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

	button::after {
		border: none;
	}
</style>
