<template>
	<view>
		<button @click="get_location()">
			开始发送定位信息
		</button>
		<button @click="getAddress()">
			开始转换定位信息
		</button>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				longitude: "", // 当前位置经度
				latitude: "", // 当前位置纬度
				markers: [], // 获取位置的标记信息
			}
		},
		methods: {
			get_location() {
				console.log("开始定位");
				let then = this;
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						console.log(res);
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);	
						this.longitude = res.longitude;
						this.latitude = res.latitude;
						let lon = this.longitude;
						let lat = this.latitude;
						uni.request({
							url: 'https://api.map.baidu.com/reverse_geocoding/v3/', //仅为示例，并非真实接口地址。
							data: {
								output: 'json',
								location: `${lat},${lon}`,
								ak: "ymrWo3nwuxL08RBwkKfRBsxC2NIHjF0v",
								extensions: 'base',
								batch: false
							},
							success: (res) => {
								console.log("通过经纬度逆地址解析", res);
								console.log(res.data.result.formatted_address);
							}
						});
					}
				});
			},
			getAddress() {
				uni.request({
					url: 'https://api.map.baidu.com/location/ip', //仅为示例，并非真实接口地址。
					data: {	
						ak: "ymrWo3nwuxL08RBwkKfRBsxC2NIHjF0v",
					},
					success: (res) => {
						console.log("百度地图定位结果——");
						console.log(res);
					}
				});
				uni.request({
					url:'https://restapi.amap.com/v3/ip?parameters',
					data:{
						key:"547e87a60120f0351ed920f211c44909"
					},
					success: (res) => {
						console.log("高德地图定位结果——");
						console.log(res.data.rectangle)
						console.log(typeof(res.data.rectangle))
					}
				})

			}
		},
	}
</script>

<style>
</style>
