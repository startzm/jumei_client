import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/home/Home'
import GoodDetail from '@/components/good/GoodDetail'
import GoodList from '@/components/good_list/GoodList'
import Store from '@/components/store/Store'
import ActivityDetail from '@/components/store/ActivityDetail'
import Group from '@/components/group/Group'
import GroupDetail from '@/components/group/GroupDetail'
import Mine from '@/components/mine/Mine'
import Login from '@/components/mine/Login'
import History from '@/components/mine/History'
import Cart from '@/components/cart/Cart'
import Order from '@/components/order/Order'
import OrderDetail from '@/components/order/OrderDetail'
import OrderComment from '@/components/order/OrderComment'
import NewAddress from '@/components/mine/NewAddress'
import Address from '@/components/mine/Address'
import CreateOrder from '@/components/order/CreateOrder'
import Payment from '@/components/order/Payment'
import DailyLottery from '@/components/other/DailyLottery'
import Signin from '@/components/other/Signin'
import Coupon from '@/components/other/Coupon'
import CouponRule from '@/components/other/components/CouponRule'
import Integral from '@/components/other/Integral'
import IntegralRule from '@/components/other/components/IntegralRule'
import Setting from '@/components/setting/Setting'
import Collect from '@/components/other/Collect'
import ActivitiesCalendar from '@/components/other/ActivitiesCalendar'
import About from '@/components/setting/About'
import RuleDetail from '@/components/setting/components/RuleDetail'
import ChangePwd from '@/components/setting/ChangePwd'
import ChangeProfile from '@/components/setting/ChangeProfile'
import ChangeUsername from '@/components/setting/components/ChangeUsername'
import ChangeGender from '@/components/setting/components/ChangeGender'
import ChangeSlogon from '@/components/setting/components/ChangeSlogon'
import OftenBuy from '@/components/other/OftenBuy'
import Question from '@/components/other/Question'
import QuestionList from '@/components/other/QuestionList'
import QuestionDetail from '@/components/other/QuestionDetail'
import Chat from '@/components/mine/Chat'
import ExpressMessage from '@/components/mine/ExpressMessage'
import EmptyItem from '@/components/mine/components/EmptyItem'
import Wish from '@/components/other/Wish'
import ChangeWish from '@/components/other/ChangeWish'
import Comment from '@/components/mine_menu/Comment'

