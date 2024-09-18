import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { SurveyService } from "src/app/services/survey.service";
import { initFlowbite } from "flowbite";
import { Survey } from "src/app/interfaces/survey.interface";
import { NotificationService } from "src/app/services/notification.service";
import { SurveyResponseService } from "src/app/services/survey-response.service";

@Component({
  selector: "app-survey-response",
  templateUrl: "./survey-response.component.html",
})
export class SurveyResponsesComponent implements OnInit {
  survey!: Survey;
  showPagination: boolean = false;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private surveyService: SurveyService,
    private notification: NotificationService,
    private surveyResponseService: SurveyResponseService
  ) {}

  ngOnInit(): void {
    //initFlowbite();
    this.route.params.subscribe((params) => {
      const id = params["id"];
      if(id) {
        this.surveyService.getSurvey(id).subscribe((survey) => {
            this.survey = survey;
        });
      }}); 
  }

  public getAnswers(id:number, index:number) {
    this.surveyResponseService.getResponsesByQuestionId(id).subscribe((response) => {
        if(!response) {
            this.notification.info("No hay respuestas para esta pregunta");
            //this.survey.questions[index].answers = response;
        }

        if(this.survey && this.survey.questions && this.survey.questions[index] && this.survey.questions[index].responses) {
            console.log(this.survey.questions[index].responses);
        }else{
            this.survey.questions![index].responses = [];
            this.survey.questions![index].responses = response;
        }
    });
  }

  

}