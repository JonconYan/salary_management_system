<template>
  <v-container>
    <v-card width="600px" height="300px" style="margin-left: auto; margin-right: auto;">
    <v-row>
      <v-chip
            large
            class="ma-2"
            color="orange"
            text-color="white"
          >
            登录平台
          </v-chip>
    </v-row>
    <v-row justify="center" align="center">
      <v-form ref="form">
        <v-text-field v-model="username"  label="用户名" required></v-text-field>
        <v-text-field v-model="password" type="password"  label="密码" required></v-text-field>
        <v-btn color="success" class="mr-4" @click="sign_in">
          sign in
        </v-btn>
        <v-snackbar v-model="snackbar">
              {{ text }}
              <v-btn
                color="pink"
                text
                @click="snackbar = false"
              >
                Close
              </v-btn>
        </v-snackbar>
      </v-form>
    </v-row>
    </v-card>
  </v-container>
</template>
<script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        snackbar: false,
        is_sign_in:false,
        is_admin:false,
        text: '',
      }
    },
    methods:{
      sign_in()
      {
        //this.snackbar = true;
        this.axios.get('api/login',{
          params:{
            id: this.username,
            password: this.password,
          }
        }).then((res)=>{
          if(res.data=='0')
            {
              this.text = '账号名或密码错误！';
            }
          else
            {
              this.text = '欢迎你！'+this.username;
              this.is_sign_in = true;
              this.snackbar = true;
              if(res.data=='1')//表示为管理员
                {
                  sessionStorage.setItem('isadmin',true)
                  this.is_admin = true
                }
              else
                sessionStorage.setItem('isadmin',false)
              this.$router.push({path: '/worker_info'})
              //location.reload();
            }
            this.snackbar = true;
        })
      }
    }
  }

</script>
