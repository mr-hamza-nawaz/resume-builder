<template>
    <div class="text-danger" v-if="errorMessage.$error">
      <span>{{ errorMessage.$errors[0].$message }}</span>
    </div>
  </template>

<!-- JS Script-->
<script setup>
defineProps({
  errorMessage: {
    type: [Object],
    default: false,
  },
});
</script>

<!-- Scoped Styling-->
<style scoped>
  textarea {
        resize: none;
    }
</style>