import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { SurveyService } from "src/app/services/survey.service";
import { initFlowbite } from "flowbite";
import { Survey } from "src/app/interfaces/survey.interface";
import { NotificationService } from "src/app/services/notification.service";

@Component({
  selector: "app-survey-list",
  templateUrl: "./survey-list.component.html",
})
export class SurveyListComponent implements OnInit {

  surveys: Survey[] = [];
  surveyPreview!: Survey;

  constructor(
    private router: Router, 
    private surveyService: SurveyService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    initFlowbite();
    this.surveyService.getSurveys().subscribe((surveys) => {
      this.surveys = surveys;
    });
  }

  newSurvey() {
    this.router.navigate(["app/survey"]);
  }

  removeSurvey(id: number) {
    const res = confirm("Esta seguro de eliminar?");
    if (res) {
      this.surveyService.deleteSurvey(id).subscribe((response) => {
        if(response) {
          this.surveys = this.surveys.filter((survey) => survey.id !== id);
          this.notification.success("Encuesta eliminada correctamente");
        }
      }
      );
    }
  }

  showPreview(id: number) {
    this.router.navigate([`app/survey/${id}/preview`]);
  }

}