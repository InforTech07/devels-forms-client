import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/index.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SurveyResponseComponent } from "./survey-response/survey-response.component";
import { ApiService } from "src/app/services/api.service";
import { StorageService } from "src/app/services/storage.service";
import { SurveyResponseService } from "src/app/services/survey-response.service";
import { AuthService } from "src/app/services/auth.service";
import { RegisterComponent } from "./register/register.component";
import { ErrorMessageComponent } from "../utils/messager-error/message-error.component";
import { UserService } from "src/app/services/user.service";
import { LoaderService } from "src/app/services/loader.service";
import { LoaderComponent } from "../utils/loader/loader.component";

const routes: Routes = [
    {
        path: "login",
        component: LoginComponent,
    },
    {
        path: "register",
        component: RegisterComponent,
    }, 
    {
      path: "survey-response/:access",
      component: SurveyResponseComponent
    }
];

@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ErrorMessageComponent,
    LoaderComponent
  ],
  declarations: [LoginComponent, SurveyResponseComponent, RegisterComponent],
  exports: [LoginComponent, SurveyResponseComponent, RegisterComponent],
  providers: [
    ApiService,
    StorageService,
    SurveyResponseService,
    AuthService,
    UserService,
    LoaderService
  ]
})
export class PublicModule {}