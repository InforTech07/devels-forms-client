import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { SurveyService } from "src/app/services/survey.service";
import { LoaderService } from "src/app/services/loader.service";
import { NotificationService } from "src/app/services/notification.service";
import { Survey, Question } from "src/app/interfaces/survey.interface";

@Component({
  selector: "app-new-survey",
  templateUrl: "./survey.component.html",
})
export class SurveyComponent implements OnInit {

  public showSurveyForm: boolean = true;
  public showSurveyQuestionForm: boolean = false;
  public showQuestionOptionForm: boolean = false;
  public editMode: boolean = false;
  public survey: Survey = {
    id: 0,
    name: "",
    description: "",
    token: "",
    createdAt: "",
    updatedAt: "",
    questions: []
  };

  public questions: Question[] = [];

  public newSurveyForm!: FormGroup;
  public newQuestionForm!: FormGroup;
  public newOptionForm!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private surveyService: SurveyService,
    private loader: LoaderService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
        if(params && params["id"]) {
          this.loader.show();
          this.surveyService.getSurvey(params["id"]).subscribe((response) => {
            this.survey = response;
            this.questions = response.questions;
            this.editMode = true;
            this.loader.hide();
            console.log(this.questions);
          });
        }else {
          this.initNewSurveyForm();
          this.initNewQuestionForm();
        }
      });
  }


  private initNewSurveyForm() {
    this.newSurveyForm = this.formBuilder.group({
      name: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
    });
  }

  private initNewQuestionForm() {
    this.newQuestionForm = this.formBuilder.group({
      surveyId: new FormControl(this.survey.id, [Validators.required]),
      text: new FormControl("", [Validators.required]),
      type: new FormControl("", [Validators.required]),
      required: new FormControl(false, [Validators.required]),
    });
  }

  private initOptionQuestionForm(id: number = 0) {
    this.newOptionForm = this.formBuilder.group({
      label: new FormControl("", [Validators.required]),
      isCorrect: new FormControl(false, [Validators.required]),
      surveyQuestionId: new FormControl(id, [Validators.required]),
    });
  }

  public newQuestion() {
    this.initNewQuestionForm();
    this.showSurveyQuestionForm = true;
    this.showSurveyForm = false;
  }

  public submitSurvey($event: any) {
    $event.preventDefault();
    if(this.newSurveyForm.valid) {
      this.loader.show();
      this.surveyService.newSurvey(this.newSurveyForm.value).subscribe((response) => {
        this.survey = response;
        this.showSurveyForm = false;
        this.loader.hide();
        this.notification.success("Encuesta creada correctamente", 3000);
      }, (error) => {
        console.log(error);
        this.loader.hide();
        this.notification.error("No se pudo crear la encuesta", 3000);
      });
    }else {
      console.log("Invalid form");
    }
  }

  public submitQuestion($event: any) {
    $event.preventDefault();
    if(this.newQuestionForm.valid) {
      this.loader.show();
      this.surveyService.addQuestion(this.newQuestionForm.value).subscribe((response) => {
        if(response.type == "text" || response.type == "number" || response.type == "date") {
          
          this.generateOptionForm(response.type, response.id);
          this.submitOption($event);
        }
        if(response.type == "single-choice"){
          this.generateOptionForm(response.type, response.id);
          this.showQuestionOptionForm = true;
        }
        response.options = [];
        this.questions.push(response);
        this.loader.hide();
        this.notification.success("Pregunta creada correctamente", 3000);
      });
    }else {
      console.log("Invalid form");
    }
  }

  public submitOption($event: any) {
    $event.preventDefault();
    if(this.newOptionForm.valid) {
      this.loader.show();
      this.surveyService.addOption(this.newOptionForm.value).subscribe((response) => {
        if(response) {
          const question = this.questions.find((question) => question.id == response.surveyQuestionId);
          if(question?.options){
            question.options.push(response);
          }
        }
        this.showSurveyForm = false;
        this.showSurveyQuestionForm = false;
        this.showQuestionOptionForm = false;
        this.newQuestionForm.reset();
        this.newOptionForm.reset();
        this.notification.success("Opción creada correctamente", 3000);
        this.loader.hide();
      });
    }else {
      console.log("Invalid form");
    }
  }

  private generateOptionForm(type: string, questionId: number) {
    this.initOptionQuestionForm();
    switch(type) {
      case "text":
        this.newOptionForm.setValue({label: "Ingrese texto", isCorrect: false, surveyQuestionId: questionId});
        break;
      case "number":
        this.newOptionForm.setValue({label: "Ingrese un número", isCorrect: false, surveyQuestionId: questionId});
        break;
      case "date":
        this.newOptionForm.setValue({label: "Ingrese una fecha", isCorrect: false, surveyQuestionId: questionId});
        break;
      case "single-choice":
        this.newOptionForm.setValue({label: "", isCorrect: true, surveyQuestionId: questionId});
        break;
      default:
        this.newOptionForm.setValue({label: "Ingrese una opción", isCorrect: false, surveyQuestionId: questionId});
        break;
    }
  }

  public deleteQuestion(id: number) {
    console.log(id);
  }

  public editQuestion(id: number) {
    console.log(id);
  }
}