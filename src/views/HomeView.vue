<template>
  <div class="wrapper">
    <video-form />
  </div>
</template>

<script>
import VideoForm from '@/components/VideoForm'

export default {
  name: 'HomeView',
  components: { VideoForm }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
}
</style>
