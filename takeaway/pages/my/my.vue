<template>
	<view>
		<div class="login_or_register">
			<div class="img_block">
				<img :src="login_no" class="img_style" v-if="button_key" />
				<img :src="info.headphoto" class="img_style" v-if="key" @click="upload_img()" />
			</div>
			<button v-if="button_key" class="btn_style" type="default" @click="goto()"
				style="background-color: #fefa83;">登录/注册</button>
			<p v-if="key" class="p_1">{{info.name}}</p>
		</div>
		<div v-if="button_key" class="line"></div>
		<div v-if="key">
			<!-- 顾客端 -->
			<view v-if="cstm_or_sp">
				<div>
					<div>

						<div style="display: flex;">
							<p class="p_2">基本资料</p>
							<button class="btn_1" @click="change()" v-if="change_no_key">编辑</button>
							<button class="btn_1" @click="save()" v-if="change_key">保存</button>
							<!-- 	<button class="btn_2" @click="change_address()" v-if="change_no_address_key">修改旧地址</button> -->
							<!-- <button class="btn_2" @click="save_address()" v-if="change_address_key">保存新地址</button> -->
							<button class="btn_2" @click="change_passward()">修改密码</button>
						</div>

					</div>
				</div>
				<div v-if="change_no_key">
					<div class="line_block">
						<p class="element">用户名</p>
						<p class="content">{{info.name}}</p>
					</div>
					<div class="line"></div>
					<div class="line_block">
						<p class="element">性别</p>
						<p class="content">{{info.sex}}</p>
					</div>
					<div class="line"></div>

					<div class="line_block">
						<p class="element">生日</p>
						<p class="content">{{info.birthday}}</p>
					</div>
					<div class="line"></div>
					<div class="line_block">
						<p class="element">手机号</p>
						<p class="content">{{info.phone}}</p>
					</div>
					<div class="line"></div>
				</div>
				<div v-if="change_key">
					<div class="line_block">
						<p class="element">用户名</p>
						<input class="content" style="position: relative;left: 60rpx;" placeholder="(可修改)"
							v-model="info.name"></input>
					</div>
					<div class="line"></div>
					<div class="line_block">
						<p class="element">性别</p>
						<input class="content" style="position: relative;left: 60rpx;" placeholder="(可修改)"
							v-model="info.sex"></input>
					</div>
					<div class="line"></div>

					<div class="line_block">
						<p class="element">生日</p>
						<input class="content" style="position: relative;left: 60rpx;" placeholder="(可修改)"
							v-model="info.birthday"></input>
					</div>
					<div class="line"></div>
					<div class="line_block">
						<p class="element">手机号</p>
						<input class="content" style="position: relative;left: 60rpx;" placeholder="(可修改)"
							v-model="info.phone"></input>
					</div>
					<div class="line"></div>
				</div>
				<div class="line_block" v-if="change_no_address_key" @click="change_address()">
					<p class="element">地址</p>
					<p class="content">{{info.address}}</p>
				</div>
				<div v-if="change_address_key">
					<div class="line_block">
						<p class="element">地址</p>
						<view class="input_block" style="margin-left: -100rpx;">
							<picker class="pickerList" mode="multiSelector" :range="newProvinceDataList"
								:value="multiIndex" @change="pickerChange" @columnchange="pickerColumnchange">
								<view class="input_text1" style="margin-left:60rpx;">{{select}}</view>
							</picker>
						</view>
					</div>
					<input placeholder="请输入更详细的地理位置" v-model="address_detail" class="input_text2"
						style="text-align: center;">
				</div>
				<div class="line"></div>
				<div class="line_block" v-if="change_pwd_key">
					<p class="element">旧密码</p>
					<input class="content" style="position: relative;left: 60rpx;" placeholder="请输入旧密码"
						v-model="pre_pwd"></input>
				</div>
				<div class="line" v-if="change_pwd_key"></div>
				<div class="line_block" v-if="change_pwd_key">
					<p class="element">新密码</p>
					<input class="content" style="position: relative;left: 60rpx;" placeholder="请输入新密码"
						v-model="new_pwd"></input>
				</div>
				<div class="line" v-if="change_pwd_key"></div>
				<button class="btn_style_3" @click="save_address()" v-if="change_address_key">保存新地址</button>
				<button v-if="change_pwd_key" class="btn_style_3" @click="update_passward()">确认修改密码1</button>
				<button class="btn_style_2" @click="logout()">退出当前账号</button>
			</view>
			<!-- 商家端 -->
			<view v-if="cstm_or_sp !=1">
				<div style="display: flex;">
					<p class="p_2">基本资料</p>
					<button class="btn_1" @click="change()" v-if="change_no_key">编辑</button>
					<button class="btn_2" @click="save_shop()" v-if="change_key">保存</button>
					<button class="btn_2" @click="change_passward()">修改密码</button>
				</div>
				<div v-if="change_no_key" style="margin-top: -50rpx;">
					<div class="line_block">
						<p class="element">商家名</p>
						<p class="content">{{info.name}}</p>
					</div>
					<div class="line"></div>
					<div class="line_block">
						<p class="element">配送时间</p>
						<p class="content">{{info.needytime}}分钟</p>
					</div>
					<div class="line"></div>
					<div class="line_block">
						<p class="element">评分</p>
						<p class="content">{{info.credit}}分</p>
					</div>
					<div class="line"></div>
					<div class="line_block">
						<p class="element">销售量</p>
						<p class="content">{{info.sale}}</p>
					</div>
					<div class="line"></div>
					<div class="line_block">
						<p class="element">商家电话</p>
						<p class="content">{{info.phone}}</p>
					</div>
					<div class="line"></div>
					<div class="line_block">
						<p class="element">起送价格</p>
						<p class="content">￥{{info.threshold}}</p>
					</div>
					<div class="line"></div>
					<div class="line_block">
						<p class="element">配送价格</p>
						<p class="content">￥{{info.deliverprice}}</p>
					</div>
					<div class="line"></div>
					<div class="line_block">
						<p class="element">商家地址</p>
						<p class="content" style="position: relative;left: 60rpx;">{{info.address}}</p>
					</div>
					<div class="line"></div>
					<div class="line_block">
						<p class="element">开店时间</p>
						<p class="content">{{info.begintime}}</p>
					</div>
					<div class="line"></div>
					<div class="line_block">
						<p class="element">关店时间</p>
						<p class="content">{{info.endtime}}</p>
					</div>
					<div class="line"></div>
				</div>
				<div v-if="change_key">
					<div class="line_block">
						<p class="element">商家名</p>
						<input class="content" style="position: relative;left: 60rpx;" placeholder="(可修改)"
							v-model="info.name"></p>
					</div>
					<div class="line"></div>
					<div class="line_block">
						<p class="element">配送时间</p>
						<input class="content" style="position: relative;left: 60rpx;" placeholder="(可修改)"
							v-model="info.needytime"></input>
					</div>
					<div class="line"></div>
					<div class="line_block">
						<p class="element">评分</p>
						<input class="content" style="position: relative;left: 60rpx;" placeholder="(可修改)"
							v-model="info.credit"></input>
					</div>
					<div class="line"></div>
					<div class="line_block">
						<p class="element">销售量</p>
						<p class="content" style="position: relative;left: 60rpx;">{{info.sale}}(不可修改)</p>
					</div>
					<div class="line"></div>
					<div class="line_block">
						<p class="element">商家电话</p>
						<input class="content" style="position: relative;left: 60rpx;" placeholder="(可修改)"
							v-model="info.phone"></input>
					</div>
					<div class="line"></div>
					<div class="line_block">
						<p class="element">起送价格</p>
						<input class="content" style="position: relative;left: 60rpx;" placeholder="(可修改)"
							v-model="info.threshold"></input>
					</div>
					<div class="line"></div>
					<div class="line_block">
						<p class="element">配送价格</p>
						<input class="content" style="position: relative;left: 60rpx;" placeholder="(可修改)"
							v-model="info.deliverprice"></input>
					</div>
					<div class="line"></div>
					<div class="line_block">
						<p class="element">商家地址</p>
						<p class="content" style="position: relative;left: 60rpx;" readonly="readonly">
							{{info.address}}(不可修改)
						</p>
					</div>
					<div class="line"></div>
					<div class="line_block">
						<p class="element">开店时间</p>
						<input class="content" style="position: relative;left: 60rpx;" placeholder="(可修改)"
							v-model="info.begintime"></input>
					</div>
					<div class="line"></div>
					<div class="line_block">
						<p class="element">关店时间</p>
						<input class="content" style="position: relative;left: 60rpx;" placeholder="(可修改)"
							v-model="info.endtime"></input>
					</div>
					<div class="line"></div>
				</div>
				<div class="line_block" v-if="change_pwd_key">
					<p class="element">旧密码</p>
					<input class="content" style="position: relative;left: 60rpx;" placeholder="请输入旧密码"
						v-model="pre_pwd"></input>
				</div>
				<div class="line" v-if="change_pwd_key"></div>
				<div class="line_block" v-if="change_pwd_key">
					<p class="element">新密码</p>
					<input class="content" style="position: relative;left: 60rpx;" placeholder="请输入新密码"
						v-model="new_pwd"></input>

				</div>
				<div class="line" v-if="change_pwd_key"></div>
				<button v-if="change_pwd_key" class="btn_style_3" @click="update_passward_shop()">确认修改密码</button>
				<button class="btn_style_2" @click="logout()">退出当前账号</button>
			</view>
		</div>

	</view>

