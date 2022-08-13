<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>商家名称：{{shop_name}}</view>
		<view>配送时间：{{time}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shop_name : '肯德基',
				time : '30'
			}
		},
		onLoad(index_data) {
			this.shop_name = index_data.shop_name
			this.time = index_data.time
		},
		methods: {
			
		}
	}
</script>

<style>
	
</style>
