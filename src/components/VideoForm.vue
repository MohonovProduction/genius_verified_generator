<template>
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
</template>

<script>
import router from '@/router';

export default {
  name: "Form",
  props: {
    name: {
      type: String,
      default: ''
    },
    question: {
      type: String,
      default: ''
    },
    photo: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      form: {
        name: null,
        question: null,
        photo: null
      }
    }
  },
  created() {
    this.form.name = this.name
    this.form.question = this.question
    this.form.photo = this.photo
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
.form {
  display: grid;
  grid-gap: 1em;
  padding: 1em 2em;
}
</style>
