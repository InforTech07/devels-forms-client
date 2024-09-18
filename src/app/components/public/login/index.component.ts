import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NotificationService } from "src/app/services/notification.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
  }


  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
   });
  }

  login() {
    if(this.loginForm.valid) {
      const data = this.loginForm.value;
      this.authService.login(data).subscribe((resp) => {
        if(resp.access_token){
          this.router.navigate(["/app/surveys"]);
        }else {
          this.notificationService.error("Invalid credentials");
        }
      }, (error) => {
        console.error(error); // Handle error in a better way than
      });
    }
  }
}