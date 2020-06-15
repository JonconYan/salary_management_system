<template>
	<div class="daily_info">
    <Navbar/>
    <v-card max-width="1000px" style="margin-left: auto; margin-right: auto;">
      <v-card-title>
        salary report
        <v-btn icon color="green" @click = "initialize">
          <v-icon>cached</v-icon>
        </v-btn>
        <v-btn icon color="green" @click = "func">
          <v-icon>assessment</v-icon>
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
     <div id="charts" style="width: 600px;height:400px;margin-left: auto; margin-right: auto;"></div>
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
          { text:'MONTH',value:'month',align: 'center' },
          { text:'NAME',value:'name',align: 'center' },
          { text:'CLASS NAME',value:'class_name',align:'center'},
          { text:'BASE MONEY',value:'base_money',align: 'center' },
          { text:'DAYS',value:'days',align: 'center' },
          { text:'OTHER MONEY SUM',value:'other_money_sum',align: 'center' },
          { text:'SUM',value:'sum',align: 'center' },
        ],
        desserts: [],
      }
    },
    methods:{
      initialize () {
        this.desserts = [];
        this.axios.get("/api/salary_report").then((res)=>{
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
        },
      func(){
        var class_report = new Array(0,0,0,0,0,0);
        for(var i = 0;i < this.desserts.length;i++)
        {
          class_report[this.desserts[i].class_id-1]+= this.desserts[i].sum;
        }
        var myChart =this.$echarts.init(document.getElementById('charts'));
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'CLASS REPORT'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["企划部","办公室","财务部","服务部","产品部","人力资源部"]
            },
            yAxis: {},
            series: [{
                name: '总金额',
                type: 'bar',
                data: class_report
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option,true);
      }
      },
    mounted() {
      this.initialize();
    },
  }
</script>

<style>
</style>
