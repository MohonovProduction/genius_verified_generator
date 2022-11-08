<template>
  <label :for="name" class="label form__label">
    <input
      :id="name"
      :placeholder="name"
      type="text"
      :value="modelValue"
      class="input form__input"
      :class="{ input_filled: modelValue }"
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
  width: 100%;
  padding: .3em .5em;
  border: 2px solid var(--dark);
  transition: all .2s ease-out;
}
.input_filled {
  background-color: var(--dark);
  color: var(--white);
}
</style>
