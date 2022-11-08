<template>
  <div class="wrapper">
    <form
      class="form"
      @submit.prevent
    >
      <h1>Type some words for video</h1>
      <m-input
        name="name"
        v-model="form.name"
      />
      <m-input
        name="question"
        v-model="form.question"
      />
      <m-input
        name="photo-link"
        v-model="form.photo"
      />
      <m-button @click="toGenerateVideo">Generate</m-button>
    </form>
  </div>
</template>

<script>
import MButton from '@/components/UI/MButton';
import router from '@/router';
export default {
  name: 'HomeView',
  components: {MButton},
  data() {
    return {
      form: {
        name: null,
        question: null,
        photo: null
      }
    }
  },
  methods: {
    toGenerateVideo() {
      const form = this.form

      router.push({
        name: 'video',
        params: {
          name: form.name,
          question: form.question,
          photo: form.photo
        }
      })
    }
  }
}
</script>

<style scoped>

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
}

.form {
  display: grid;
  grid-gap: 1em;
  justify-items: ;
  padding: 1em 2em;
}

</style>
