<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "MButton"
}
</script>

<style scoped>

.button {
  font-size: 0.875rem;
  text-transform: uppercase;
  font-weight: 600;
  padding: 0.75rem 1.313rem;
  border: 2px solid var(--dark);
  transition: all .1s ease-in-out;
}

.button:hover {
  cursor: pointer;
  background-color: var(--dark);
  color: var(--white);
}

</style>
