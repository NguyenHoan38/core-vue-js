<template>
  <div>
    <Login />
    <main role="main" id="main_app">
      <slot />
    </main>
    <FooterNew />
  </div>
</template>

<script>
import HeaderGuest from '@/components/HeaderGuest'
import Login from "@/views/auth/Login"
import FooterNew from "@/components/FooterNew.vue"

export default {
  components: {
    Login,
    FooterNew
  },
  data() {
    return {      
    }
  }
}
</script>