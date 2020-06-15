<template>
	<div class="daily_info">
    <Navbar/>
    <v-card max-width="1000px" style="margin-left: auto; margin-right: auto;">
      <v-card-title>
        annual bonus
        <v-btn icon color="green" @click = "initialize">
          <v-icon>cached</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :options.sync="options"
        :search="search"
        :footer-props="{
          showFirstLastPage: true,
        }"
        class="elevation-1"
      ></v-data-table>
     </v-card>
	</div>
</template>

<script>
  import Navbar from '@/components/navbar'
  export default {
    components:{Navbar},
    data() {
      return {
        search: '',
        options: {
            page: 1,
            itemsPerPage: 10,
            pageStart: 1,
            pageStop: 1,
          },
        headers:[
          {
            text:'UID',
            align: 'center',
            sortable : false,
            value: 'uid',
          },
          { text:'NAME',value:'name',align: 'center' },
          { text:'CLASS NAME',value:'class_name',align:'center'},
          { text:'DAYS',value:'days',align: 'center' },
          { text:'MONTH SUM',value:'month_sum',align:'center'},
          { text:'OTHER MONEY SUM',value:'other_money_sum',align: 'center' },
          { text:'ANNUAL BONUS',value:'annual_bonus',align: 'center' },
        ],
        desserts: [],
      }
    },
    methods:{
      initialize () {
        this.desserts = [];
        this.axios.get("/api/annual_bonus").then((res)=>{
          console.log(res.data);
          for(var i = 0;i < res.data.length;i++)
          {
            if(sessionStorage.getItem('isadmin')=='true')
              this.desserts.push(res.data[i]);
            else//判断等于id的时候push进去
            {
              if(sessionStorage.getItem('id') == res.data[i].uid)
                this.desserts.push(res.data[i]);
            }
          }
        })
        }
      },
    mounted() {
      this.initialize();
    },
  }
</script>

<style>
</style>
