import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { NotificationService } from "src/app/services/notification.service";
import { LoaderService } from "src/app/services/loader.service";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.initRegisterForm();
  }


  initRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
   });
  }

  register() {
    if(this.registerForm.valid) {
      this.loaderService.show();
      const data = this.registerForm.value;
      this.userService.newUser(data).subscribe((resp) => {
        this.router.navigate(["/login"]);
        this.loaderService.hide();
        this.notificationService.success('Usuario creado correctamente');
      });
    }else{
      this.notificationService.error('Por favor, complete los campos requeridos');
    }
  }

}