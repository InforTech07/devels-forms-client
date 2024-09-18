import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Survey } from "src/app/interfaces/survey.interface";
import { SurveyResponseService } from "src/app/services/survey-response.service";
import { FormArray, FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl } from "@angular/forms";
import { Question } from "src/app/interfaces/survey.interface";
import { NotificationService } from "src/app/services/notification.service";
import { set } from "lodash";
  
export interface SurveyResponse {
  surveyQuestionId: number;
  selectedOptionId?: number;
  textAnswer?: string;
  dateAnswer?: string;
  numberAnswer?: number;
}

interface OptionFormGroup {
  optionId: number;
  selected: boolean;
}
@Component({
  selector: "app-survey-response",
  templateUrl: "./survey-response.component.html",
})
export class SurveyResponseComponent implements OnInit {

    public survey!: Survey;
    public surveyResponseForm!: FormGroup;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private surveyResponseService: SurveyResponseService,
        private formBuilder: FormBuilder,
        private notificationService: NotificationService
    ) {}

    ngOnInit(): void {
        this.surveyResponseForm = this.formBuilder.group({
            responses: this.formBuilder.array([]),
        });

        this.route.params.subscribe((params) => {
            if(params && params["access"]) {
                this.surveyResponseService.getSurveyByAccess(params["access"]).subscribe((response) => {
                    if(response.questions.length > 0) {
                        this.survey = response;
                        this.createForm(response.questions);
                    }
                });
            }
        });
    }

    get responses() {
        return this.surveyResponseForm.get('responses') as FormArray;
    }


    createForm(questions: Question[]) {
      questions.forEach((question) => {
        // Definir el control inicial con validadores
        const controls = {
          surveyQuestionId: [question.id],
          textAnswer: [null],
          dateAnswer: [null],
          numberAnswer: [null],
          selectedOptions: this.formBuilder.array([]) // FormArray para opciones
        };
        const formGroup = this.formBuilder.group(controls);

        // Si es una pregunta con opciones, agrega un FormArray para las opciones
        if (question.type === 'single-choice' || question.type === 'multiple-choice') {
          const optionsArray = this.formBuilder.array(
            question.options?.map(option => this.formBuilder.group({
              optionId: [option.id],
              selected: [false] // Booleano para indicar si la opción fue seleccionada
            })) || []
          );

          formGroup.setControl('selectedOptions', optionsArray as FormArray);
        }

        this.responses.push(formGroup);
      });
    }




 requiredOptionValidator(): ValidatorFn {
  return (formArray: AbstractControl): ValidationErrors | null => {
    if (!(formArray instanceof FormArray)) {
      throw new Error('requiredOptionValidator must be used with FormArray');
    }

    const hasSelectedOption = formArray.controls.some(control => control.get('selected')?.value);
    return hasSelectedOption ? null : { requiredOption: true };
  };
  }


    submit() {
        //validar si las respuestas obligatorias estan completas
        const responses = this.surveyResponseForm.value.responses;
        console.log(responses);
        this.surveyResponseService.saveSurveyResponse(responses).subscribe((response) => {
            if(response){
              this.notificationService.success('Respuestas guardadas correctamente', 1000);
              setTimeout(() => {
                this.router.navigate(['/']);
              }, 1000);
            }
        });
    }
}