</template>

<script>
	import {
		pathToBase64,
		base64ToPath
	} from '../../js_sdk/mmmm-image-tools/index.js';
	import provinceData from "./provinceAndCity.js"
	export default {
		data() {
			return {
				pre_address: "",
				address_1: "",
				address_2: "",
				address_3: "",
				address_detail: "",
				address_all: "",
				address_update: "",
				cstm_or_sp: 1,
				key: '',
				button_key: '',
				login_on: require("../../static/eye.png"),
				login_no: require("../../static/l_or_r.jpg"),
				info: '',
				change_key: false,
				change_no_key: true,
				change_address_key: false,
				change_no_address_key: true,
				update_info: {
					name: '',
					sex: '',
					address: '',
					birthday: '',
					phone: '',
					headphoto: ''
				},
				change_pwd_key: false,
				pre_pwd: '',
				new_pwd: '',
				oldpProvinceDataList: provinceData.data,
				newProvinceDataList: [
					[],
					[],
					[]
				],
				multiIndex: [0, 0, 0],
				select: '请选择省市区',
				addressData: {
					name: '',
					phone: '',
					address: ''
				},
				binhao: '1'
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
			// 省市区确认事件
			pickerChange: function(e) {
				var _this = this
				_this.multiIndex = e.detail.value
				// 数组内的下标
				console.log(JSON.stringify(_this.multiIndex))
				// 获取省市区总数据
				console.log("我正获得需要信息")
				console.log(_this.newProvinceDataList[0][_this.multiIndex[0]])
				console.log(_this.newProvinceDataList[1][_this.multiIndex[1]])
				console.log(_this.newProvinceDataList[2][_this.multiIndex[2]])
				this.address_1 = _this.newProvinceDataList[0][_this.multiIndex[0]];
				this.address_2 = _this.newProvinceDataList[1][_this.multiIndex[1]];
				this.address_3 = _this.newProvinceDataList[2][_this.multiIndex[2]];
				console.log("我已获得需要信息")
				_this.select =
					_this.newProvinceDataList[0][_this.multiIndex[0]] + "---" +
					_this.newProvinceDataList[1][_this.multiIndex[1]] + "---" +
					_this.newProvinceDataList[2][_this.multiIndex[2]]
			},
			// 每列滑动的监听
			pickerColumnchange: function(e) {
				var _this = this
				// 第几列滑动
				console.log("第几列滑动 = " + JSON.stringify(e.detail.column))
				// 第几列滑动选中的下标
				console.log("第几列滑动选中的下标 = " + JSON.stringify(e.detail.value))
				// 第一列滑动
				if (e.detail.column === 0) {
					_this.multiIndex[0] = e.detail.value
					// 第二列更新相应的数据
					_this.newProvinceDataList[1] = _this.oldpProvinceDataList[_this.multiIndex[0]].city.map((item,
						index) => {
						return item.name
					})
					if (_this.oldpProvinceDataList[_this.multiIndex[0]].city.length === 1) {
						_this.newProvinceDataList[2] = _this.oldpProvinceDataList[_this.multiIndex[0]].city[0].area
							.map((
								item,
								index) => {
								return item
							})
					} else {
						_this.newProvinceDataList[2] = _this.oldpProvinceDataList[_this.multiIndex[0]].city[_this
							.multiIndex[
								1]].area.map((item, index) => {
							return item
						})
					}
					// 第一列滑动  第二列 和第三列 都变为第一个
					_this.multiIndex.splice(1, 1, 0)
					_this.multiIndex.splice(2, 1, 0)
				}
				// 第二列滑动
				if (e.detail.column === 1) {
					_this.multiIndex[1] = e.detail.value
					_this.newProvinceDataList[2] = _this.oldpProvinceDataList[_this.multiIndex[0]].city[_this
						.multiIndex[
							1]].area.map((item, index) => {
						return item
					})
					// 第二列 滑动 第三列 变成第一个
					_this.multiIndex.splice(2, 1, 0)
				}
				// 第三列滑动
				if (e.detail.column === 2) {
					_this.multiIndex[2] = e.detail.value
				}
			},
			goto(url) {
				uni.navigateTo({
					url: '/pages/login/login_username'
				})
			},
			logout() {
				getApp().globalData.login_key = false;
				this.key = false;
				this.button_key = true;
				getApp().globalData.cstm_or_sp = 1;
				this.cstm_or_sp = 1;
				getApp().globalData.token = '';
			},
			change() {
				this.change_key = true;
				this.change_no_key = false;
			},
			change_address() {
				this.change_address_key = true;
				this.change_no_address_key = false;
			},
			save() {
				// console.log("开始打印修改后的信息");
				// console.log(this.info);
				uni.request({
					method: "POST",
					// url: 'http://127.0.0.1:4523/m1/1437509-0-default/customer/changeCustomerInfo',
					url: getApp().globalData.customer_changeCustomerInfo,
					// url: 'https://5t764096g4.goho.co/customer/changeCustomerInfo',
					data: {
						name: this.info.name,
						sex: this.info.sex,
						// defaultaddress: this.info.address,
						birthday: this.info.birthday,
						phone: this.info.phone,
						headphoto: this.info.headphoto
					},
					header: {
						token: getApp().globalData.token
					},
					success: (res) => {
						// this.info = res.data;
						// console.log("修改信息成功");
						this.change_key = false;
						this.change_no_key = true;
						uni.showToast({
							title: "修改成功",
							icon: 'exception',
							duration: 850
						})
					}
				})
			},
			save_address() {
				// console.log("开始打印修改后的信息");
				// console.log(this.info);
				this.address_all = this.address_1 + this.address_2 + this.address_3 + this.address_detail;
				console.log("开始打印新地址");
				console.log(this.address_all);
				this.change_address_key = false;
				this.change_no_address_key = true;
				// uni.request({
				// 	method:'GET',
				// 	url:"https://api.map.baidu.com/geocoding/v3/",
				// 	data:{
				// 		// address:this.address_all,
				// 		address:"北京市海淀区上地十街10号",
				// 		ak:"ymrWo3nwuxL08RBwkKfRBsxC2NIHjF0v"
				// 	},
				// 	header:{

				// 	},
				// 	success: (res) => {
				// 		console.log("开始返回地址打印信息");
				// 		console.log(res.data);
				// 		console.log(typeof(res.data));
				// 		this.address_update=res.data;
				// 	}
				// })
				uni.request({
					method: 'GET',
					url: getApp().globalData.customer_changeAddress,
					data: {
						// pre_address:this.pre_address,
						// new_address:this.address_all,
						// location:this.address_update
						data: this.address_all,
					},
					header: {
						token: getApp().globalData.token
					},
					success: (res) => {
						console.log("修改地址")
						console.log(res)
						if (res.data.code == 1) {
							uni.showToast({
								title: "修改成功",
								icon: 'exception',
								duration: 850
							})
						} else {
							uni.showToast({
								title: "修改失败",
								icon: 'error',
								duration: 850
							})
						}
					}
				})
				// uni.request({
				// 	method: "POST",
				// 	// url: 'http://127.0.0.1:4523/m1/1437509-0-default/customer/changeCustomerInfo',
				// 	url: 'https://v3710z5658.oicp.vip/customer/changeCustomerInfo',
				// 	// url: 'https://5t764096g4.goho.co/customer/changeCustomerInfo',
				// 	data: {
				// 		name: this.info.name,
				// 		sex: this.info.sex,
				// 		// defaultaddress: this.info.address,
				// 		birthday: this.info.birthday,
				// 		phone: this.info.phone,
				// 		headphoto: this.info.headphoto
				// 	},
				// 	header: {
				// 		token: getApp().globalData.token
				// 	},
				// 	success: (res) => {
				// 		// this.info = res.data;
				// 		// console.log("修改信息成功");
				// 		uni.showToast({
				// 			title: "修改成功",
				// 			icon: 'exception',
				// 			duration: 850
				// 		})
				// 	}
				// })
			},
			save_shop() {
				// console.log("开始打印修改后的信息");
				// console.log(this.info);
				uni.request({
					method: "POST",
					// url: 'http://127.0.0.1:4523/m1/1437509-0-default/customer/changeCustomerInfo',
					url: getApp().globalData.business_changeShopInfo,
					// url: 'https://5t764096g4.goho.co/customer/changeCustomerInfo',
					data: {
						name: this.info.name,
						phone: this.info.phone,
						address: this.info.address,
						threshold: this.info.threshold,
						deliverprice: this.info.deliverprice,
						begintime: this.info.begintime,
						endtime: this.info.endtime
					},
					header: {
						token: getApp().globalData.token
					},
					success: (res) => {
						// this.info = res.data;
						console.log("修改信息成功");
						console.log(res);
						this.change_key = false;
						this.change_no_key = true;
						uni.showToast({
							title: "修改成功",
							icon: 'exception',
							duration: 850
						})
					}
				})
			},
			change_passward() {
				this.change_pwd_key = !this.change_pwd_key;
			},
			update_passward() {
				console.log("开始发送密码信息")
				uni.request({
					method: 'POST',
					url: getApp().globalData.customer_ChangePassword,
					data: {
						pre_pwd: this.pre_pwd,
						new_pwd: this.new_pwd
					},
					header: {
						token: getApp().globalData.token
					},
					success: (res) => {
						this.change_pwd_key = 0;
						console.log("开始打印修改密码信息")
						console.log(res)

						if (res.data.code == 1) {
							getApp().globalData.token = res.data.Oauth_Token;
							uni.showToast({
								title: "修改成功",
								icon: 'exception',
								duration: 850
							})
						} else {
							uni.showToast({
								title: "修改失败",
								icon: 'error',
								duration: 850
							})
						}
					}
				})
			},
			update_passward_shop() {
				console.log("开始发送密码信息")
				uni.request({
					method: 'POST',
					url: getApp().globalData.business_changePassword,
					data: {
						pre_pwd: this.pre_pwd,
						new_pwd: this.new_pwd
					},
					header: {
						token: getApp().globalData.token
					},
					success: (res) => {
						this.change_pwd_key = 0;
						console.log("开始打印修改密码信息")
						console.log(res)

						if (res.data.code == 1) {
							getApp().globalData.token = res.data.Oauth_Token;
							uni.showToast({
								title: "修改成功",
								icon: 'exception',
								duration: 850
							})
						} else {
							uni.showToast({
								title: "修改失败",
								icon: 'error',
								duration: 850
							})
						}
					}
				})
			},
			upload_img() {
				if (this.cstm_or_sp == 1) {
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
									console.log(JSON.stringify(base64));
									uni.request({
										// url: 'http://127.0.0.1:4523/m1/1437509-0-default/shop/getAllShopInfo', //仅为示例，并非真实接口地址。
										url: getApp().globalData.customer_changeHeadphoto, //真实端口
										method: "POST", //不设置，默认为get方式
										data: {
											headphoto: JSON.stringify(base64)
										},
										header: {
											token: getApp().globalData.token,
										},
										success: (res) => {
											console.log("接收成功");
											// console.log(res.data.length);
											// console.log(res);
											// this.infos = res.data;
											// uni.request({
											// 	method: "GET",
											// 	url: 'https://v3710z5658.oicp.vip/customer/getCustomerInfo',
											// 	// url:'http://127.0.0.1:4523/m1/1437509-0-default/customer/getCustomerInfo',
											// 	data: {},
											// 	header: {
											// 		token: getApp().globalData.token
											// 	},
											// 	success: (res) => {
											// 		info.headphoto = res.data.headphoto;
											// 		console.log("开始打印个人信息X2");
											// 		console.log(res.data);
											// 	}
											// })
										}
									})
									// that.avatarUpload(base64); //同时将头像上传至数据库进行存储
								})
								.catch(error => {
									console.error(error)
								})
						}
					});
				} else {
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
									uni.request({
										// url: 'http://127.0.0.1:4523/m1/1437509-0-default/shop/getAllShopInfo', //仅为示例，并非真实接口地址。
										url: getApp().globalData.business_changeShopLogo, //真实端口
										method: "POST", //不设置，默认为get方式
										data: {
											newlogo: JSON.stringify(base64)
										},
										header: {
											token: getApp().globalData.token,
										},
										success: (res) => {
											console.log("接收成功");
											// console.log(res.data.length);
											// console.log(res);
											// this.infos = res.data;
											// uni.request({
											// 	method: "GET",
											// 	url: 'https://v3710z5658.oicp.vip/customer/getCustomerInfo',
											// 	// url:'http://127.0.0.1:4523/m1/1437509-0-default/customer/getCustomerInfo',
											// 	data: {},
											// 	header: {
											// 		token: getApp().globalData.token
											// 	},
											// 	success: (res) => {
											// 		info.headphoto = res.data.headphoto;
											// 		console.log("开始打印个人信息X2");
											// 		console.log(res.data);
											// 	}
											// })
										}
									})
									// that.avatarUpload(base64); //同时将头像上传至数据库进行存储
								})
								.catch(error => {
									console.error(error)
								})
						}
					});
				}

			}
		},
		onLoad() {
			this.key = getApp().globalData.login_key;
			this.button_key = !this.key;
			if (this.key == true) {
				this.cstm_or_sp = getApp().globalData.cstm_or_sp;
				if (this.cstm_or_sp == 1) {
					// 开始省市区默认数据
					var _this = this
					// 省
					for (let i = 0; i < _this.oldpProvinceDataList.length; i++) {
						_this.newProvinceDataList[0].push(_this.oldpProvinceDataList[i].name)
					}
					// 市
					for (let i = 0; i < _this.oldpProvinceDataList[0].city.length; i++) {
						_this.newProvinceDataList[1].push(_this.oldpProvinceDataList[0].city[i].name)
					}
					// 区县
					for (let i = 0; i < _this.oldpProvinceDataList[0].city[0].area.length; i++) {
						_this.newProvinceDataList[2].push(_this.oldpProvinceDataList[0].city[0].area[i])
					}
					uni.request({
						method: "GET",
						url: getApp().globalData.customer_getCustomerInfo,
						// url:'http://127.0.0.1:4523/m1/1437509-0-default/customer/getCustomerInfo',
						// url: 'https://5t764096g4.goho.co/customer/getCustomerInfo',
						data: {},
						header: {
							token: getApp().globalData.token
						},
						success: (res) => {
							this.info = res.data;
							console.log("开始打印个人信息");
							console.log(res);
							this.pre_address = res.data.address;
						}
					})
				} else {
					uni.request({
						method: "GET",
						url: getApp().globalData.business_getShopInfo,
						data: {},
						header: {
							token: getApp().globalData.token
						},
						success: (res) => {
							this.info = res.data;
							console.log("开始打印商铺信息");
							console.log(res);
						}
					})
				}

			} else {}
		},
		onShow() {
			this.key = getApp().globalData.login_key;
			this.button_key = !this.key;
			if (this.key == true) {
				this.cstm_or_sp = getApp().globalData.cstm_or_sp;
				if (this.cstm_or_sp == 1) {
					// 开始省市区默认数据
					var _this = this
					// 省
					for (let i = 0; i < _this.oldpProvinceDataList.length; i++) {
						_this.newProvinceDataList[0].push(_this.oldpProvinceDataList[i].name)
					}
					// 市
					for (let i = 0; i < _this.oldpProvinceDataList[0].city.length; i++) {
						_this.newProvinceDataList[1].push(_this.oldpProvinceDataList[0].city[i].name)
					}
					// 区县
					for (let i = 0; i < _this.oldpProvinceDataList[0].city[0].area.length; i++) {
						_this.newProvinceDataList[2].push(_this.oldpProvinceDataList[0].city[0].area[i])
					}
					uni.request({
						method: "GET",
						url: getApp().globalData.customer_getCustomerInfo,
						// url:'http://127.0.0.1:4523/m1/1437509-0-default/customer/getCustomerInfo',
						// url: 'https://5t764096g4.goho.co/customer/getCustomerInfo',
						data: {},
						header: {
							token: getApp().globalData.token
						},
						success: (res) => {
							this.info = res.data;
							console.log("开始打印个人信息");
							console.log(res);
							this.pre_address = res.data.address;
						}
					})
				} else {
					uni.request({
						method: "GET",
						url: getApp().globalData.business_getShopInfo,
						data: {},
						header: {
							token: getApp().globalData.token
						},
						success: (res) => {
							this.info = res.data;
							console.log("开始打印商铺信息");
							console.log(res);
						}
					})
				}

			} else {}
		}
	}
