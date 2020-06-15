<template>
    <v-content>
      <v-app>
<!--      <Navbar/> -->
      <!-- Display view pages here based on route -->
      <router-view></router-view>
      </v-app>
    </v-content>
</template>

<script>
import Navbar from '@/components/navbar'

  export default {
    name:'App',
    components:{Navbar},
    data() {
      return {

      }
    }
  }
</script>
<style>
</style>
