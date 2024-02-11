<!-- Education Data Form -->
<template>
  <div>
    <div class="text-center">
      <h2>Educational Details</h2>
    </div>
    <div class="row">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Institute</th>
            <th scope="col">Degree</th>
            <th scope="col">Grade</th>
            <th scope="col">Induction Year</th>
            <th scope="col">Passing Year</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(edu, index) in educationDetailsArray"
            :key="index"
            class="education-entry mb-4"
          >
            <td>{{ edu.institute }}</td>
            <td>{{ edu.degreeName }}</td>
            <td>{{ edu.grade }}</td>
            <td>{{ edu.inductionDate }}</td>
            <td>{{ edu.passingDate }}</td>
            <td>
              <BaseButton
                buttonText="Remove"
                buttonType="btn"
                buttonClass="btn btn-space btn-danger btn-md center-block"
                @custom-click="removeEducation(index)"
              />
            </td>
          </tr>
          <!-- Add more rows as needed -->
        </tbody>
      </table>
      <div class="education-entry mb-4">
        <!-- Base input field component for reuseability -->
        <BaseInput
          v-model="educationDetails.institute"
          type="text"
          label="Institute Name:"
          placeholder="Name"
          class="base-input"
        />
        <!-- Base Error field component for reuseability  -->
        <BaseError :errorMessage="v$.degreeName" />
        <BaseInput
          v-model="educationDetails.degreeName"
          type="text"
          label="Degree Title:"
          placeholder="Title"
          class="base-input"
        />
        <!-- Base Error field component for reuseability  -->
        <BaseError :errorMessage="v$.degreeName" />
        <!-- Base input field component for reuseability -->
        <BaseInput
          v-model="educationDetails.grade"
          type="text"
          label="Grade/Marks:"
          placeholder="Grade"
          class="base-input"
        />
        <!-- Base Error field component for reuseability  -->
        <BaseError :errorMessage="v$.grade" />
        <!-- Base input field component for reuseability -->
        <BaseInput
          v-model="educationDetails.inductionDate"
          type="text"
          label="Induction Date:"
          placeholder="YYYY/MM/DD"
          class="base-input"
        />
        <!-- Base Error field component for reuseability  -->
        <BaseError :errorMessage="v$.inductionDate" />
        <!-- Base input field component for reuseability -->
        <BaseInput
          v-model="educationDetails.passingDate"
          type="text"
          label="Passing Date:"
          placeholder="YYYY/MM/DD"
          class="base-input"
        />
        <!-- Base Error field component for reuseability  -->
        <BaseError :errorMessage="v$.passingDate" />
        <BaseOption label="Design Style" :options="viewOptions" @update:selected="workUpdateSelectedView" />
        <div class="d-flex justify-content-between align-items-center">
          <!-- Base button component for reuseability -->
          <BaseButton
            buttonText="Add"
            buttonClass="btn btn-space btn-success btn-md center-block"
            @custom-click="addEducation"
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
import { required, helpers, maxLength, minLength } from '@vuelidate/validators'
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
// Single education data fields
  let educationDetails = reactive(
    { institute: '', degreeName:'', grade: '', inductionDate: '', passingDate: '' }
  );
// Array education data fields
  const educationDetailsArray = reactive([]);
  const rules = {
    institute: { required,minLength: minLength(3),maxLength: maxLength(30),$autoDirty: true  },
    degreeName: { required,minLength: minLength(3),maxLength: maxLength(30),$autoDirty: true  },
    grade: { required, maxLength: maxLength(5),$autoDirty: true  },
    inductionDate: {required,
      minValue: helpers.withMessage('Date must not be current date', value => {
                    return new Date(value) < new Date() 
                }),$autoDirty: true  },
    passingDate: {required,
      maxValue: helpers.withMessage('Degree date difference must be between 7 years', value => {
                     // Parse the dates
    const start = new Date(educationDetails.inductionDate);
    const end = new Date(value);

    // Check if starting date is not equal to ending date
    if (start.getTime() === end.getTime()) {
        return false; // If starting date equals ending date, return false
    }

    // Calculate the difference in milliseconds
    const difference = end - start;

    // Convert milliseconds to years
    const yearsDifference = difference / (1000 * 60 * 60 * 24 * 365);

    // Check if the ending date is within 7 years of the starting date
    if (yearsDifference >= 0 && yearsDifference <= 7) {
        return true;
    }

    return false;
                }),$autoDirty: true  },                
      }
      const viewOptions =[
        { label: 'Table', value: 'table' },
        { label: 'Point', value: 'point' },
      ]
      let selectedView = reactive({});
      selectedView = viewOptions[0].value
//check validation
  const v$ = useVuelidate(rules, educationDetails,{ $lazy: true })
  const addEducation = () => {
  const promise = v$.value.$validate()
  promise.then(
    (result) => {
      if(result === true){
        educationDetailsArray.push({
        institute: educationDetails.institute,
        degreeName: educationDetails.degreeName,
        grade: educationDetails.grade,
        inductionDate: educationDetails.inductionDate,
        passingDate: educationDetails.passingDate
      })
    educationDetails.institute="";
    educationDetails.degreeName="";
    educationDetails.grade="";
    educationDetails.inductionDate="";
    educationDetails.passingDate="";
    }
  }
  )
}
    const removeEducation = (index) => {
      if (educationDetailsArray.length >= 1) {
        educationDetailsArray.splice(index, 1);
        }
    };
      // validate data and return

    return {
      selectedView,
      viewOptions,
      educationDetails,
      educationDetailsArray,
      addEducation,
      removeEducation,
      v$
    };
  },
  methods: {
      workUpdateSelectedView(value) {
      this.selectedView = value;
    }
  }
}
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
