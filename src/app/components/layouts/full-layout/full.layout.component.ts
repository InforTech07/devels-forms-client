import { Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-simple-layout',
    templateUrl: './full.layout.component.html',
})
export class FullLayoutComponent  {
    constructor(
        private router: Router
    ) {}

    ngOnInit(): void {
        //this.router.navigate(["app/surveys"]);
    }

    navigateTo(route: string) {
        this.router.navigate([route]);
    }
}