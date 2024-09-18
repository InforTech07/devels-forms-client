import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(next: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        // Capturar next params
        let nextParam: string = '';
        let urlSegments = next.pathFromRoot.filter(snapshot => snapshot.url.length > 0).map(
            v => v.url.map(
                segment => segment.toString()
            )
        );

        // Eliminamos el lang de la url
        if (urlSegments.length > 0) {
            urlSegments[0].shift();
        }

        // Recorremos los segmentos para unirlos con /
        urlSegments.forEach((val) => {
            let urlSegment = val.join('/');
            nextParam = nextParam.length > 0 ? [nextParam, urlSegment].join('/') : urlSegment;
        });

        // Comprobar si no existe información de algún usuario autenticado retornar falso
        if (!this.authService.getUserInfo()) {
            this.router.navigate([`/login`], { queryParams: { next: nextParam } }).then();
            return false;
        }

        return true;
    }
}