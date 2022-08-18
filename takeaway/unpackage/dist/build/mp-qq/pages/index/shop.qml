<view class="content"><view data-event-opts="{{[['tap',[['exit_shop_car',['$event']]]]]}}" class="order_page" bindtap="__e"><view class="topic"><image class="logo" src="{{logo}}"></image><text class="shopName">{{name}}</text><text class="topic_text" space="ensp">{{credit+"分 月售"+sale+" 配送约"+needytime+"分钟"}}</text></view><view class="three_button"><button data-event-opts="{{[['tap',[['active_tabBar_Handle',[0]]]]]}}" class="{{[active_tabBar===0?'active_order':'order']}}" bindtap="__e">点菜</button><button data-event-opts="{{[['tap',[['active_tabBar_Handle',[1]]]]]}}" class="{{[active_tabBar===1?'active_command':'command']}}" bindtap="__e">评价</button><button data-event-opts="{{[['tap',[['active_tabBar_Handle',[2]]]]]}}" class="{{[active_tabBar===2?'active_shop_inf':'shop_inf']}}" bindtap="__e">商家</button></view><block qq:if="{{active_tabBar===0}}"><view class="order_page_order"><scroll-view class="dish_pos_right" scroll-y="true" scroll-into-view="{{active_id}}" data-event-opts="{{[['scroll',[['rightScroll',['$event']]]]]}}" bindscroll="__e"><block qq:for="{{categories}}" qq:for-item="category" qq:for-index="index1" qq:key="index1"><view class="right_box" id="{{'category'+index1}}"><block qq:for="{{category.dishes}}" qq:for-item="goods" qq:for-index="index2" qq:key="index2"><view class="list_2"><image class="img_style _img" src="{{goods.logo}}" mode="aspectFit"></image><view class="describe _div"><view class="p_1 _p">{{goods.name}}</view><view class="p_2 _p">{{goods.description}}</view><view class="p_3 _p">{{"销量:"+goods.sale}}</view><view class="p_4 _p">{{"¥"+goods.price}}</view><view class="add_sub"><block qq:if="{{dish_number[index1][index2]}}"><view class="hide"><image class="p_sub" src="{{sub_icon}}" data-event-opts="{{[['tap',[['click_sub',[index1,index2]]]]]}}" bindtap="__e"></image><text class="number">{{dish_number[index1][index2]}}</text></view></block><image class="p_add" src="{{add_icon}}" data-event-opts="{{[['tap',[['click_add',[index1,index2]]]]]}}" bindtap="__e"></image></view></view></view></block></view></block><view class="bottom_hint">已经到底了！</view></scroll-view><scroll-view class="cate_pos_left" scroll-y="true"><block qq:for="{{categories}}" qq:for-item="category" qq:for-index="index"><view data-event-opts="{{[['tap',[['leftClickHandle',[index]]]]]}}" class="{{[active===index?'active_list':'list']}}" bindtap="__e"><view class="{{[active===index?'active_p_5':'p_5']}}">{{category.category}}</view></view></block></scroll-view></view></block><block qq:else><block qq:if="{{active_tabBar===1}}"><view class="bottom_hint">空空如也</view></block><block qq:else><block qq:if="{{active_tabBar===2}}"><view class="bottom_hint">空空如也</view></block></block></block></view><view class="shop_car_page" hidden="{{hidden}}"><view class="shop_car_top"></view><view data-event-opts="{{[['tap',[['shop_clear',['$event']]]]]}}" class="shop_car_clear" bindtap="__e">清空购物车</view><scroll-view class="shop_dish_pos_right" scroll-y="true"><block qq:for="{{categories}}" qq:for-item="category" qq:for-index="index1" qq:key="index1"><view class="right_box" id="{{'category'+index1}}"><block qq:for="{{category.dishes}}" qq:for-item="goods" qq:for-index="index2" qq:key="index2"><block qq:if="{{dish_number[index1][index2]!=0}}"><view class="list_2"><image class="img_style _img" src="{{goods.logo}}" mode="aspectFit"></image><view class="describe _div" style="display:table-column;"><view class="p_1 _p">{{goods.name}}</view><view class="p_2 _p">{{goods.description}}</view><view class="p_3 _p">{{"销量:"+goods.sale}}</view><view class="p_4 _p">{{"¥"+goods.price}}</view><view class="add_sub"><block qq:if="{{dish_number[index1][index2]}}"><view class="hide"><image class="p_sub" src="{{sub_icon}}" data-event-opts="{{[['tap',[['click_sub',[index1,index2]]]]]}}" bindtap="__e"></image><text class="number">{{dish_number[index1][index2]}}</text></view></block><image class="p_add" src="{{add_icon}}" data-event-opts="{{[['tap',[['click_add',[index1,index2]]]]]}}" bindtap="__e"></image></view></view></view></block></block></view></block><view class="bottom_hint">已经到底了！</view></scroll-view></view><view data-event-opts="{{[['tap',[['details',['$event']]]]]}}" class="shop_car" bindtap="__e"><text class="total_cost">{{"¥"+sumprice}}</text><text class="shipping_fees">{{"预估另需配送费¥"+threshold}}</text></view><button data-event-opts="{{[['tap',[['goto_pay',['$event']]]]]}}" class="pay" bindtap="__e">去结算</button></view>