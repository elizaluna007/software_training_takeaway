<script>
	export default {
		data() {
			return {

			}
		},
		globalData: {
			// ***顾客端测试代码(常登录状态，token可能有变)
			token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjMuMDAwMTExMTEyNzcxOTg1ZSsxOCwiaWF0IjoxNjYwODczOTIwLjExNzk5NSwiaXNzIjoiQmJiYWNrIiwiZGF0YSI6eyJhY2NvdW50IjoiMzQyMSIsInBhc3N3b3JkIjoiMTExMTExIiwidGltZXN0YW1wIjoxNjYwODczOTIwLjExNzk5NX19.2yVCOf-pM-LIiY8eJojRxTlWf6nY1YGIJSh-yM-jKxI',
			login_key: true,
			pre_return_from_shop: '0', //上一次从哪个商铺返回
			cstm_or_sp: 1, //默认是顾客
			login_key: true

			// ***正式版本
			// token: '',
			// login_key: false,
			// pre_return_from_shop: '', //上一次从哪个商铺返回
			// cstm_or_sp: 1, //默认是顾客

			// *** 商家登录状态(常登录状态， token可能有变)
			// token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjMuMDAwMTExMTEyNzcyMDAyM2UrMTgsImlhdCI6MTY2MDg5MTI3My4xNDE0MDk5LCJpc3MiOiJCYmJhY2siLCJkYXRhIjp7ImFjY291bnQiOiJrZW5kZWppIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJ0aW1lc3RhbXAiOjE2NjA4OTEyNzMuMTQxNDA5OX19.-BY4IVMLtFFncdWs1Ho4LH9g6nuOSy1t2nWjqKNOMhI',
			// login_key: true,
			// pre_return_from_shop: '0', //上一次从哪个商铺返回
			// cstm_or_sp: 0 //默认1是顾客，0是商家
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
