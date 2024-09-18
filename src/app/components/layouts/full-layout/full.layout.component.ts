import { Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'app-simple-layout',
    templateUrl: './full.layout.component.html',
})
export class FullLayoutComponent  {
    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        //this.router.navigate(["app/surveys"]);
    }

    navigateTo(route: string) {
        this.router.navigate([route]);
    }

    logout() {
        this.authService.logout();
        this.router.navigate(["/login"]);
    }
}