<template>
	<div class="daily_info">
    <Navbar/>
    <v-card max-width="1000px" style="margin-left: auto; margin-right: auto;">
      <v-card-title>
        Attendance Info
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
        :items="daily"
        :options.sync="options"
        :search="search"
        :footer-props="{
          showFirstLastPage: true,
        }"
        class="elevation-1"
      ></v-data-table>
     </v-card>
<!-- 	  <v-container>
    <v-row>
      <v-col offset-md="2">
      <v-dialog max-width="600px">
        <v-btn slot="activator"flat class="success">
          <span class="white--text">search</span>
          <v-icon right class="white--text">search</v-icon>
        </v-btn>
      </v-dialog>
      </v-col>
    </v-row>
		<v-row v-for="each in daily" no-gutters class = "mb-2" justify="center">
		  <v-col lg="2">
        <v-card flat outlined tile class="pa-2 text-center">
          <v-card-text>{{each.uid}}</v-card-text>
        </v-card>
		  </v-col>
		  <v-col lg="2">
			<v-card flat outlined tile class="pa-2 text-center">
        <v-card-text>{{each.name}}</v-card-text>
      </v-card>
		  </v-col>
      <v-col lg="3">
      <v-card flat outlined tile class="pa-2 text-center">
        <v-card-text>{{each.time}}</v-card-text>
      </v-card>
      </v-col>
		</v-row>
	  </v-container> -->
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
          { text:'TIME',value:'time',align: 'center' },
        ],
        daily: []
      }
    },
    mounted() {
      this.axios.get("/api/daily_info").then((res)=>{
        //var test = sessionStorage.getItem('isadmin');
        //console.log(res.data,test);
        for(var i = 0;i < res.data.length;i++)
        {
          if(sessionStorage.getItem('isadmin')=='true')
            this.daily.push(res.data[i]);
          else//判断等于id的时候才能push进去
          {
            if(sessionStorage.getItem('id') == res.data[i].uid)
              this.daily.push(res.data[i]);
          }
        }
      })
    },
  }
</script>

<style>
</style>
