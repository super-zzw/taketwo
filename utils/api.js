//接口
export default{
	login:'/wechat/team/auth/login', //登录
	bindPhone:'/wechat/team/auth/bind', //绑定手机号
	config:'/legwork/config/list', //获取公共配置
	getMemberInfo:'/wechat/team/auth/member/info' ,//获取个人信息
	refreshToken:'/wechat/team/auth/refresh/token' ,//刷新token
	getSchoolList:'/wechat/team/auth/school/list'  ,//获取团队下学校列表
	changeSchool:'/wechat/team/auth/change/school', //选择学校
	changeTeam:'/wechat/team/auth/change',   //选择团队
	getAreaList:'/wechat/team/auth/area/list', //获取学校楼栋楼层信息
	getSorterList:'/legwork/team/member/sorter/list' , //分拣订单列表
	getDeliveryList:'/legwork/team/member/delivery/list' , //配送订单列表
	getRole:'/legwork/team/member/role', //当前角色
	getSorterData:'/legwork/team/member/sorter/data',  //分拣接单数据
	getDeliveryData:'/legwork/team/member/delivery/data'  ,//配送接单数据
	orderDetail:'/legwork/team/member/sorter/detail', //订单详情
	sorterReceiving:'/legwork/team/member/sorter/receiving', //分拣接单
	getLabelList:'/legwork/config/label/list', //获取标签列表
	chargeback:'/legwork/team/member/sorter/chargeback', //退单


	bindTeam:"/wechat/team/auth/change",  //切换团队
	bindSchool:"/wechat/team/auth/change/school",  //切换学校
}