import Fans from '@/components/mine_menu/Fans'
import Follow from '@/components/mine_menu/Follows'
import Video from '@/components/mine_menu/Video'
import Like from '@/components/mine_menu/Like'
import Balance from '@/components/mine_menu/Balance'
import Exchange from '@/components/mine_menu/Exchange'
import QuestionAndAnswer from '@/components/mine_menu/QuestionAnswer'
import Fxxf from '@/components/mine_menu/Fxxf'
import License from '@/components/mine_menu/License'
import Aunt from '@/components/mine_menu/Aunt'
import Redenvelope from '@/components/mine_menu/Redenvelope'
import LoveCount from '@/components/mine_menu/LoveCount'
import FaceLoan from '@/components/mine_menu/FaceLoan'
import FeedBack from '@/components/mine_menu/FeedBack'
import Banding from '@/components/setting/Banding'
import SaleReminder from '@/components/mine_menu/SaleReminder'
import RedEveryOne from '@/components/mine_menu/RedEveryOne'
import MessageSettings from '@/components/setting/MessageSettings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home/'
    },
    {
      path: '/home/',
      name: 'Home',
      component: Home,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/good_detail/:id',
      name: 'GoodDetail',
      component: GoodDetail
    },
    {
      path: '/good_list/',
      name: 'GoodList',
      component: GoodList,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/store/',
      name: 'Store',
      component: Store,
      // meta: {
      //   keepAlive: true
      // }
    },
    {
      path: '/act/',
      name: 'Act',
      component: ActivityDetail,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/yiqituan/',
      name: 'Group',
      component: Group,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/groupDetail/',
      name: 'GroupDetail',
      component: GroupDetail
    },
    {
      path: '/mine/',
      name: 'Mine',
      component: Mine
    },
    {
      path: '/login/',
      name: 'Login',
      component: Login
    },
    {
      path: '/history/',
      name: 'History',
      component: History
    },
    {
      path: '/cart/',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/order/',
      name: 'Order',
      component: Order
    },
    {
      path: '/new_address/',
      name: 'NewAddress',
      component: NewAddress
    },
    {
      path: '/address/',
      name: 'Address',
      component: Address
    },
    {
      path: '/create_order',
      name: 'CreateOrder',
      component: CreateOrder,
    },
    {
      path: '/order_detail',
      name: 'OrderDetail',
      component: OrderDetail
    },
    {
      path: '/order_comment/',
      name: 'OrderComment',
      component: OrderComment
    },
    {
      path: '/payment',
      name: 'Payment',
      component: Payment,

    },
    {
      path: '/daily_lottery',
      name: 'DailyLottery',
      component: DailyLottery
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/coupon',
      name: 'Coupon',
      component: Coupon
    },
    {
      path: '/integral',
      name: 'Integral',
      component: Integral
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    },
    {
      path: '/collect',
      name: 'Collect',
      component: Collect
    },
    {
      path: '/fans',
      name: 'Fans',
      component: Fans
    },
    {
      path: '/follow',
      name: 'Follow',
      component: Follow
    },
    {
      path: '/video',
      name: 'Video',
      component: Video
    },
    {
      path: '/like',
      name: 'Like',
      component: Like
    },
    {
      path: '/balance',
      name: 'Balance',
      component: Balance
    },
    {
      path: '/exchange',
      name: 'Exchange',
      component: Exchange
    },
    {
      path: '/question_and_answer',
      name: 'QuestionAndAnwser',
      component: QuestionAndAnswer
    },
    {
      path: '/fxxf',
      name: 'Fxxf',
      component: Fxxf
    },
    {
      path: '/license',
      name: 'License',
      component: License
    },
    {
      path: '/aunt',
      name: 'Aunt',
      component: Aunt
    },
    {
      path: '/redenvelope',
      name: 'Redenvelope',
      component: Redenvelope
    },
    {
      path: '/love_count',
      name: 'LoveCount',
      component: LoveCount
    },
    {
      path: '/activities_calendar',
      name: 'ActivitiesCalendar',
      component: ActivitiesCalendar
    },
    {
      path: '/often_buy',
      name: 'OftenBuy',
      component: OftenBuy
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/rule_detail',
      name: 'RuleDetail',
      component: RuleDetail
    },
    {
      path: '/change_pwd',
      name: 'ChangePwd',
      component: ChangePwd
    },
    {
      path: '/change_profile',
      name: 'ChangeProfile',
      component: ChangeProfile
    },
    {
      path: '/change_gender',
      name: 'ChangeGender',
      component: ChangeGender
    },
    {
      path: '/change_username',
      name: 'ChangeUsername',
      component: ChangeUsername
    },
    {
      path: '/change_slogon',
      name: 'ChangeSlogon',
      component: ChangeSlogon
    },
    {
      path: '/face_loan',
      name: 'FaceLoan',
      component: FaceLoan
    },
    {
      path: '/feed_back',
      name: 'Feedback',
      component: FeedBack
    },
    {
      path: '/integral_rule',
      name: 'IntegralRule',
      component: IntegralRule
    },
    {
      path: '/coupon_rule',
      name: 'CouponRule',
      component: CouponRule
    },
    {
      path: '/question',
      name: 'Question',
      component: Question
    },
    {
      path: '/question_list',
      name: 'QuestionList',
      component: QuestionList
    },
    {
      path: '/question_detail',
      name: 'QuestionDetail',
      component: QuestionDetail
    },
    {
      path: '/banding',
      name: 'Banding',
      component: Banding
    },
    {
      path: '/sale_reminder',
      name: 'SaleReminder',
      component: SaleReminder
    },
    {
      path: '/red_everyone',
      name: 'RedEveryone',
      component: RedEveryOne
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat
    },
    {
      path: '/express_message',
      name: 'ExpressMessage',
      component: ExpressMessage
    },
    {
      path: '/empty_item',
      name: 'EmptyItem',
      component: EmptyItem
    },
    {
      path: '/wish',
      name: 'Wish',
      component: Wish
    },
    {
      path: '/change_wish',
      name: 'ChangeWish',
      component: ChangeWish
    },
    {
      path: '/comment_page',
      name: 'Comment',
      component: Comment
    },
    {
      path: '/message_settings',
      name: 'MessageSettings',
      component: MessageSettings
    }
  ]
})
