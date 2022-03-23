<template>
  <div>
    <Header />
    <main role="main">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'AuthLayout',
  components: {
    Header,
    Footer
  }
}
</script>