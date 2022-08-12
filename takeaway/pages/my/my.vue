<template>
	<button type="default" @click="goto()">登录/注册</button>
</template>

<script>
	export default {
			methods: {
				goto(url) {
					uni.navigateTo({
						url:'/pages/login/login_phone'
					})
				}
			}
		}
</script>

<style>
</style>