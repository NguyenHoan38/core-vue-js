<template>
  <div>
    <Header />
    <main role="main">
      <slot />
    </main>
    <FooterNew />
  </div>
</template>

<script>
import Header from '@/components/Header'
// import Footer from '@/components/Footer'
import FooterNew from "@/components/FooterNew.vue"

export default {
  components: {
    Header,
    FooterNew
  }
}
</script>