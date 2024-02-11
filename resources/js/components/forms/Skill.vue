<!-- Education Data Form -->
<template>
    <div>
      <div class="text-center">
        <h2>SKill Details</h2>
      </div>
      <div class="row">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Years of experience</th>
              <th scope="col">Rating:</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(sk, index) in skillDetailsArray"
              :key="index"
              class="education-entry mb-4"
            >
              <td>{{ sk.name }}</td>
              <td>{{ sk.yearsofexperience }}</td>
              <td>{{ sk.rating }}</td>
              <td>
                <BaseButton
                  buttonText="Remove"
                  buttonType="btn"
                  buttonClass="btn btn-space btn-danger btn-md center-block"
                  @custom-click="removeSkill(index)"
                />
              </td>
            </tr>
            <!-- Add more rows as needed -->
          </tbody>
        </table>
        <div class="education-entry mb-4">
          <!-- Base input field component for reuseability -->
          <BaseInput
            v-model="skillDetails.name"
            type="text"
            label="Name:"
            placeholder="Skill/Technology"
            class="base-input"
          />
          <!-- Base Error field component for reuseability  -->
          <BaseError :errorMessage="v$.name" />
          <!-- Base input field component for reuseability -->
          <BaseInput
            v-model="skillDetails.yearsofexperience"
            type="text"
            label="Years of experience:"
            placeholder="5"
            class="base-input"
          />
          <!-- Base Error field component for reuseability  -->
          <BaseError :errorMessage="v$.yearsofexperience" />
          <!-- Base input field component for reuseability -->
          <label class="sr-only" for="inlineFormInputGroup">Rating:</label>
      <div class="input-group mb-2">
        <BaseInput
            v-model="skillDetails.rating"
            type="text"
            placeholder="5"
            class="base-input"
          />
          <div class="input-group-prepend">
          <div class="input-group-text"><b>/ 10</b></div>
        </div>
      </div>
          <!-- Base Error field component for reuseability  -->
          <BaseError :errorMessage="v$.rating" />
          <BaseOption label="Design Style" :options="viewOptions" @update:selected="skillUpdateSelectedView" />
          <div class="d-flex justify-content-between align-items-center">
            <!-- Base button component for reuseability -->
            <BaseButton
              buttonText="Add"
              buttonClass="btn btn-space btn-success btn-md center-block"
              @custom-click="addSkill"
            />
            <hr class="flex-grow-1 mx-3" />
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  import BaseInput from "../fields/baseinput.vue"
  import BaseTextArea from "../fields/BaseTextArea.vue"
  import BaseError from "../errors/BaseError.vue"
  import BaseButton from "../fields/Basebutton.vue"
  import BaseOption from "../fields/BaseOption.vue";
  import { reactive, ref} from 'vue';
  import useVuelidate from '@vuelidate/core'
  import { required, numeric, maxLength, minLength } from '@vuelidate/validators'
  export default {
   //Import components
   components:{
            BaseInput,
            BaseTextArea,
            BaseError,
            BaseButton,
            BaseOption
        },
  //Setup data
    setup(){
  // Single skill data fields
    let skillDetails = reactive(
      { name: '', yearsofexperience: '', rating: '', }
    );
  // Array skill data fields
    const skillDetailsArray = reactive([]);
    const rules = {
      name: { required, minLength: minLength(3), maxLength: maxLength(30), $autoDirty: true  },
      yearsofexperience: { required, 
        minLength: minLength(1), 
        maxLength: maxLength(2), 
        numeric, 
        $autoDirty: true  
    },
      rating: { required, 
        maxLength: maxLength(1), 
        numeric,$autoDirty: true 
    },
    }
    const viewOptions =[
        { label: 'Table', value: 'table' },
        { label: 'Point', value: 'point' },
      ]
      let selectedView = reactive({});
      selectedView = viewOptions[0].value
  //check validation
    const v$ = useVuelidate(rules, skillDetails,{ $lazy: true })
    const addSkill = () => {
    const promise = v$.value.$validate()
    promise.then(
      (result) => {
        if(result === true){
          skillDetailsArray.push({
          name: skillDetails.name,
          yearsofexperience: skillDetails.yearsofexperience,
          rating: skillDetails.rating,
        })
      skillDetails.name="";
      skillDetails.yearsofexperience="";
      skillDetails.rating="";
      }
    }
    )
  }
      const removeSkill = (index) => {
        if (skillDetailsArray.length >= 1) {
          skillDetailsArray.splice(index, 1);
                    }
                };
        // validate data and return
  
      return {
        selectedView,
        viewOptions,
        skillDetails,
        skillDetailsArray,
        addSkill,
        removeSkill,
        v$
      };
    },
    methods: {
      skillUpdateSelectedView(value) {
      this.selectedView = value;
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  </style>
  