</script>

<style>
	.login_or_register {
		display: flex;
	}

	.img_block {
		/* 		align-items: center;
		vertical-align: center; */
		display: flex;
		margin: 50rpx;
		border: 4rpx solid black;
		border-radius: 50%;
		padding: 10rpx;
	}

	.img_style {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
	}

	.btn_style {

		background-color: #fefa83; //按钮颜色
		border-radius: 20rpx; //按钮弧度
		width: 290rpx; //宽度
		height: 95rpx;
		box-shadow: 4rpx 4rpx 2rpx 2rpx #8f8f94;
		position: relative;
		left: -110rpx;
		top: 75rpx;
	}

	.line {
		background-color: black;
		width: 90%;
		height: 2rpx;
		margin: auto;
		color: #bbbbbb;
	}

	.all {
		margin-bottom: 0;
	}

	.login_or_register {
		display: flex;
	}

	.img_block {
		/* 		align-items: center;
		vertical-align: center; */
		display: flex;
		margin: 50rpx;
		border: 4rpx solid black;
		border-radius: 50%;
		padding: 10rpx;
	}

	.img_style {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
	}

	.p_1 {
		width: 550rpx;
		height: 100rpx;
		margin-top: 50rpx;
		margin-left: 0rpx;
		/* text-align: center; */
		justify-content: center;
		font-size: 60rpx;
		background-color: #fff;
		line-height: 60px;
		font-weight: bolder;
	}

	.p_2 {
		font-weight: 500;
		font-size: 60rpx;
		margin: 30rpx;
		margin-bottom: 70rpx;
	}

	.line {
		background-color: #bbbbbb;
		width: 90%;
		height: 2rpx;
		margin: auto;

		margin-top: 10rpx;
	}

	/* 	.detail {
		display: flex;
	}
	
	.line_block {
		display: flex;
		margin-left: 30rpx;
	}
	
	.element {
		color: #bbbbbb;
		margin-left: 30rpx;
	}
	
	.content {
		float: right;
	} */
	.element {
		color: #909090;
		margin-left: 30rpx;
		font-size: 40rpx;
		margin-top: 10rpx;
		width: 300rpx;
		text-justify: auto;
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

	.btn_style_2 {
		width: 300rpx;
		margin-top: 30rpx;
		color: #8f8f94;
		background-color: #fefa83;
		margin-top: 20%;
		border-radius: 25rpx;
		box-shadow: 4rpx 4rpx 2rpx 2rpx #8f8f94;

	}

	.btn_style_3 {
		width: 300rpx;
		margin-top: 30rpx;
		margin-bottom: -60rpx;
		color: #8f8f94;
		background-color: #fefa83;
		/* 		margin-top: 20%; */
		border-radius: 25rpx;
		box-shadow: 4rpx 4rpx 2rpx 2rpx #8f8f94;

	}

	.btn_1 {

		border: none;
		background-color: #f0e3f2;
		text-align: center;
		justify-content: center;
		height: 90rpx;
		margin-top: 30rpx;
		border-radius: 45rpx;

	}

	.btn_2 {
		border: none;
		background-color: #f0e3f2;
		text-align: center;
		justify-content: center;
		height: 90rpx;
		margin-top: 30rpx;
		border-radius: 45rpx;
	}

	button::after {
		border: none;
	}

	input_text1 {
		margin-left: 30rpx;
		font-size: 40rpx;
		margin-top: 10rpx;
	}

	input_text2 {
		margin-left: 20rpx;
		text-align: center;
		margin: auto;
	}

	.input_block {
		text-align: center;
		margin-left: 30rpx;
	}
</style>
