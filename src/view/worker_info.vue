<template>
  <div class="worker_info">
    <Navbar/>
    <v-subheader class="grey--text" :inset="true">员工信息</v-subheader>

    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="person in persons" :key="person.uid">
          <v-card class="ma-3" outlined>
            <v-card-text>
              <div class="overline" style="display: inline-block;">uid:{{person.uid}}</div>
              <div v-if="person.sex==1" class="blue--text" style="display: inline-block;">♂</div>
              <div v-if="person.sex==2" class="red--text" style="display: inline-block;">♀</div>
              <div class="text-center title">{{person.name}}</div>
              <v-container>
                <v-row no-gutters>
                  <v-col>
                    <div>{{person.class_name}}</div>
                  </v-col>
                  <v-col>
                    <div class="text-center" v-if="person.kind==1">正式员工</div>
                    <div class="text-center" v-if="person.kind==2">实习生</div>
                  </v-col>
                  <v-col>
                    <div class="text-center">level:{{person.level}}</div>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import Navbar from '@/components/navbar'
  export default {
    components:{Navbar},
    data() {
      return {
        persons: []
      }
    },
    mounted() {
      this.axios.get("/api/worker_info").then((res)=>{
        //console.log(res.data);
        for(var i = 0;i < res.data.length;i++)
        {
          this.persons.push(res.data[i]);
        }
      })
    },
  }
</script>

<style>
</style>
