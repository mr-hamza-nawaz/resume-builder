<!-- Education Data Form -->
<template>
  <div>
    <div class="text-center">
      <h2>Work Details</h2>
    </div>
    <div class="row">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Company</th>
            <th scope="col">Designation</th>
            <th scope="col">Starting Date</th>
            <th scope="col">Ending Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(work, index) in workDetailsArray"
            :key="index"
            class="education-entry mb-4"
          >
            <td>{{ work.company }}</td>
            <td>{{ work.designation }}</td>
            <td>{{ work.startingDate }}</td>
            <td>{{ work.endingDate }}</td>
            <td>
              <BaseButton
                buttonText="Remove"
                buttonType="btn"
                buttonClass="btn btn-space btn-danger btn-md center-block"
                @custom-click="removeWork(index)"
              />
            </td>
          </tr>
          <!-- Add more rows as needed -->
        </tbody>
      </table>
      <div class="education-entry mb-4">
        <!-- Base input field component for reuseability -->
        <BaseInput
          v-model="workDetails.company"
          type="text"
          label="Company:"
          placeholder="Company"
          class="base-input"
        />
        <!-- Base Error field component for reuseability  -->
        <BaseError :errorMessage="v$.company" />
        <!-- Base input field component for reuseability -->
        <BaseInput
          v-model="workDetails.designation"
          type="text"
          label="Designation:"
          placeholder="Designation"
          class="base-input"
        />
        <!-- Base Error field component for reuseability  -->
        <BaseError :errorMessage="v$.designation" />
        <!-- Base input field component for reuseability -->
        <BaseInput
          v-model="workDetails.startingDate"
          type="text"
          label="Starting Date:"
          placeholder="YYYY/MM/DD"
          class="base-input"
        />
        <!-- Base Error field component for reuseability  -->
        <BaseError :errorMessage="v$.startingDate" />
        <!-- Base input field component for reuseability -->
        <BaseInput
          v-model="workDetails.endingDate"
          type="text"
          label="Ending Date:"
          placeholder="YYYY/MM/DD"
          class="base-input"
        />
        <!-- Base Error field component for reuseability  -->
        <BaseError :errorMessage="v$.endingDate" />
        <BaseOption label="Design Style" :options="viewOptions" @update:selected="workUpdateSelectedView" />
        <div class="d-flex justify-content-between align-items-center">
          <!-- Base button component for reuseability -->
          <BaseButton
            buttonText="Add"
            buttonClass="btn btn-space btn-success btn-md center-block"
            @custom-click="addWork"
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
import BaseButton from "../fields/basebutton.vue"
import BaseOption from "../fields/BaseOption.vue";
import { reactive, ref} from 'vue';
import useVuelidate from '@vuelidate/core'
import { required,helpers } from '@vuelidate/validators'

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
// Single work history data fields
  let workDetails = reactive(
    { company: '', designation: '', startingDate: '', endingDate: '' }
  );
// Array work history data fields
  const workDetailsArray = reactive([]);
  const rules = {
    company: { required, $autoDirty: true  },
    designation: { required, $autoDirty: true  },
    startingDate: {required,
      minValue: helpers.withMessage('Date must not be current date', value => {
                    return new Date(value) < new Date() 
                }),$autoDirty: true  },
    endingDate:  {
      maxValue: helpers.withMessage('Ending date must be greater then starting date', value => {
        const startDate = workDetails.startingDate;
        return workDetails.endingDate.length > 0 ? new Date(value) > new Date(startDate) : true;
        
                }),$autoDirty: true  },
              
  }
  const viewOptions =[
        { label: 'Table', value: 'table' },
        { label: 'Point', value: 'point' },
      ]
      let selectedView = reactive({});
      selectedView = viewOptions[0].value
//check validation
  const v$ = useVuelidate(rules, workDetails,{ $lazy: true })
  const addWork = () => {
  const promise = v$.value.$validate()
  promise.then(
    (result) => {
      if(result === true){
        workDetailsArray.push({
        company: workDetails.company,
        designation: workDetails.designation,
        startingDate: workDetails.startingDate,
        endingDate: workDetails.endingDate
      })
    workDetails.company="";
    workDetails.designation="";
    workDetails.startingDate="";
    workDetails.endingDate="";
    }
  }
  )
}
    const removeWork = (index) => {
      console.log("i got call")
      if (workDetailsArray.length >= 1) {
        workDetailsArray.splice(index, 1);
      }
    };
      // validate data and return

    return {
      selectedView,
      viewOptions,
      workDetails,
      workDetailsArray,
      addWork,
      removeWork,
      v$
    };
  },
  methods: {
      workUpdateSelectedView(value) {
        console.log(value)
      this.selectedView = value;
    }
  }
}
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
