<template>
	<div>
		<div class="line_block">
			<p class="element">地址</p>
			<view class="input" type="text" placeholder="请选择地区">
				<picker class="pickerList" mode="multiSelector" :range="newProvinceDataList" :value="multiIndex"
					@change="pickerChange" @columnchange="pickerColumnchange">
					<view class="">{{select}}</view>
				</picker>
			</view>
		</div>
		<input placeholder="请输入更详细的地理位置" v-model="address_detail">
	</div>
</template>

<script>
	export default {
		data() {
			return {
				data: {

				}
			}
		},
		onload() {
			// 开始省市区默认数据
			var _this = this;
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
		},
		// methods {
		// 	// 省市区确认事件
		// 	pickerChange: function(e) {
		// 		var _this = this
		// 		_this.multiIndex = e.detail.value
		// 		// 数组内的下标
		// 		console.log(JSON.stringify(_this.multiIndex))
		// 		// 获取省市区总数据
		// 		console.log("我正获得需要信息")
		// 		console.log(_this.newProvinceDataList[0][_this.multiIndex[0]])
		// 		console.log(_this.newProvinceDataList[1][_this.multiIndex[1]])
		// 		console.log(_this.newProvinceDataList[2][_this.multiIndex[2]])
		// 		this.address_1 = _this.newProvinceDataList[0][_this.multiIndex[0]];
		// 		this.address_2 = _this.newProvinceDataList[1][_this.multiIndex[1]];
		// 		this.address_3 = _this.newProvinceDataList[2][_this.multiIndex[2]];
		// 		console.log("我已获得需要信息")
		// 		_this.select =
		// 			_this.newProvinceDataList[0][_this.multiIndex[0]] + "---" +
		// 			_this.newProvinceDataList[1][_this.multiIndex[1]] + "---" +
		// 			_this.newProvinceDataList[2][_this.multiIndex[2]]
		// 	},
		// 	// 每列滑动的监听
		// 	pickerColumnchange: function(e) {
		// 		var _this = this
		// 		// 第几列滑动
		// 		console.log("第几列滑动 = " + JSON.stringify(e.detail.column))
		// 		// 第几列滑动选中的下标
		// 		console.log("第几列滑动选中的下标 = " + JSON.stringify(e.detail.value))
		// 		// 第一列滑动
		// 		if (e.detail.column === 0) {
		// 			_this.multiIndex[0] = e.detail.value
		// 			// 第二列更新相应的数据
		// 			_this.newProvinceDataList[1] = _this.oldpProvinceDataList[_this.multiIndex[0]].city.map((item,
		// 				index) => {
		// 				return item.name
		// 			})
		// 			if (_this.oldpProvinceDataList[_this.multiIndex[0]].city.length === 1) {
		// 				_this.newProvinceDataList[2] = _this.oldpProvinceDataList[_this.multiIndex[0]].city[0].area
		// 					.map((
		// 						item,
		// 						index) => {
		// 						return item
		// 					})
		// 			} else {
		// 				_this.newProvinceDataList[2] = _this.oldpProvinceDataList[_this.multiIndex[0]].city[_this
		// 					.multiIndex[
		// 						1]].area.map((item, index) => {
		// 					return item
		// 				})
		// 			}
		// 			// 第一列滑动  第二列 和第三列 都变为第一个
		// 			_this.multiIndex.splice(1, 1, 0)
		// 			_this.multiIndex.splice(2, 1, 0)
		// 		}
		// 		// 第二列滑动
		// 		if (e.detail.column === 1) {
		// 			_this.multiIndex[1] = e.detail.value
		// 			_this.newProvinceDataList[2] = _this.oldpProvinceDataList[_this.multiIndex[0]].city[_this
		// 				.multiIndex[
		// 					1]].area.map((item, index) => {
		// 				return item
		// 			})
		// 			// 第二列 滑动 第三列 变成第一个
		// 			_this.multiIndex.splice(2, 1, 0)
		// 		}
		// 		// 第三列滑动
		// 		if (e.detail.column === 2) {
		// 			_this.multiIndex[2] = e.detail.value
		// 		}
		// 	},
		// 	save_address() {
		// 		// console.log("开始打印修改后的信息");
		// 		// console.log(this.info);
		// 		this.address_all = this.address_1 + this.address_2 + this.address_3 + this.address_detail;
		// 		console.log("开始打印新地址");
		// 		console.log(this.address_all);


		// 		uni.request({
		// 			method: 'GET',
		// 			url: "https://api.map.baidu.com/geocoding/v3/",
		// 			// url:'https://restapi.amap.com/v3/geocode/geo?parameters',
		// 			data: {
		// 				// address:this.address_all,
		// 				address: "北京市海淀区上地十街10号",
		// 				ak: "ymrWo3nwuxL08RBwkKfRBsxC2NIHjF0v"
		// 				// key:"547e87a60120f0351ed920f211c44909"
		// 				// output:"xml"
		// 			},
		// 			header: {

		// 			},
		// 			success: (res) => {
		// 				console.log("开始返回地址打印信息");
		// 				console.log(res);
		// 				console.log(res.data);
		// 				console.log(typeof(res.data));
		// 				this.address_update = res.data;
		// 				for (var i = 0; i < this.address_update.length; i++) {
		// 					if (this.address_update[i] == 'g') {
		// 						console.log("开始打印位置");
		// 						console.log(this.address_update[i + 2]);
		// 					}
		// 				}
		// 				// uni.request({
		// 				// 	method:'POST',
		// 				// 	url:'https://5t764096g4.goho.co/customer/addAddress',
		// 				// 	data:{
		// 				// 		sth:{
		// 				// 			address:"北京市海淀区上地十街10号",
		// 				// 			location:this.address_update
		// 				// 		}
		// 				// 	},
		// 				// 	header:{
		// 				// 		token:getApp().globalData.token,
		// 				// 	},
		// 				// 	success: (res) => {
		// 				// 		console.log(res);
		// 				// 	}
		// 				// })
		// 			}
		// 		})
		// 		uni.request({
		// 			method: 'POST',
		// 			url: "https://v3710z5658.oicp.vip/customer/changeAddress",
		// 			data: {
		// 				pre_address: this.pre_address,
		// 				new_address: this.address_all,
		// 				location: this.address_update
		// 			},
		// 			header: {
		// 				token: getApp().globalData.token
		// 			}
		// 		})
		// 		// uni.request({
		// 		// 	method: "POST",
		// 		// 	// url: 'http://127.0.0.1:4523/m1/1437509-0-default/customer/changeCustomerInfo',
		// 		// 	url: 'https://v3710z5658.oicp.vip/customer/changeCustomerInfo',
		// 		// 	// url: 'https://5t764096g4.goho.co/customer/changeCustomerInfo',
		// 		// 	data: {
		// 		// 		name: this.info.name,
		// 		// 		sex: this.info.sex,
		// 		// 		// defaultaddress: this.info.address,
		// 		// 		birthday: this.info.birthday,
		// 		// 		phone: this.info.phone,
		// 		// 		headphoto: this.info.headphoto
		// 		// 	},
		// 		// 	header: {
		// 		// 		token: getApp().globalData.token
		// 		// 	},
		// 		// 	success: (res) => {
		// 		// 		// this.info = res.data;
		// 		// 		// console.log("修改信息成功");
		// 		// 		uni.showToast({
		// 		// 			title: "修改成功",
		// 		// 			icon: 'exception',
		// 		// 			duration: 850
		// 		// 		})
		// 		// 	}
		// 		// })
		// 	}
		// }
	}
</script>

<style>
</style>
