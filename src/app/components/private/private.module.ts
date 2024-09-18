import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SurveyListComponent} from "./survey-list/survey-list.component";
import { SurveyComponent } from "./survey/survey.component";
import { RouterModule, Routes } from "@angular/router";
import { SurveyService } from "src/app/services/survey.service";
import { ApiService } from "src/app/services/api.service";
import { StorageService } from "src/app/services/storage.service";
import { LoaderService } from "src/app/services/loader.service";
import { NotificationService } from "src/app/services/notification.service";
import { CardComponent } from "./survey-list/card.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SurveyPreviewComponent } from "./survey-preview/survey-preview.component";
import { SurveyResponsesComponent } from "./survey-response/survey-response.component";
import { SurveyResponseService } from "src/app/services/survey-response.service";
import { LoginGuard } from "src/app/guards/login.guard";
import { DatePipe } from "@angular/common";
import { DateFormatPipe } from "src/app/pipes/format-date.pipe";
const routes: Routes = [
    {
        path: "surveys",
        component: SurveyListComponent,
        canActivate: [LoginGuard],
    },
    {
      path: "survey",
      component: SurveyComponent,
      canActivate: [LoginGuard],
    },
    {
      path: "survey/:id",
      component: SurveyComponent,
      canActivate: [LoginGuard],
    },
    {
      path: "survey/:id/preview",
      component: SurveyPreviewComponent,
      canActivate: [LoginGuard],
    },
    {
      path: "survey/:id/responses",
      component: SurveyResponsesComponent,
      canActivate: [LoginGuard],
    }
];



@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, ReactiveFormsModule],
  declarations: [
    SurveyListComponent, 
    SurveyComponent, 
    CardComponent, 
    SurveyPreviewComponent, 
    SurveyResponsesComponent,
    DateFormatPipe
  ],
  exports: [SurveyListComponent, SurveyComponent, SurveyPreviewComponent, SurveyResponsesComponent],
  providers: [
    ApiService,
    StorageService,
    LoaderService,
    SurveyService,
    NotificationService,
    SurveyResponseService,
    LoginGuard,
    DatePipe,
  ],
})
export class PrivateModule {}