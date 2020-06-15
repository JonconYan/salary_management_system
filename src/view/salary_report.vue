<template>
	<div class="daily_info">
    <v-card max-width="1000px" style="margin-left: auto; margin-right: auto;">
      <v-card-title>
        salary report
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
  export default {
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
            this.desserts.push(res.data[i]);
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
