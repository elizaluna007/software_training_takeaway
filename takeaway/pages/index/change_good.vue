<template>
	<view>
		<!-- 商家端修改商品界面 由商家端首页index进入-->

		<p class="p_2">基础信息</p>
		<div class="out_block">
			<!-- 原图 点击该图片时触发upload_img()函数 上传图片 更改img_key变0 -->
			<img :src="info_get.logo" @click="upload_img()" class="logo" v-if="img_key">
			<!-- 用户上传图片 点击可重新上传 -->
			<img class="logo" :src="imgArr" @click="upload_img()" v-if="!img_key">
			<!-- 商家信息框 可以修改名称，菜单 分量 价格 库存 -->
			<div>
				<!-- 修改商品名称 -->
				<div class="line_block">
					<p class="element">商品名称</p>
					<input class="content" style="position: relative;left: 100rpx;" placeholder="请填写"
						v-model="info_get.item_name"></input>
				</div>
				<!-- 修改菜单分组 -->
				<div class="line"></div>
				<div class="line_block">
					<p class="element">菜单分组</p>
					<input class="content" style="position: relative;left: 100rpx;" placeholder="请填写"
						v-model="info_get.category"></input>
				</div>
				<!-- 修改分量 -->
				<div class="line"></div>
				<div class="line_block">
					<p class="element">分量</p>
					<input class="content" style="position: relative;left: 100rpx;" placeholder="请填写"
						v-model="info_get.description"></input>
				</div>
				<!-- 修改价格 -->
				<div class="line"></div>
				<div class="line_block">
					<p class="element">价格</p>
					<input class="content" style="position: relative;left: 100rpx;" placeholder="请填写"
						v-model="info_get.price"></input>
				</div>
				<!-- 修改库存 -->
				<div class="line"></div>
				<div class="line_block">
					<p class="element">库存</p>
					<input class="content" style="position: relative;left: 100rpx;" placeholder="请填写"
						v-model="info_get.stock" @blur="finish_Handle()"></input>
				</div>
				<div class="line"></div>
				<div class="btn_block" style="display: flex;">
					<!-- 修改完成按钮 点击按钮触发save()函数 提交修改请求 -->
					<button @click="save()" class="btn_style">完成</button>
					<!-- 删除按钮 点击按钮触发delete_good()函数 提交删除请求 -->
					<button @click="delete_good()" class="btn_style">删除</button>
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
				img_key: 1, //决定上传图片处 1为原图 0为上传图片
				imgArr: '', //上传图片 需转变为base64格式
				good_name: '',//商品名称 由index界面传入，向接口/business/getOneGood发送
				pre_name: '',//商品原名称
				info_get: '',//商品信息 由接口/business/getOneGood得到
				new_logo: ''//新上传的图片
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
			finish_Handle(){
				if(this.stock>999)
				{
					this.stock = '999+'
				}
			},
			//删除商品函数，向/business/deleteGood接口发送请求
			delete_good() {
				uni.request({
					method: 'GET',
					url: getApp().globalData.business_deleteGood,
					data: {
						//发送的数据
						item_name: this.pre_name
					},
					header: {
						//token统一放在header中
						token: getApp().globalData.token
					},
					success: (res) => {
						//发送成功后接受的数据
						console.log("删除信息成功");
						console.log(res)
						//当后端发送的code为1时删除成功
						if (res.data.code == 1) {
							//提示删除成功信息
							uni.showToast({
								title: "删除成功",
								icon: 'exception',
								duration: 850
							})
							//返回主界面
							uni.switchTab({
								url: '/pages/index/index'
							})
						} else {
							//提示删除失败信息
							uni.showToast({
								title: "删除失败",
								icon: 'error',
								duration: 850
							})
						}
						//返回主界面
						uni.switchTab({
							url: '/pages/index/index'
						})
					}
				})
			},
			//上传图片函数
			upload_img() {
				let that = this;
				uni.chooseImage({
					count: 5,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success: function(res) {
						console.log("选取图片成功");
						var tempFilePaths = res.tempFilePaths;
						that.imgArr = res.tempFilePaths
						uni.previewImage({
							//current, //当前的图片路径必填
							urls: this.imgArr, //数组文件路径必填
							loop: true, //循环在5+app才有效
							indicator: "default" //指数器同样也是5+app有效
						})
						that.img_key = 0;
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
			//修改商品信息函数 向/business/changeGood接口发送请求
			save() {
				console.log("开始打印修改过的信息");
				console.log(this.info_get);
				uni.request({
					method: "POST",
					url: getApp().globalData.business_changeGood,
					data: {
						//发送的数据
						pre_name: this.pre_name,
						new_name: this.info_get.item_name,
						price: this.info_get.price,
						logo: this.new_logo,
						description: this.info_get.description,
						category: this.info_get.category,
						stock: this.info_get.stock
					},
					//token统一放在header中
					header: {
						token: getApp().globalData.token
					},
					//发送成功后接受的数据
					success: (res) => {
						console.log("修改信息成功");
						console.log(res);
						//当后端发送的code为1时修改成功
						if (res.data.code == 1) {
							console.log("修改成功")
							//提示修改成功信息
							uni.showToast({
								title: "修改成功",
								icon: 'exception',
								duration: 850
							})
							//返回主界面
							uni.navigateBack({
								url: '/pages/index/index'
							})
						} else {
							//提示修改失败信息
							uni.showToast({
								title: "修改失败",
								icon: 'error',
								duration: 850
							})
							//返回主界面
							uni.switchTab({
								url: '/pages/index/index'
							})
						}
					}
				})
			}
		},
		onLoad(res) {
			// 页面初始加载时,通过商品名(由商家端index页面传入),向/business/getOneGood发送请求,得到商品信息
			this.good_name = res.good_name;
			console.log(res);
			console.log(this.good_name);
			uni.request({
				method: 'GET',
				url: getApp().globalData.business_getOneGood,
				data: {
					//发送的数据
					item_name: this.good_name
				},
				header: {
					//token统一放在header中
					token: getApp().globalData.token
				},
				success: (res) => {
					//发送成功后接受的数据
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


	.logo {
		width: 250rpx;
		height: 250rpx;
		border-radius: 20rpx;
		margin-left: 20rpx;
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
		margin-top: 30rpx;
		border-radius: 45rpx;
		/* font-size: 40rpx; */
	}

	button::after {
		border: none;
	}
</style>
