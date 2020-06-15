<template>
  <div class="worker_type">
   <Navbar/>
   <v-card max-width="1000px" style="margin-left: auto; margin-right: auto;">
    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>津贴信息</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn v-if="isadmin=='true'" color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.uid" label="UID"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.date" label="DATE"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.hours" label="HOURS"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.type" label="TYPE"></v-text-field>
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
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          edit
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
   </v-card>
  </div>
</template>


<script>
  import Navbar from '@/components/navbar'
  export default {
	components:{Navbar},
    data: () => ({
      dialog: false,
      isadmin:'',
      headers: [
        {
          text: 'UID',
          value:'uid',
          align: 'start',
          sortable: false,
        },
        {
          text: 'NAME',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Date', value: 'date' },
        { text: 'Hours', value: 'hours' },
        { text: 'type', value: 'type' },
        { text: 'Money', value: 'money' },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        uid :'',
        date: '',
        hours: '',
        type: '',
      },
      defaultItem: {
        uid :'',
        date: '',
        hours: '',
        type: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.desserts = [];
        this.isadmin = sessionStorage.getItem('isadmin');
        if(this.isadmin == 'true') this.headers.push({ text: 'Actions', value: 'actions', sortable: false });
        this.axios.get("/api/other_money_info").then((res)=>{
          console.log(res.data);
          for(var i = 0;i < res.data.length;i++)
          {
            if(this.isadmin == 'true')
              this.desserts.push(res.data[i]);
            else//非管理员只能看见自己的
            {
              if(sessionStorage.getItem('id') == res.data[i].uid)
                this.desserts.push(res.data[i]);
            }
          }
        })
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        if(confirm('Are you sure you want to delete this item?'))
        {
          this.desserts.splice(index, 1);
          this.axios.get('/api/other_money_info/delete',{
            params:{
              uid: item.uid,
              date: item.date,
            }
          })
          this.initialize();
        }
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {//找到此表项只需要修改
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
          this.axios.get('/api/other_money_info/update',{
            params:{
              uid: this.editedItem.uid,
              date: this.editedItem.date,
              hours: this.editedItem.hours,
              type:this.editedItem.type,
              money:this.editedItem.hours*this.editedItem.type*50,//每个小时50元
            }
          })
        } else {//找不到需要进行插入
          this.desserts.push(this.editedItem)
          this.axios.get('/api/other_money_info/insert',{
            params:{
              uid: this.editedItem.uid,
              date: this.editedItem.date,
              hours: this.editedItem.hours,
              type:this.editedItem.type,
              money:this.editedItem.hours*this.editedItem.type*50,//每个小时50元
            }
          })
        }
        this.initialize();
        this.close()
      },
    },
  }
</script>

<style>
</style>
