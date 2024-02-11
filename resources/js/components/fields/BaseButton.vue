<!-- MyButton.vue -->
<template>
    <button :class="[buttonClass]" @click="handleClick" :type="buttonType">
      {{ buttonText }}
    </button>
  </template>
  
  <script>
  import { defineProps } from 'vue';
  
  export default {
    name: 'BaseButton',
    props: {
      buttonText: {
        type: String,
        default: 'Click Me'
      },
      buttonClass: {
        type: String,
        default: 'btn btn-primary' // Default Bootstrap button classes
      },
      buttonType: {
        type: String,
        default: 'button' // Default to "button" type
      }
    },
    setup(props, { emit }) {
      // Click event handler
      const handleClick = () => {
        // Emit a custom event or perform some action
        emit('custom-click', 'Button clicked!');
      };
  
      return {
        handleClick
      };
    }
  };
  </script>
  
  <style scoped>
  /* Add your button styles here */
  /* For example, you can add some padding or margin */
  </style>
  