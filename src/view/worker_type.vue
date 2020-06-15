<template>
  <div class="worker_type">
   <v-card max-width="1000px" style="margin-left: auto; margin-right: auto;">
    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>工种与工资信息</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.class_id" label="Class id"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.class_name" label="Class name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.level" label="level"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.base_money" label="Base_money"></v-text-field>
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
  export default {
    data: () => ({
      dialog: false,
      headers: [
        { text: 'Class id',
          value:'class_id',
          align: 'start',
          sortable: false,
        },
        {
          text: 'Class name',
          align: 'start',
          sortable: false,
          value: 'class_name',
        },
        { text: 'Level', value: 'level' },
        { text: 'Base money', value: 'base_money' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        class_name :'',
        class_id: '',
        level: '',
        base_money: '',
      },
      defaultItem: {
        class_name: '',
        class_id: '',
        level: '',
        base_money: '',
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
        this.axios.get("/api/worker_type").then((res)=>{
          console.log(res.data);
          for(var i = 0;i < res.data.length;i++)
          {
            this.desserts.push(res.data[i]);
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
          this.axios.get('/api/worker_type/delete',{
            params:{
              class_id: item.class_id,
              level: item.level,
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
          this.axios.get('/api/worker_type/update',{
            params:{
              class_id: this.editedItem.class_id,
              level: this.editedItem.level,
              base_money: this.editedItem.base_money
            }
          })
        } else {//找不到需要进行插入
          this.desserts.push(this.editedItem)
          this.axios.get('/api/worker_type/insert',{
            params:{
              class_id: this.editedItem.class_id,
              level: this.editedItem.level,
              base_money: this.editedItem.base_money
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
