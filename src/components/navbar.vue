<template>
  <nav>
    <v-app-bar flat>
      <v-app-bar-nav-icon @click = "drawer = !drawer">
        <v-icon>reorder</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="grey--text">
        <span>Salary management system</span>
        <v-spacer></v-spacer>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat color="pink" @click ="signout">
        <span class="white--text">Sign out</span>
        <v-icon right class="white--text">exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" class="primary" >
      <v-list rounded class="max-auto">
        <v-list-item v-for="link in links":key = "link.text" router :to= "link.route">
          <v-list-item-icon>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

  </nav>
</template>

<script>
  export default {
    data() {
      return {
        drawer: false,
        is_log_in: false,
        links:[
          { icon : "person" , text : "职工基本信息" , route:'/worker_info'},
          { icon : "work" , text : "部门信息" , route:'/class_info'},
          { icon :"event",text: "工种与工资信息",route:'/worker_type'},
          { icon : "where_to_vote" , text : "考勤信息" , route:'/daily_info'},
          { icon : "attach_money" , text : "津贴信息" , route:'/other_money_info'},
          { icon : "print" , text : "企业工资报表" , route:'/salary_report'},
          { icon : "monetization_on" , text : "年终奖生成" , route:'/annual_bonus'}
        ]
      }
    },
    methods:{
      signout()
      {
        sessionStorage.clear();
        this.$router.push({path: '/'})
      }
    }
  }
</script>
