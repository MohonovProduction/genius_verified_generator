<template>
  <label :for="name" class="label form__label">
    <input
      :id="name"
      :placeholder="name"
      type="text"
      :value="modelValue"
      class="input form__input"
      @input="updateValue"
    >
  </label>
</template>

<script>
export default {
  name: "MInput",
  props: {
    modelValue: String,
    name: String
  },
  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>

.input {
  font-family: var(--font-family);
  font-feature-settings: var(--font-feature-settings);
  font-size: 1em;
  padding: .3em .5em;
  border: .15em solid var(--dark);
}

</style>
