<template>
  <div>
    <Header />
    <main role="main">
      <slot />
    </main>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  components: {
    Header
  },
  name: "simple"
}
</script>