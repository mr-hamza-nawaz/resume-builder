<template>
  <div class="container">
  <h2 class="text-center">Wellcome to Resume Builder</h2>
  <form @submit.prevent="submitForm">
    <PersonDataForm ref="personData"/>
    <EducationalHistory ref="educationalData"/>
    <WorkHistory ref="workHistoryData"/>
    <Skill ref="skillData"/>
    <BaseButton buttonText="Make Resume" buttonType="submit" buttonClass="btn btn-primary col-12" @custom-click="submitForm"/>
    <small v-if="this.errorMessage.education != ''" id="passwordHelp" class="text-danger">
        {{this.errorMessage.education}}
    </small>  
  </form>
  <h3>
      
  </h3>
</div>
</template>

<script>
import EducationalHistory from '../components/forms/EducationalHistory.vue';
import Skill from '../components/forms/Skill.vue';
import WorkHistory from '../components/forms/WorkHistory.vue';
import PersonDataForm from '../components/forms/PersonData.vue'
import BaseButton from "../components/fields/Basebutton.vue";
import BaseError from "../components/errors/BaseError.vue"
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'


export default {
  components: {
      EducationalHistory,
      WorkHistory,
      PersonDataForm,
      BaseButton,
      BaseError,
      Skill,
      },
data() {
  return {
    errorMessage: {
            education: "",
            } 
  }
},
methods: {
  submitForm() {
    
      //capture person form reference
      const personComponent = this.$refs.personData
      const educationalComponent = this.$refs.educationalData
      const workComponent = this.$refs.workHistoryData
      const skillComponent = this.$refs.skillData
      // check validation for person form
      personComponent.v$.$validate();
      const checkPersonDetailError = personComponent.v$.$error
      if(!checkPersonDetailError){
        const personObject = personComponent.person
        this.generatePDF(
          personComponent.selectedAlignment,
          personObject,
          educationalComponent,
          workComponent,
          skillComponent,
          )
      }
  },
  generatePDF (align,person,education,work,skill) {
    const doc = new jsPDF();
    const lineHeight = 5;
    let yPos = 15;
    let xPos = 0;
    let headingXpos = 10;
    const formatDate=(inputDate) =>{
      // Create a new Date object from the input date string
      const date = new Date(inputDate);

      // Define an array of month names
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      // Format the date in the desired format
      const formattedDate = `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;

      return formattedDate;
  }
  // Set alignment
  switch (align) {
    case 'right':
      xPos = doc.internal.pageSize.width - 10;
      break;
    case 'center':
      xPos = doc.internal.pageSize.width / 2;
      break;
    default:
      xPos = 10;
  }

  // Add name field
  doc.setFontSize(22);
  doc.setTextColor(0, 122, 204);
  doc.setFont('times', 'bold');
  doc.text(person.name, xPos, yPos, { align: align });
  yPos += 7 ;

  // Add email field
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.setFont('times', 'normal');
  doc.text(person.email, xPos, yPos, { align: align });
  yPos += lineHeight;

  // Add phone field
  doc.setTextColor(0, 0, 0);
  doc.text(person.phone, xPos, yPos, { align: align });
  yPos += lineHeight;

  // Add address field
  const addressLines = person.address.match(/.{1,50}/g); // Break address into lines of 50 characters
  addressLines.forEach((line, index) => {
  doc.setTextColor(0, 0, 0);
  if (index === 0) {
    doc.text(line, xPos, yPos, { align: align });
  } else {
    yPos += lineHeight; // Add margin for subsequent lines
    doc.text(line, xPos, 30, { align: align });
  }
  yPos += lineHeight; // Move to the next line
});

yPos += 20 ;
// Add Introduction title
doc.setFontSize(22);
doc.setTextColor(0, 122, 204);
doc.setFont('times', 'bold');
doc.text("Introduction:", headingXpos, yPos);

yPos += 5 ;
doc.setFontSize(12);
doc.setTextColor(0, 0, 0);
doc.setFont('times', 'normal');
const introductionLines = doc.splitTextToSize(person.introduction, doc.internal.pageSize.width - 20);
doc.text(introductionLines, headingXpos, yPos); // Remove { align: align } option

yPos += 30 ;
if(education.educationDetailsArray.length > 0){
doc.setFontSize(22);
doc.setTextColor(0, 122, 204);
doc.setFont('times', 'bold');
doc.text("Education:", headingXpos, yPos);
  

  if(education.selectedView == "table"){
  doc.autoTable({
    head: [['Institute', 'Qualification','Grades/Marks', 'Induction', 'Passing   ']],
    body: education.educationDetailsArray.map(detail => [detail.institute, detail.degreeName, detail.grade,formatDate(detail.inductionDate), formatDate(detail.passingDate)]),
    startY: yPos+5,
    margin: { top: yPos + 5, left: headingXpos },
    headStyles: {
      fillColor: [255, 255, 255], // White background color for header row
      textColor: [0, 122, 204],
      cellPadding: { top: 5, right: 5, bottom: 5, left: 3 }, // Increase the padding between header cells
      fontSize: 12,
      fontStyle: 'bold',
      lineWidth: 0.7,
      lineColor: [0, 0, 0],
    },
    columnStyles: {
      // Set transparent background color for each column
      0: { cellPadding: { top: 3.5, right: 3.5, bottom: 3.5, left: 3 }, fontStyle: 'bold', fontSize: 10, lineColor: [0, 0, 0], fillColor: 'white',lineWidth: 0.5  }, // Transparent background for the first column
      1: { cellPadding: { top: 3.5, right: 3.5, bottom: 3.5, left: 3 }, fontStyle: 'bold', fontSize: 10, lineColor: [0, 0, 0], fillColor: 'white',lineWidth: 0.5  }, // Transparent background for the second column
      2: { cellPadding: { top: 3.5, right: 3.5, bottom: 3.5, left: 3 }, fontStyle: 'bold', fontSize: 10, lineColor: [0, 0, 0], fillColor: 'white',lineWidth: 0.5  }, // Transparent background for the third column
      3: { cellPadding: { top: 3.5, right: 3.5, bottom: 3.5, left: 3 }, fontStyle: 'bold', fontSize: 10, lineColor: [0, 0, 0], fillColor: 'white',lineWidth: 0.5  },  // Transparent background for the fourth column
      4: { cellPadding: { top: 3.5, right: 3.5, bottom: 3.5, left: 3 }, fontStyle: 'bold', fontSize: 10, lineColor: [0, 0, 0], fillColor: 'white',lineWidth: 0.5  }  // Transparent background for the fourth column
    }
  });
  yPos+40
  }
  else{
    yPos += 8 ;
  education.educationDetailsArray.forEach(function(edu,index) {
  // Assuming xPos and yPos are predefined
  // Initial Y position of the text
  const singleEducation = Object.entries(edu);
  // Write each attribute of the 'edu' object in a new line
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('\u2022', headingXpos, yPos);
  singleEducation.forEach((current, index) => {
    const [key, value] = current;
    const [nextKey, nextValue] = singleEducation[index + 1] || [];
    const lastKey = singleEducation[singleEducation.length - 1][0];
    let text = `${value}`;
    const maxWidth = 180; // Maximum width of the text
    const lineHeight = 10; // Height of each line
    let lines = doc.splitTextToSize(text, maxWidth); // Split text into lines to fit maxWidth
    if (key !== lastKey && key !="degreeName" ) {
    if(key=="institute"){
      text = `${nextValue},${value}`;
      lines = doc.splitTextToSize(text, maxWidth);
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.setFont('times', 'bold');
    }
    else if(key=="grade"){
      text = `Passout with: ${value}`
      lines = doc.splitTextToSize(text, maxWidth);
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.setFont('times', 'bold');
    }else if(key=="inductionDate"){
      let inductionDateFormat = formatDate(value);
      let passingDateFormat = formatDate(nextValue);
      
      text = `${inductionDateFormat} - ${passingDateFormat}`;
      lines = doc.splitTextToSize(text, maxWidth);
      
      doc.setFontSize(10);
      doc.setTextColor(128, 128, 128);
      doc.setFont('times', 'bold');
    }

    doc.text(lines, headingXpos+5, yPos);
    yPos += 6; // Increment Y position for the next line
  }
      });

  });
  }
}
if(education.educationDetailsArray.length>0){
if(education.selectedView == "table"){
  yPos +=40;
  }
}

if(work.workDetailsArray.length > 0){
  education.educationDetailsArray.forEach(function(line) {
      yPos += 15;
    });
  doc.setFontSize(22);
  doc.setTextColor(0, 122, 204);
  doc.setFont('times', 'bold');
  doc.text("Work History:", 10, yPos);

  if(work.selectedView == "table"){
    
      doc.autoTable({
        head: [['Company', 'Designation', 'Induction', 'Passing   ']],
        body: work.workDetailsArray.map(detail => [detail.company, detail.designation, formatDate(detail.startingDate), formatDate(detail.endingDate)]),
        startY: yPos+5,
        margin: { top: yPos + 5, left: headingXpos },
        headStyles: {
          fillColor: [255, 255, 255], // White background color for header row
          textColor: [0, 122, 204],
          cellPadding: { top: 5, right: 5, bottom: 5, left: 3 }, // Increase the padding between header cells
          fontSize: 12,
          fontStyle: 'bold',
          lineWidth: 0.7,
          lineColor: [0, 0, 0],
        },
        columnStyles: {
          // Set transparent background color for each column
          0: { cellPadding: { top: 5, right: 5, bottom: 5, left: 3 }, fontStyle: 'bold', fontSize: 10, lineColor: [0, 0, 0], fillColor: 'white',lineWidth: 0.5  }, // Transparent background for the first column
          1: { cellPadding: { top: 5, right: 5, bottom: 5, left: 3 }, fontStyle: 'bold', fontSize: 10, lineColor: [0, 0, 0], fillColor: 'white',lineWidth: 0.5  }, // Transparent background for the second column
          2: { cellPadding: { top: 5, right: 5, bottom: 5, left: 3 }, fontStyle: 'bold', fontSize: 10, lineColor: [0, 0, 0], fillColor: 'white',lineWidth: 0.5  }, // Transparent background for the third column
          3: { cellPadding: { top: 5, right: 5, bottom: 5, left: 3 }, fontStyle: 'bold', fontSize: 10, lineColor: [0, 0, 0], fillColor: 'white',lineWidth: 0.5  },  // Transparent background for the fourth column
          4: { cellPadding: { top: 5, right: 5, bottom: 5, left: 3 }, fontStyle: 'bold', fontSize: 10, lineColor: [0, 0, 0], fillColor: 'white',lineWidth: 0.5  }  // Transparent background for the fourth column
        }
      });
      yPos+20
  }
  else{
  yPos += 8 ;
  work.workDetailsArray.forEach(function(work,index) {
  yPos += 2 
    // Assuming xPos and yPos are predefined
    // Initial Y position of the text
    const singleWork = Object.entries(work);
    // Write each attribute of the 'edu' object in a new line
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('\u2022', 10, yPos);
    singleWork.forEach((current, index) => {
        const [key, value] = current;
        const [nextKey, nextValue] = singleWork[index + 1] || [];
        const lastKey = singleWork[singleWork.length - 1][0];
        let text = `${value}`;
        const maxWidth = 180; // Maximum width of the text
        const lineHeight = 5; // Height of each line
        let lines = doc.splitTextToSize(text, maxWidth); // Split text into lines to fit maxWidth
        if ( key !== lastKey ) {
        if( key=="company" ){
          text = `${value}`;
          lines = doc.splitTextToSize(text, maxWidth);
          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0);
          doc.setFont('times', 'bold');
        }
        else if(key=="startingDate"){
          const formatDate=(inputDate) =>{
    // Create a new Date object from the input date string
    const date = new Date(inputDate);

    // Define an array of month names
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Format the date in the desired format
    const formattedDate = `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;

    return formattedDate;
}
          let inductionDateFormat = formatDate(value);
          let passingDateFormat = formatDate(nextValue);
          
          text = `${inductionDateFormat} - ${passingDateFormat}`;
          lines = doc.splitTextToSize(text, maxWidth);
          doc.setFontSize(10);
          doc.setTextColor(128, 128, 128);
          doc.setFont('times', 'bold');
        }
      
        doc.text(lines, xPos+5, yPos);
        yPos += lineHeight; // Increment Y position for the next line
      }
          });
    
    });
  }
  if(work.workDetailsArray.length>0){
    if(work.selectedView == "table"){
      yPos +=40;
    }
  }
}


