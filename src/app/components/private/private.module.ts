import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SurveyListComponent} from "./survey-list/index.component";
import { SurveyComponent } from "./survey/survey.component";
import { RouterModule, Routes } from "@angular/router";
import { SurveyService } from "src/app/services/survey.service";
import { ApiService } from "src/app/services/api.service";
import { StorageService } from "src/app/services/storage.service";
import { LoaderService } from "src/app/services/loader.service";
import { NotificationService } from "src/app/services/notification.service";
import { CardComponent } from "./survey-list/card.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
const routes: Routes = [
    {
        path: "surveys",
        component: SurveyListComponent,
    },
    {
      path: "survey",
      component: SurveyComponent,
    },
    {
      path: "survey/:id",
      component: SurveyComponent,
    }
];



@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, ReactiveFormsModule],
  declarations: [SurveyListComponent, SurveyComponent, CardComponent],
  exports: [SurveyListComponent, SurveyComponent],
  providers: [
    ApiService,
    StorageService,
    LoaderService,
    SurveyService,
    NotificationService
  ],
})
export class PrivateModule {}