<template>
  <div class="worker_info">
    <v-subheader class="grey--text" :inset="true">部门信息</v-subheader>

    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12 sm6 md6 lg6 v-for="each in classes" :key="each.class_id">
          <v-card class="ma-3" outlined>
            <v-card-text>
              <div class="overline" style="display: inline-block;">class_id: {{each.class_id}}</div>
              <div class="text-center title">{{each.class_name}}</div>
              <div>部门人数: {{each.num}}</div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        classes: []
      }
    },
    mounted() {
      this.axios.get("/api/class_info").then((res)=>{
        console.log(res.data);
        for(var i = 0;i < res.data.length;i++)
        {
          this.classes.push(res.data[i]);
        }
      })
    },
  }
</script>