if(skill.skillDetailsArray.length > 0){
  skill.skillDetailsArray.forEach(function(line) {
      yPos += 15;
    });
    if(education.educationDetailsArray.length >=3 && work.workDetailsArray.length>=2)
    {
      doc.addPage();
      yPos = 15;
    }
  doc.setFontSize(22);
  doc.setTextColor(0, 122, 204);
  doc.setFont('times', 'bold');
  doc.text("Skills:", 10, yPos);
  
  if(skill.selectedView == "table"){
    doc.autoTable({
        head: [['Name', 'Experience', 'Rating']],
        body: skill.skillDetailsArray.map(detail => [detail.name, `${detail.yearsofexperience} year`, detail.rating]),
        startY: yPos+5,
        margin: { top: yPos + 5, left: xPos },
        headStyles: {
          fillColor: [255, 255, 255], // White background color for header row
          textColor: [0, 122, 204],
          cellPadding: { top: 5, right: 5, bottom: 5, left: 3 }, // Increase the padding between header cells
          fontSize: 12,
          fontStyle: 'bold',
          lineWidth: 0.7,
          lineColor: [0, 0, 0],
        },
        columnStyles: {
          // Set transparent background color for each column
          0: { cellPadding: { top: 5, right: 5, bottom: 5, left: 3 }, fontStyle: 'bold', fontSize: 10, lineColor: [0, 0, 0], fillColor: 'white',lineWidth: 0.5  }, // Transparent background for the first column
          1: { cellPadding: { top: 5, right: 5, bottom: 5, left: 3 }, fontStyle: 'bold', fontSize: 10, lineColor: [0, 0, 0], fillColor: 'white',lineWidth: 0.5  }, // Transparent background for the second column
          2: { cellPadding: { top: 5, right: 5, bottom: 5, left: 3 }, fontStyle: 'bold', fontSize: 10, lineColor: [0, 0, 0], fillColor: 'white',lineWidth: 0.5  }, // Transparent background for the third column
          3: { cellPadding: { top: 5, right: 5, bottom: 5, left: 3 }, fontStyle: 'bold', fontSize: 10, lineColor: [0, 0, 0], fillColor: 'white',lineWidth: 0.5  },  // Transparent background for the fourth column
          4: { cellPadding: { top: 5, right: 5, bottom: 5, left: 3 }, fontStyle: 'bold', fontSize: 10, lineColor: [0, 0, 0], fillColor: 'white',lineWidth: 0.5  }  // Transparent background for the fourth column
        }
      });
      yPos+20
  }
  else{
    yPos += 8 ;
  skill.skillDetailsArray.forEach(function(skill,index) {
  yPos += 2 
    // Assuming xPos and yPos are predefined
    // Initial Y position of the text
    const singleSkill = Object.entries(skill);
    // Write each attribute of the 'edu' object in a new line
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('\u2022', 10, yPos);
    singleSkill.forEach((current, index) => {
        const [key, value] = current;
        const [nextKey, nextValue] = singleSkill[index + 1] || [];
        const lastKey = singleSkill[singleSkill.length - 1][0];
        let text = `${value}`;
        const maxWidth = 180; // Maximum width of the text
        const lineHeight = 5; // Height of each line
        let lines = doc.splitTextToSize(text, maxWidth); // Split text into lines to fit maxWidth
        if ( key !== lastKey ) {
        if( key=="name" ){
          text = `${value} with ${nextValue} year of Experience`;
          lines = doc.splitTextToSize(text, maxWidth);
          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0);
          doc.setFont('times', 'bold');
        }
        else{
          text = `With the rating of ${value} Skill Set out of 10`;
          lines = doc.splitTextToSize(text, maxWidth);
          doc.setFontSize(10);
          doc.setTextColor(128, 128, 128);
          doc.setFont('times', 'bold');
        }
      
        doc.text(lines, xPos+5, yPos);
        yPos += lineHeight; // Increment Y position for the next line
      }
          });
    
    });
  }
}

  // Save or preview the PDF
  const pdfData = doc.output('blob');
  const url = URL.createObjectURL(pdfData);
  window.open(url, '_blank');
    }
  }
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>