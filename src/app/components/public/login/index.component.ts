import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log("LoginComponent initialized");
  }

  login() {
    console.log("Login clicked");
    this.router.navigate(["/dashboard"]);
  }
}