<script>
	export default {
		data() {
			return {
			
			}
		},
		globalData: {
			// 测试代码
			// token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjMuMDAwMTExMTEyNzcxODM3ZSsxOCwiaWF0IjoxNjYwNzI1ODc3LjQ3MTE4LCJpc3MiOiJCYmJhY2siLCJkYXRhIjp7ImFjY291bnQiOiIzNDIxIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJ0aW1lc3RhbXAiOjE2NjA3MjU4NzcuNDcxMTh9fQ.HgYoOUNAy69CrfIgZI8K4PuFedsxcEuUj5igKZXWFj4',
			// login_key: true
			//正式版本
			token: '',
			login_key: '',
			pre_return_from_shop:'' //上一次从哪个商铺返回
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
