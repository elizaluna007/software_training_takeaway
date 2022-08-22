<template>
	<!-- 顾客评论页面 -->
	<view class="out_block">
		<view>
			<p class="title">您对商家/菜品满意吗？</p>
			<!-- 匿名提交按钮 -->
			<checkbox-group>
				<label class="checkbox">
					<checkbox value="cb" />
				</label>
			</checkbox-group>
			<text class="checkmessage">匿名提交</text>
		</view>
		<!-- 商铺名和logo -->
		<view class="first_line">
			<image :src="logo" class="logo_shop"></image>
			<text class="name_shop">{{shop_name}}</text>
		</view>
		<!-- 点星星功能，3行，每行5颗星星 -->
		<view class="uni-common-mt">
			<view>
				<view class="three_com" v-for="(item1,index1) in clicked_list">
					<img class="type1" :src="type[index1]"></img>

					<view v-for="(item2,index2) in clicked_list[index1]" @click="choise(index1,index2)">

						<view v-if="item2">
							<image :src="star_yes" class="star"></image>
						</view>
						<view v-else>
							<image :src="star_no" class="star"></image>
						</view>
					</view>

					<img class="type2" :src="grade_chi[index1]"></img>
				</view>
			</view>
		</view>
		<!-- 评论框，支持文字评论和上传图片 -->
		<view class="weui-input">
			<textarea class="input_style" v-model="comment" placeholder="说说味道怎么样,给大家参考"></textarea>
			<!-- 上传图片功能，上传之后的图片，点击图片可预览 -->
			<view style="display: flex;">
				<div v-if="pic_key" class="img_style" @click="pre_pic">
					<img class="insert_pic" :src="imgArr">
				</div>
				<div v-if="!pic_key" class="img_style" @click="upLoad">
					<img class="insert_pic" src="../../static/upload.png">
				</div>
				<!-- 用户更改图片 点击可重新上传 -->
				<div v-if="pic_key" class="img_style" @click="upLoad">
				<img  class="insert_pic" src="../../static/modify_img.png"></img>
				</div>
			</view>
		</view>

		<!-- 提交按钮，向后的发送请求 -->
		<view class="two_button">
			<button @click="submit" class="btn_style" size="mini">提交</button>
		</view>
		<!-- 底部留白 -->
		<view style="height: 30rpx;width: 100%;"></view>
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
				imgArr: '', //上传图片 需转变为base64格式
				pic_key: 0, //判断显示评论图片 0默认图片 1上传图片
				pic: '', //最终向后端发送的图片内容
				paytime: '', //订单时间 来源于上个界面 向后端发送
				logo: '', //商铺logo 来源于上个界面 用于显示
				shop_name: '', //商铺名 来源于上个界面 用于显示
				clicked_list: [], //对应星星个数
				star_yes: '../../static/star_yellow.png', //星星被点亮的图片
				star_no: '../../static/star_grey.png', //星星未被点亮的图片
				comment: '', //用户输入的评论向后端发送
				grade: [0, 0, 0], //提交的星星数量 向后端发送
				grade_chi: ['../../static/write.png', '../../static/write.png', '../../static/write.png'], //星星数量对应的评价等级
				////星星数量对应的三种评价等级的存储数组
				type: ['../../static/deliver.png', '../../static/wrapping.png', '../../static/flavor.png']
			}
		},

		//页面初始化时从上个页面获取数据并显示
		onLoad(order_data) {
			console.log("获取order页面信息")
			console.log(order_data)
			this.paytime = order_data.paytime;
			this.logo = order_data.logo_shop;
			this.shop_name = order_data.name_shop;
			//初始化星星数组
			for (let i = 0; i < 3; i++) {
				let now = [];
				for (let j = 0; j < 5; j++) {
					now.push(false);
				}
				this.clicked_list.push(now);
			}
			console.log("初始化数组")
			console.log(this.clicked_list)
		},
		onShow() {

		},
		methods: {
			//上传图片功能
			upLoad() {
				let that = this;
				uni.chooseImage({
					count: 5, //在h5浏览器限制不住
					success: res => {
						// console.log(this)
						this.imgArr = res.tempFilePaths
						this.pic_key = 1;
					}
				})


				// uni.previewImage({
				// 	//current, //当前的图片路径必填
				// 	urls: this.imgArr, //数组文件路径必填
				// 	loop: true, //循环在5+app才有效
				// 	indicator: "default" //指数器同样也是5+app有效
				// })

			},
			//图片预览
			pre_pic() {
				uni.previewImage({
					//current, //当前的图片路径必填
					urls: this.imgArr, //数组文件路径必填
					loop: true, //循环在5+app才有效
					indicator: "default" //指数器同样也是5+app有效
				})
			},
			//点击选择星星个数
			choise(group, num) {
				console.log("点击了", group)
				console.log("点击了", num)
				//每次点击时先清空数组
				for (let j = 0; j < 5; j++) {
					this.clicked_list[group].splice(j, 1, false);
				}
				//修改星星数组
				num = num + 1;
				for (let i = 0; i < num; i++) {

					this.clicked_list[group].splice(i, 1, true);
				}
				//计算出评价分数
				for (let i = 0; i < 3; i++) {
					let k = 0;
					for (let j = 0; j < 5; j++) {
						if (this.clicked_list[i][j] == true) {
							k++;
						}
					}
					//根据星星数量显示对应评分
					this.grade.splice(i, 1, k)
					if (k == 1) {
						this.grade_chi.splice(i, 1, '../../static/verybad.png')
					} else if (k == 2) {
						this.grade_chi.splice(i, 1, '../../static/bad.png')
					} else if (k == 3) {
						this.grade_chi.splice(i, 1, '../../static/normal.png')
					} else if (k == 4) {
						this.grade_chi.splice(i, 1, '../../static/good.png')
					} else {
						this.grade_chi.splice(i, 1, '../../static/very good.png')
					}
				}
				console.log("评分")
				console.log(this.grade)
			},
			submit() {
				//向接口/comment/addComment发送请求
				uni.request({
					url: getApp().globalData.comment_addComment,
					method: 'POST',
					data: {
						shop_name: this.shop_name,
						comment: this.comment,
						grade: this.grade,
						order_time: this.paytime,
						picture: this.pic
					},
					header: {
						token: getApp().globalData.token
					},
					success: (res) => {
						console.log("开始获取addComment接口返回信息");
						console.log(res)
						this.code = res.data.code
						this.msg = res.data.msg
						uni.reLaunch({
							url: '/pages/order/order'
						})
					}
				})

			}
		}
	}
