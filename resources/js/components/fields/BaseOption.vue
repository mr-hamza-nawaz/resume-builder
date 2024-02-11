<template>
    <div>
      <label>{{ label }}:</label>
      <select v-model="selectedOption" @change="updateSelectedOption" :class="{ 'form-control': true }">
        <option v-for="(option, index) in options" :key="index" :value="option.value">{{ option.label }}</option>
      </select>
    </div>
  </template>
  
  <script>
  import { ref,onMounted } from 'vue';
  
  export default {
    props: {
      label: {
        type: String,
        required: true
      },
      options: {
        type: Array,
        default: () => []
      }
    },
    setup(props, { emit }) {
      const selectedOption = ref(props.options.length > 0 ? props.options[0].value : null);
      const updateSelectedOption = (event) => {
        selectedOption.value = event.target.value;
        emit('update:selected', selectedOption.value);
      };
      const sendDefaultAignmentOption = () => {
      emit('getDefaultAlignmentOption', selectedOption);
    };
      return {
        sendDefaultAignmentOption,
        selectedOption,
        updateSelectedOption
      };
    }
  };
  </script>
  
  <style>
  /* Add any custom styling here */
  </style>
  