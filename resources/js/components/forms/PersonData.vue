<!-- Person Data Form -->
<template>
    <div>
      <div class="text-center">
        <h2>Personal Details</h2>
      </div>
      <div class="row">
        <div class="col-4">
          <!-- Base input field component for reuseability -->
          <BaseInput
            v-model="person.name"
            type="text"
            label="Name:"
            placeholder="Full Name"
            class="base-input"
          />
          <!-- Base Error field component for reuseability  -->
          <BaseError :errorMessage="v$.name" />
        </div>
        <div class="col-4">
          <!-- Base input field component for reuseability -->
          <BaseInput
            v-model="person.email"
            type="text"
            label="Email:"
            placeholder="Email"
            class="base-input"
          />
          <!-- Base Error field component for reuseability  -->
          <BaseError :errorMessage="v$.email" />
        </div>
        <div class="col-4">
          <!-- Base input field component for reuseability -->
          <BaseInput
            v-model="person.phone"
            type="text"
            label="Phone:"
            placeholder="Contact"
            class="base-input"
          />
          <!-- Base Error field component for reuseability  -->
          <BaseError :errorMessage="v$.phone" />
        </div>
        <div class="col-4">
          <!-- Base textarea field component for reuseability -->
          <BaseTextArea
            v-model="person.address"
            label="Region: "
            placeholder="City,State,Country"
            class="base-input"
            row="8"
          />
          <!-- Base Error field component for reuseability  -->
          <BaseError :errorMessage="v$.address" />
        </div>
        <div class="col-4">
          <!-- Base textarea field component for reuseability -->
          <BaseTextArea
            v-model="person.introduction"
            label="Profile Introduction: "
            placeholder="My name is paul... eg."
            class="base-input"
            row="8"
          />
          <!-- Base Error field component for reuseability  -->
          <BaseError :errorMessage="v$.introduction" />
        </div>
        <!-- Base Option field component for reuseability  -->
        <div class="col-4">
          <BaseOption label="Profile Alignment" :options="alignmentOptions" @update:selected="personUpdateSelectedAlignment" />
             <!-- Other components -->
        </div>
      </div>
    </div>
  </template>
  <!-- Script section -->
  <script>
    import BaseInput from "../fields/baseinput.vue"
    import BaseTextArea from "../fields/BaseTextArea.vue"
    import BaseError from "../errors/BaseError.vue"
    import BaseOption from "../fields/BaseOption.vue";
    import { reactive } from 'vue';
    import useVuelidate from '@vuelidate/core'
    import { required, email, minLength,maxLength, numeric } from '@vuelidate/validators'
  
    export default {
      //Import components
      components:{
          BaseInput,
          BaseTextArea,
          BaseError,
          BaseOption
      },
      //Setup data
    setup () {
      // person data fields
      const person = reactive({
        name: '',
        email: '',
        phone: '',
        address: '',
        introduction: '',
      });
      // rules for validation for form data
      const rules = {
          name: { required,minLength: minLength(3),maxLength: maxLength(40)},
          email: { required,email,maxLength: maxLength(30) },
          phone: { required,minLength: minLength(11),numeric },
          address: { required,minLength: minLength(15),maxLength: maxLength(40) },
          introduction: { required,minLength: minLength(250),maxLength: maxLength(300) },
      }
      const alignmentOptions =[
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' }
      ]
      let selectedAlignment = reactive({});
      //default ailgnment assignment
      selectedAlignment = alignmentOptions[0].value
      
      // validate data and return
      const v$ = useVuelidate(rules, person)
      return { 
        selectedAlignment,
        alignmentOptions,
        person, 
        v$ }
    },
    methods: {
      personUpdateSelectedAlignment(value) {
      this.selectedAlignment = value;
    }
  }
  }
  </script>
  
  <!-- Css sectiob -->
  <style scoped>
  textarea {
    resize: none;
  }
  </style>
  