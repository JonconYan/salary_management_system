import Vue from 'vue'
import Router from 'vue-router'
import worker_info from '../view/worker_info.vue'
import annual_bonus from '../view/annual_bonus.vue'
import class_info from '../view/class_info.vue'
import daily_info from '../view/daily_info.vue'
import other_money_info from '../view/other_money_info.vue'
import salary_report from '../view/salary_report.vue'
import worker_type from '../view/worker_type.vue'
import index from '../view/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component:index,
    },
    {
      path: '/worker_info',
      name: 'worker_info',
      component:worker_info
    },
    {
      path: '/annual_bonus',
      name: 'annual_bonus',
      component: annual_bonus
    },
    {
      path: '/class_info',
      name: 'class_info',
      component:class_info
    },
    {
      path: '/daily_info',
      name: 'daily_info',
      component:daily_info
    },
    {
      path: '/other_money_info',
      name: 'other_money_info',
      component:other_money_info
    },
    {
      path: '/salary_report',
      name: 'salary_report',
      component:salary_report
    },
    {
      path:'/worker_type',
      name:'/worker_type',
      component: worker_type
    }
  ]
})
