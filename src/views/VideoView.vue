<template>
  <article>
    {{ $route.params }}
  </article>
</template>

<script>
export default {
  name: "VideoView",
  created() {
    console.log(this.$route.params)
  }
}
</script>

<style scoped>

</style>
