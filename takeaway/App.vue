<script>
	export default {
		data() {
			return {

			}
		},
		globalData: {
			// ***顾客端测试代码(常登录状态，token可能有变)
			// token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjMuMDAwMTExMTEyNzcxOTg1ZSsxOCwiaWF0IjoxNjYwODczOTIwLjExNzk5NSwiaXNzIjoiQmJiYWNrIiwiZGF0YSI6eyJhY2NvdW50IjoiMzQyMSIsInBhc3N3b3JkIjoiMTExMTExIiwidGltZXN0YW1wIjoxNjYwODczOTIwLjExNzk5NX19.2yVCOf-pM-LIiY8eJojRxTlWf6nY1YGIJSh-yM-jKxI',
			// login_key: true,
			// pre_return_from_shop: '0', //上一次从哪个商铺返回
			// cstm_or_sp: 1, //默认是顾客
			// login_key: true

			// ***正式版本
			token: '',
			login_key: false,
			pre_return_from_shop: '', //上一次从哪个商铺返回
			cstm_or_sp: 1, //默认是顾客
			// ip:"http://49.235.88.155:8000"
			
			// *** 商家登录状态(常登录状态， token可能有变)
			// token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjMuMDAwMTExMTEyNzcyMDAyM2UrMTgsImlhdCI6MTY2MDg5MTI3My4xNDE0MDk5LCJpc3MiOiJCYmJhY2siLCJkYXRhIjp7ImFjY291bnQiOiJrZW5kZWppIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJ0aW1lc3RhbXAiOjE2NjA4OTEyNzMuMTQxNDA5OX19.-BY4IVMLtFFncdWs1Ho4LH9g6nuOSy1t2nWjqKNOMhI',
			// login_key: true,
			// pre_return_from_shop: '0', //上一次从哪个商铺返回
			// cstm_or_sp: 0 //默认1是顾客，0是商家
			
			//以下为接口的URL(宝塔)
			//customer
			customer_customerLogin: 'http://49.235.88.155:8000/customer/customerLogin',
			customer_customerRegister: 'http://49.235.88.155:8000/customer/customerRegister',
			customer_ChangePassword: 'http://49.235.88.155:8000/customer/ChangePassword',
			customer_getCustomerInfo: 'http://49.235.88.155:8000/customer/getCustomerInfo',
			customer_changeCustomerInfo: 'http://49.235.88.155:8000/customer/changeCustomerInfo',
			customer_getCustomerAddress: 'http://49.235.88.155:8000/customer/getCustomerAddress',
			customer_changeHeadphoto: 'http://49.235.88.155:8000/customer/changeHeadphoto',
			customer_changeAddress: 'http://49.235.88.155:8000/customer/changeAddress',
			customer_addAddress:'http://49.235.88.155:8000/customer/addAddress',
			customer_changeAddress1:'http://49.235.88.155:8000/customer/changeAddress1',
			
			//business
			business_shopLogin: 'http://49.235.88.155:8000/business/shopLogin',
			business_changePassword:'http://49.235.88.155:8000/business/changePassword',
			business_getOneGood: 'http://49.235.88.155:8000/business/getOneGood',
			business_getAllGoods:'http://49.235.88.155:8000/business/getAllGoods',
			business_addGood:'http://49.235.88.155:8000/business/addGood',
			business_deleteGood:'http://49.235.88.155:8000/business/deleteGood',
			business_getAllOrders:'http://49.235.88.155:8000/business/getAllOrders',
			business_changeOrderStatus:'http://49.235.88.155:8000/business/changeOrderStatus',
			business_changeGood:'http://49.235.88.155:8000/business/changeGood',
			business_changeGoodPhoto:'http://49.235.88.155:8000/business/changeGoodPhoto',
			business_getShopInfo:'http://49.235.88.155:8000/business/getShopInfo',
			business_changeShopInfo:'http://49.235.88.155:8000/business/changeShopInfo',
			business_changeShopLogo:'http://49.235.88.155:8000/business/changeShopLogo',
			
			//shop
			shop_getAllShopInfo:'http://49.235.88.155:8000/shop/getAllShopInfo',
			shop_getOneShopInfo:'http://49.235.88.155:8000/shop/getOneShopInfo',
			shop_getAllGoodsByName:'http://49.235.88.155:8000/shop/getAllGoodsByName',
			shop_searchShopByName:'http://49.235.88.155:8000/shop/searchShopByName',
			
			//buy
			buy_addItemByName:'http://49.235.88.155:8000/buy/addItemByName',
			buy_deleteItemByName:'http://49.235.88.155:8000/buy/deleteItemByName',
			buy_deleteAllShoppingCart:'http://49.235.88.155:8000/buy/deleteAllShoppingCart',
			buy_confirmShoppingCart:'http://49.235.88.155:8000/buy/confirmShoppingCart',
			
			//order
			order_getAllOrdersInfo:'http://49.235.88.155:8000/order/getAllOrdersInfo',
			order_getOneOrderInfo:'http://49.235.88.155:8000/order/getOneOrderInfo',
			
			//comment
			comment_getCommentsByName:'http://49.235.88.155:8000/comment/getCommentsByName',
			comment_addComment:'http://49.235.88.155:8000/comment/addComment',
			comment_deleteComment:'http://49.235.88.155:8000/comment/deleteComment'
			
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
