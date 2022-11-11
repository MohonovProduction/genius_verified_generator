<template>
  <div class="wrapper">
    <video-form
      :name="$route.params.name"
      :question="$route.params.question"
      :photo="$route.params.photo"
    />
  </div>
</template>

<script>
import VideoForm from '@/components/VideoForm';

export default {
  name: "EditView",
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
