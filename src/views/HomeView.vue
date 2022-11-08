<template>
  <div class="wrapper">
    <form
      class="form"
      @submit.prevent
    >
     <m-input
      name="name"
      v-model="name"
     >

     </m-input>
      <label for="question" class="label form__label">
        <input id="question" type="text" class="input form__input">
      </label>
    </form>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      name: null,
      question: null,
      photo: null
    }
  }
}
</script>

<style scoped>

</style>
