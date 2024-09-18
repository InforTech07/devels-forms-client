import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { SurveyService } from "src/app/services/survey.service";
import { initFlowbite } from "flowbite";
import { Survey } from "src/app/interfaces/survey.interface";
import { NotificationService } from "src/app/services/notification.service";

@Component({
  selector: "app-survey-preview",
  templateUrl: "./survey-preview.component.html",
})
export class SurveyPreviewComponent implements OnInit {
  surveyPreview!: Survey;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private surveyService: SurveyService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    //initFlowbite();
    this.route.params.subscribe((params) => {
      const id = params["id"];
      if(id) {
        this.surveyService.getSurvey(id).subscribe((survey) => {
            this.surveyPreview = survey;
        });
      }}); 
  }

  

}