</script>

<style>
	.first_line {
		margin-top: 15rpx;
		display: flex;
	}

	.logo_shop {
		width: 80rpx;
		height: 80rpx;
		margin-left: 20rpx;
	}

	.name_shop {
		font-size: 45rpx;
		/* font-weight: bolder; */
		margin-left: 20rpx;
		margin-top: 5rpx;
	}

	/* uni-common-mt {
		box-sizing: border-box;
		width: 100%;
		overflow: hidden;
		padding: 0 85upx;
		margin-top: 20upx;

	} */

	.three_com {
		display: flex;
		justify-content: space-between;
		justify-items: center;
		width: 50%;
		color: #999;

	}

	.star {
		height: 80rpx;
		width: 80rpx;
		margin-left: 15rpx;
		animation: switch 1s ease-out infinite;
	}

	@keyframes switch {

		0%,
		100% {
			transform: scale(1);
		}

		50% {
			transform: scale(0.9);
		}
	}

	.weui-input {
		margin: 20rpx;
		margin-top: 60rpx;
		border-width: 100%;
		border: 3rpx solid #bbbbbb;
		box-shadow: #8f8f94;
		border-radius: 20rpx;
		box-shadow:
			5.7px 3.8px 5.3px rgba(0, 0, 0, 0.04),
			19px 12.7px 17.9px rgba(0, 0, 0, 0.024),
			85px 57px 80px rgba(0, 0, 0, 0.016);


	}

	.input_style {
		/* 		width: 680rpx;
		height: 400rpx;
		border-style: solid;
		border-width: 2rpx; //输入框下划线
		border-color: #8f8f94; //输入框下划线颜色
		border-radius: 20rpx; */
		height: 300rpx;
		margin-top: 20rpx;
		margin-left: 20rpx;

	}

	.type1 {
		width: 68rpx;
		height: 35rpx;
		margin-top: 25rpx;
		margin-left: 20rpx;
	}

	.type2 {
		width: 130rpx;
		height: 35rpx;
		margin-top: 20rpx;
		margin-left: 10rpx;
	}

	.title {
		font-size: 45rpx;
		font-weight: 600;
		margin-left: 20rpx;
		margin-top: 10rpx;
	}

	.checkbox {
		position: absolute;
		top: 10rpx;
		left: 520rpx;
	}

	.img_style {
		margin-top: 20rpx;
		margin-bottom: 40rpx;
		margin-left: 20rpx;
		width: 280rpx;
		height: 280rpx;
	}

	.insert_pic {
		height: 300rpx;
		border-radius: 20rpx;
		width: 300rpx;
	}

	/* .out_block{
		align-items: center;
		vertical-align: center;
		display: flex;
		object-fit: fill;
		margin: 20rpx;
		border-width: 100%;
		border: 3rpx solid #000000;
		box-shadow: #8f8f94;
		border-radius: 7%; */
	/* box-shadow:
			5.7px 3.8px 5.3px rgba(0, 0, 0, 0.04),
			19px 12.7px 17.9px rgba(0, 0, 0, 0.024),
			85px 57px 80px rgba(0, 0, 0, 0.016); */
	/* } */

	.checkmessage {
		position: absolute;
		top: 15rpx;
		left: 580rpx;
		color: #8f8f94;
	}

	.two_button {
		display: flex;
	}

	.btn_style {
		border: none;
		font-size: 40rpx;
		background-color: #fefa83;
		text-align: center;
		justify-content: center;
		height: 90rpx;
		margin-top: 30rpx;
		border-radius: 45rpx;
		box-shadow: 4rpx 4rpx 2rpx 2rpx #8f8f94;
	}

	button::after {
		border: none;
	}
</style>
