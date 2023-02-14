class SurveySet
{
    question;
    options = [];
    constructor(question,options)
    {
        this.question =question;
        this.options=options;
    }
}
class Survey
{
        surveyName ;
        questionBank = [];
    constructor(surveyName,questionBank)
    {
        this.surveyName=surveyName;
        this.questionBank=questionBank;
    }
}
const surveys = [];
const questionBank = [];

//  ----------------------COMPONENT 1-------------------------//

Vue.component('add-questions-component',{
    data(){
        return {
            surveyName: "",
            question: "",
            options: [],
            count:0,
            displayAddMore: true,
            displayO3 : false,
            displayO4 : false,
            questionBank : [],
            displaySurveyName: true

        }
    },
  
    template:
    `<div> 
    <div  class="mb-6 pb-6 " id="createSurvey">

            <div v-if="displaySurveyName">  
                <h1 class="title is-4">Enter Survey Name</h1>
                <input class="input my-4 is-medium" type="text"  id="surveyName" v-model="surveyName">
            </div>

            <div v-if="!displaySurveyName">
                <h1 class="title  has-text-centered box mb-6"> SURVEY NAME :  {{ this.surveyName}} </h1>
            </div>     

        <h1 class="title"> Enter Questions and Options </h1>

        <form action="" class="form my-6" id="createSurveyForm">
    
            <label class="label my-5 subtitle">Please type the  question below</label>
            <input class="textarea mb-6" v-model="question"> 
        
            <label class="label subtitle" id="options">Enter  options </label>
                <div id="div1">    
                    <input class="input is-info my-1" placeholder="Option 1" v-model="options[0]" >
                </div>

                <div id="div2">
                    <input class="input is-info my-1" placeholder="Option 2" v-model="options[1]"  >
                </div>

                <div id="div3" >
                    <input class="input is-info my-1" placeholder="Option 3" id="option3" v-if="displayO3" v-model="options[2]" >
                </div>  

                <div id="div4" >
                    <input class="input is-info my-1" placeholder="Option 4" id="option3" v-if="displayO4" v-model="options[3]" >
                </div>

            <div class= "mt-4">
            <button v-on:click.prevent="addMoreOptions()" class="button  is-rounded is-medium" v-if="displayAddMore">Add more options</button>
            <button v-on:click.prevent="addQuestion()" class="button  is-rounded is-medium is-success">Add Question</button>
            <button v-on:click.prevent="addSurvey()" class="button  is-rounded is-medium is-success is-light is-outlined ">Add Survey </button>
            </div>

         </form>

    </div>
    </div> ` ,
    methods:
    {
        addMoreOptions: function(){    

            this.count ++;
            if(this.count%2 != 0) 
            {
                this.displayO3 = true;
            }
            else 
            {
                this.displayO4 = true;
                this.displayAddMore = false;

            }
            console.log(this.count);
            
        },
        addQuestion: function(){

            if(this.surveyName == ""){ alert('Enter Survey Name')}
            else if (this.question == "") { alert('Enter Question')}
            else if ((this.options[0]== null) || (this.options[1]== null)) { alert('Enter at-least two options')}

            else{ 
                const surveySetObj = new SurveySet(this.question, this.options);
                questionBank.push(surveySetObj);     
                alert('Question and corresponding options saved successfully!')
                
                document.getElementById('createSurveyForm').reset();  
                this.question = "";
                this.options = [];
                this.displayO3 = false,
                this.displayO4 = false,
                this.displayAddMore= true,
                this.displaySurveyName = false
            }
        },
        addSurvey: function(){
             const surveyObj = new Survey(this.surveyName,[...questionBank]);
             surveys.push(surveyObj);
             questionBank.splice(0,questionBank.length);
             alert('Your Survey was added successfully!')

             this.displaySurveyName = true;
        }

    }

 }); 

//  ----------------------COMPONENT 2-------------------------//

 Vue.component('view-survey-component',{
    data(){
        return {
            varSurveys: surveys,
        }
    },

    template: 
    ` <div> 
        <div v-for= "s  in varSurveys" class="box ">
            <div class="mgl">
                <div class="title is-3 is-uppercase has-text-weight-semibold">{{ s.surveyName }} </div>
                
                <div class="box">
                    <div v-for= "q in s.questionBank" class="title is-5 is-capitalized has-text-weight-normal has-text-grey-dark my-2"> Question:
                         {{  q.question }}
                    <div v-for="option of q.options" class="title is-6 has-text-weight-medium has-text-grey my-1"> <input type="radio"> 
                         {{option}}
                    </div>
                </div>
                   
                </div>
            </div>
        </div> 
    </div> `

 })


// --------------------------PARENT COMPONENT----------------------//

new Vue ({
    el: '#app',
    data: { 
             displayContent1 : false,
          }
}) 