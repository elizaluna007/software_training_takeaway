<template>
	<!-- 订单界面 -->
	<view>

		<view v-if="key">
			<!-- 登录状态 -->
			<!-- 确认登录后根据cstm_or_sp判断用户类型 1顾客 0商家 -->
			<view class="all_block" v-if="cstm_or_sp">
				<!-- 顾客的页面 -->
				<div class="out_block" v-for="info in infos">
					<!-- 点击订单可进入订单详情页 -->
					<view @click="goto_detail(info)">
						<!-- 显示订单商铺名，logo，配送状态 -->
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
							<!-- 显示订单商品，商品图片 -->
							<div class="img_block1" v-for="info_good in info.goods">
								<div>
									<img :src="info_good.logo" style="width: 150rpx; height: 150rpx; "
										class="imgkiddingme">
									<p class="des">{{info_good.name}}</p>
								</div>
								<div class="line"></div>
							</div>
							<!-- 显示订单下单时间，总金额 -->
							<div>
								<p class=order_time>下单时间{{info.paytime}}</p>
								<p class="total" style="position: relative; left: 500rpx; top: -41rpx">￥
									{{info.sumprice}}
								</p>
							</div>
						</div>
					</view>
					<!-- 评论和再来一单按钮 -->
					<view class="two_btn" style="display: flex;">
						<!-- 评论功能，跳转至评论界面 -->
						<!-- info.code_comment判断是否已评论 0未评论 1已评论  -->
						<div v-if="info.code_comment === 0">
							<!-- info.delivered判断是否已送达 未送达不能评论 -->
							<button v-if="info.delivered === '已送达'" class="com_style" size="mini"
								@click="comment(info)">评论</button>
						</div>
						<!-- 再来一单功能，跳转至对应商家 -->
						<button class="btn_style" size="mini" @click="restart(info)">再来一单</button>
					</view>
				</div>

			</view>

			<view v-if="cstm_or_sp != 1">
				<!-- 商家的页面-->
				<div class="out_block" v-for="(info_sp,index1) in infos_sp">
					<!-- 显示商家端每笔订单的具体信息 -->
					<view>
						<div class="first_line">
							<!-- 顾客名称-->
							<p class="p_1">{{info_sp.customername}}</p>
							<!-- 是否已送达 -->
							<p class="p_2">{{info_sp.delivered}}</p>
						</div>
						<!-- 定位图标以及地址 -->
						<view  style="display: flex;">
							<img class="des_icon" src="../../static/loca.png" ></img>
							<view class=" destination">{{info_sp.destination}}</view>
						</view>
						<div class="line"></div>
						<div class="content">
							<!-- 订单商品，数量，单价 -->
							<div class="img_block2" v-for="info_good_sp in info_sp.goods" style="display: flex;">
								<img :src="info_good_sp.logo" style="width: 150rpx; height: 150rpx; "
									class="imgkiddingme">
								<div class="second_block">
									<view class="des1">{{info_good_sp.name}}</view>
									<view class="des2">x{{info_good_sp.count}}</view>
									<view class="des3">￥{{info_good_sp.price}}</view>
								</div>
							</div>
							<div class="line"></div>
							<div>
								<!-- 订单总价，下单时间，配送时间，接单时间 -->
								<p class="total" style="position: relative; left: 395rpx; top: 15rpx">总金额 ￥
									{{info_sp.sumprice}}
								</p>
								<div class="line"></div>
								<p class="order_time1">下单时间:{{info_sp.paytime}}</p>

								<p class="needy_time">配送时间:{{info_sp.needytime}}分钟</p>
								<p v-if="rsp_status[index1] === true" class="take_time">
									接单时间:{{infos_sp[index1].taketime}}</p>
							</div>
						</div>
					</view>
					<!-- 响应订单按钮，响应后会立刻显示响应时间 -->
					<button v-if="rsp_status[index1] === false" class="btn_resp" size="mini"
						@click="response(info_sp,index1)">响应订单</button>
					<button v-if="rsp_status[index1] === true" class="btn_responded" size="mini">已响应</button>
				</div>
			</view>
		</view>
		<!-- 需要后端的一个判断是否已响应的接口，还有改变“接单时间”的显示 -->
		<view v-if="key_not">
			<!-- 未登录状态 -->
			<image class="grape" src="../static2/grape.jpg"></image>
			<p class="warning">您还没有登录，请登录后查看订单</p>
			<button class="login" @click="goto()">登录/注册</button>
		</view>

	</view>

</template>

