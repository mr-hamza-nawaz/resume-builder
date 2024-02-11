<!-- Education Data Form -->
<template>
    <div>
      <div class="text-center">
        <h2>Achievements</h2>
      </div>
      <div class="row">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Year</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(ach, index) in achievementDetailsArray"
              :key="index"
              class="education-entry mb-4"
            >
              <td>{{ ach.title }}</td>
              <td>{{ ach.year }}</td>
              <td>
                <BaseButton
                  buttonText="Remove"
                  buttonType="btn"
                  buttonClass="btn btn-space btn-danger btn-md center-block"
                  @custom-click="removeAchievement(index)"
                />
              </td>
            </tr>
            <!-- Add more rows as needed -->
          </tbody>
        </table>
        <div class="education-entry mb-4">
          <!-- Base input field component for reuseability -->
          <BaseInput
            v-model="achievementDetails.title"
            type="text"
            label="Title :"
            placeholder="Title"
            class="base-input"
          />
          <!-- Base Error field component for reuseability  -->
          <BaseError :errorMessage="v$.title" />
          <!-- Base input field component for reuseability -->
          <BaseInput
            v-model="achievementDetails.year"
            type="text"
            label="Year:"
            placeholder="YYYY/MM/DD"
            class="base-input"
          />
          <!-- Base Error field component for reuseability  -->
          <BaseError :errorMessage="v$.year" />
          <BaseOption label="Design Style" :options="viewOptions" @update:selected="achievementUpdateSelectedView" />
          <div class="d-flex justify-content-between align-items-center">
            <!-- Base button component for reuseability -->
            <BaseButton
              buttonText="Add"
              buttonClass="btn btn-space btn-success btn-md center-block"
              @custom-click="addAchievement"
            />
            <hr class="flex-grow-1 mx-3" />
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  import BaseInput from "../fields/BaseInput.vue"
  import BaseTextArea from "../fields/BaseTextArea.vue"
  import BaseError from "../errors/BaseError.vue"
  import BaseButton from "../fields/BaseButton.vue"
  import BaseOption from "../fields/BaseOption.vue";
  import { reactive, ref} from 'vue';
  import useVuelidate from '@vuelidate/core'
  import { required, minLength, maxLength, helpers  } from '@vuelidate/validators'
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
  // Single achievement data fields
    let achievementDetails = reactive(
      { title: '', year: '', }
    );
  // Array achievement data fields
    const achievementDetailsArray = reactive([]);
    const rules = {
      title: { required, minLength: minLength(3), maxLength: maxLength(30),$autoDirty: true  },
      year: {required,
      minValue: helpers.withMessage('Date must not be current date', value => {
                    return new Date(value) < new Date() 
                }),$autoDirty: true  },
    }
    const viewOptions =[
        { label: 'Table', value: 'table' },
        { label: 'Point', value: 'point' },
      ]
      let selectedView = reactive({});
      selectedView = viewOptions[0].value
  //check validation
    const v$ = useVuelidate(rules, achievementDetails,{ $lazy: true })
    const addAchievement = () => {
    const promise = v$.value.$validate()
    promise.then(
      (result) => {
        if(result === true){
          achievementDetailsArray.push({
          title: achievementDetails.title,
          year: achievementDetails.year,
        })
      achievementDetails.title="";
      achievementDetails.year="";
      }
    }
    )
  }
      const removeAchievement = (index) => {
        if (achievementDetailsArray.length >= 1) {
          achievementDetailsArray.splice(index, 1);
                    }
                };
        // validate data and return
  
      return {
        selectedView,
        viewOptions,
        achievementDetails,
        achievementDetailsArray,
        addAchievement,
        removeAchievement,
        v$
      };
    },
    methods: {
      achievementUpdateSelectedView(value) {
        this.selectedView = value;
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  </style>
  