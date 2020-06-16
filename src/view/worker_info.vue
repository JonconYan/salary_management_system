<template>
  <div class="worker_info">
    <Navbar/>
    <v-row>
    <v-subheader class="grey--text" :inset="true">员工信息</v-subheader>
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn v-if="isadmin=='true'" color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">add item</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="editedItem.uid" label="uid"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="editedItem.name" label="name"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field v-model="editedItem.sex" label="sex"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field v-model="editedItem.class_id" label="class_id"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field v-model="editedItem.level" label="level"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field v-model="editedItem.kind" label="kind"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
     </v-dialog>
      <v-dialog v-model="dialog1" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn v-if="isadmin=='true'" color="red" dark class="mb-2" v-on="on">delete Item</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">delete item</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="deleteuid" label="uid"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close1">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="save1">Save</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>

    </v-row>

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
        isadmin:'',
        dialog1:false,
        deleteuid:'',
        dialog: false,
        editedIndex: -1,
        editedItem: {
          uid:'',
          name:'',
          sex:'',
          class_id: '',
          level: '',
          kind: '',
        },
        defaultItem: {
          uid:'',
          name:'',
          sex:'',
          class_id: '',
          level: '',
          kind: '',
        },
        persons: []
      }
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    mounted() {
      this.initialize();
    },
    methods:{
      initialize(){
        this.isadmin = sessionStorage.getItem('isadmin');
        this.persons=[];
        this.axios.get("/api/worker_info").then((res)=>{
          console.log(res.data);
          for(var i = 0;i < res.data.length;i++)
          {
            this.persons.push(res.data[i]);
          }
        })
      },
      editItem (item) {
        this.editedIndex = this.persons.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },


      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      close1 () {
        this.dialog1 = false
      },

      save () {
          this.axios.get('/api/worker_info/insert',{
            params:{
              uid: this.editedItem.uid,
              name: this.editedItem.name,
              sex: this.editedItem.sex,
              class_id: this.editedItem.class_id,
              level: this.editedItem.level,
              kind:this.editedItem.kind
            }
          })
        this.initialize();
        this.close();
      },
      save1() {
        this.axios.get('/api/worker_info/delete',{
            params:{
              uid: this.deleteuid,
            }
          })
        this.initialize();
        this.close1()
      }
    }
  }
</script>

<style>
</style>
