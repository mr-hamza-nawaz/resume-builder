<!-- Input for resueability -->
<template>
    <div class="input-wrap">
    <label v-if="label" class="form-label">{{ label }}</label>
    <input
      type="text"
      :value="modelValue"
      class="form-control"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    />
  </div>
</template>

<!-- JS Script-->
<script setup>
defineProps({
  label: {
    type: [String, Boolean],
    default: false,
  },
  modelValue: {
    type: String,
    default: "",
  },
});
</script>

<!-- Scoped Styling-->
<style scoped>
  textarea {
        resize: none;
    }
</style>