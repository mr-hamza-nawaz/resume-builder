<!-- Textarea for resueability -->
<template>
    <div class="input-wrap">
    <label v-if="label" class="form-label">{{ label }}</label>

    <textarea class="form-control"
     :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    ></textarea>
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