<script>
	export default {
		data() {
			return {
				infos: '', //顾客订单信息 从接口/order/getAllOrdersInfo接受
				infos_sp: '', //商家订单信息  从接口/business/getAllOrders接受
				key: false, //判断用户是否登录 false未登录 true登录
				cstm_or_sp: '', //判断用户类型 1顾客 0商家
				code: '', //接口 /business/changeOrderStatus 返回的响应码
				msg: '', //接口/business/changeOrderStatus 返回的响应状态
				key_not: true, //判断用户是否未登录 false登录 true未登录
				rsp_status: [], //判断商家是否已响应订单
			}
		},

		onLoad() {},
		onShow() {
			//从全局变量login_key获取用户登录状态
			this.key = getApp().globalData.login_key;
			this.key_not = !this.key;
			console.log("验证11111111111111");
			console.log(getApp().globalData.login_key);
			console.log(getApp().globalData.cstm_or_sp);
			if (this.key == true) {
				//若为登录状态，判断用户类型
				//从全局变量cstm_or_sp获取用户类型
				this.cstm_or_sp = getApp().globalData.cstm_or_sp;
				if (this.cstm_or_sp == 1) {
					//顾客端发送请求至order/getAllOrdersInfo接口
					uni.request({
						// url: 'http://127.0.0.1:4523/m1/1437509-0-default/order/getAllOrdersInfo',
						url: getApp().globalData.order_getAllOrdersInfo,
						method: 'GET',
						data: {

						},
						header: {
							token: getApp().globalData.token
						},
						success: (res) => {
							console.log("开始获取订单信息onshow");
							this.infos = res.data;
							// console.log(res.data);
							console.log(res.data);
						}
					})
				} else {
					//商家端发送请求至/business/getAllOrders接口
					uni.request({
						// url: 'http://127.0.0.1:4523/m1/1437509-0-default/order/getAllOrdersInfo',
						url: getApp().globalData.business_getAllOrders,
						method: 'GET',
						data: {

						},
						header: {
							token: getApp().globalData.token
						},
						success: (res) => {
							console.log("开始获取商家订单信息onshow");
							this.infos_sp = res.data;
							// console.log(res.data);
							console.log(res.data);
							// 初始化rsp_status！！！！！！！！！！！！！！！！！
							this.rsp_status.splice(0, this.rsp_status.length)
							for (let i = 0; i < this.infos_sp.length; i++) {
								if (this.infos_sp[i].taketime != "None") {
									this.rsp_status.push(true);
								} else {
									this.rsp_status.push(false);
								}

							}
							console.log("看一眼初始化结果");
							console.log(this.rsp_status);
							console.log(this.infos_sp.length);
						}
					})
				}
			} else {}
			//从结算页面来到订单时，处理本地缓存
			//清除该商铺购物车历史缓存
			let pre_shop_name = getApp().globalData.pre_return_from_shop; //获取返回的商铺名
			console.log("全局：", getApp().globalData.pre_return_from_shop)
			if (pre_shop_name != '') { //如果不为空
				uni.removeStorage({
					key: 'shop_car_history' + pre_shop_name,
					success: (res) => {
						console.log('已清除商铺:' + pre_shop_name + '的历史购物车信息');
					}
				});
				//清除后返回商铺名置空
				getApp().globalData.pre_return_from_shop = '';
				console.log("全局：", getApp().globalData.pre_return_from_shop)
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
			restart(object) {
				// 返回商家页面
				uni.navigateTo({
					url: '/pages/index/shop?name=' + object.name_shop
				})
			},
			comment(object) {
				// 跳转至评论页面
				uni.navigateTo({
					url: '/pages/order/comment?paytime=' + object.paytime + '&name_shop=' + object.name_shop +
						'&logo_shop=' + object.logo_shop
				})
			},
			//跳转至用户登录界面
			goto(url) {
				uni.navigateTo({
					url: '/pages/login/login_username'
				})
			},
			//商家端响应订单
			response(object, idx) {
				// 响应订单
				//向后端接口/business/changeOrderStatus发送请求，未完成
				uni.request({
					url: getApp().globalData.business_changeOrderStatus,
					method: 'POST',
					data: {
						paytime: object.paytime,
						status: 1
					},
					header: {
						token: getApp().globalData.token
					},
					success: (res) => {
						console.log("开始获取改变订单状态onshow");
						console.log(res);
						this.code = res.data.code;
						this.msg = res.data.msg;
						this.rsp_status.splice(idx, 1, true);
						console.log("看看数字")
						console.log(this.rsp_status)
					}
				})
				//为立刻获取响应时间，从前端获取时间，实时响应
				var time = new Date();
				var year = time.getFullYear();
				var month = time.getMonth() + 1;
				var day = time.getDate();
				var hours = time.getHours();
				var min = time.getMinutes();
				var sec = time.getSeconds()
				this.infos_sp[idx].taketime = year + "-" + month + "-" + day + " " + hours + ":" + min + ":" + sec;
				console.log("看看时间")
				console.log(time)
				console.log(this.infos_sp)
			},
			//跳转至详情页
			goto_detail(object) {
				console.log("跳转到详细页面");
				uni.navigateTo({
					url: '/pages/order/order_detail?paytime=' + object.paytime
				})
			},
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

	.p_1 {
		font-weight: bolder;
		margin-left: 20rpx;
		margin-top: 15rpx;
	}

	.p_2 {
		color: #8f8f94;
		margin-top: 15rpx;
		position: absolute;
		left: 600rpx;
	}

	.line {
		background-color: #d5d3d3;
		width: 100%;
		height: 2rpx;
		margin-top: 30rpx;
		margin-left: 0rpx;

	}

	.content {

		/* display: flex; */

		/* justify-content: flex-start; */
	}

	.img_block1 {
		display: inline-table;
		size: 10px;
		width: 10px;
		margin-left: 10rpx;
	}

	.imgkiddingme {
		border-radius: 20rpx;
		margin-top: 20rpx;
		margin-left: 20rpx;
	}




	.des {
		margin-left: 27rpx;
		color: #8f8f94;
		font-size: 30rpx;
		text-align: center;

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



	.order_time {
		margin-left: 25rpx;
		color: #8f8f94;
		margin-top: 30rpx;
	}

	.total {

		margin-left: 80rpx;
		font-weight: 600;
	}

	.two_btn {}

	.btn_style {
		margin-right: 100rpx;
		margin-bottom: 25rpx;
		border-radius: 15rpx;
		background-color: #fefa83;
		text-align: center;
		box-shadow: 4rpx 4rpx 2rpx 0rpx #8f8f94;

	}

	.btn_resp {
		margin-top: 10rpx;
		margin-left: 490rpx;
		margin-bottom: 25rpx;
		border-radius: 15rpx;
		background-color: #fefa83;
		text-align: center;
		box-shadow: 4rpx 4rpx 2rpx 0rpx #8f8f94;
	}

	.btn_responded {
		margin-top: 10rpx;
		margin-left: 490rpx;
		margin-bottom: 25rpx;
		border-radius: 15rpx;
		/* background-color: #fefa83; */
		text-align: center;
		box-shadow: 4rpx 4rpx 2rpx 0rpx #8f8f94;
	}


	.com_style {
		/* position: relative;left: 340rpx;top: -80rpx; */
		border-radius: 15rpx;
		background-color: #fefa83;
		text-align: center;
		box-shadow: 4rpx 4rpx 2rpx 0rpx #8f8f94;
		height: 58rpx;
		margin-left: 100rpx;
	}

	button::after {
		border: none;
	}

	.grape {
		width: 400rpx;
		height: 400rpx;
		position: relative;
		top: 230rpx;
		left: 200rpx;
	}

	.warning {
		position: relative;
		top: 230rpx;
		left: 150rpx;
	}

	.login {
		background-color: #fefa83; //按钮颜色
		border-radius: 20rpx; //按钮弧度
		width: 300rpx; //宽度
		box-shadow: 4rpx 4rpx 2rpx 2rpx #8f8f94;
		position: relative;
		top: 300rpx;
		left: 0rpx;
	}
	.des_icon{
		width: 35rpx;
		height: 35rpx; 
		margin-left:20rpx ;
		margin-top: 5rpx;
	}

	.destination {
		width: 80%;
		margin-left: 30rpx;
	}

	.second_block {
		display: flex;
		align-items: center;
		justify-content: center;
		
	}

	.des1 {
		font-size: 30rpx;
		width: 200rpx;
		margin-left:10rpx ;

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
		color: #ffb420;
		font-size: 30rpx;
		width: 100rpx;
		margin-left:10rpx ;

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

	.des3 {
		font-size: 30rpx;
		width: 200rpx;
		margin-left:10rpx ;
		
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



	.needy_time {
		margin-left: 25rpx;
		/* color: #8f8f94; */
		margin-top: 15rpx;
	}


	.take_time {
		margin-left: 25rpx;
		/* color: #8f8f94; */
		margin-top: 15rpx;
	}

	.order_time1 {
		margin-left: 25rpx;
		/* color: #8f8f94; */
		margin-top: 30rpx;
	}
</style>
