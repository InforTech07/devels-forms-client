import { of, throwError, Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { find, isEqual } from 'lodash';
import { StorageService } from './storage.service';
import { NotificationService } from './notification.service';
import { LoaderService } from './loader.service';


interface IApiErrorInterface {
    timestamp: string,
    status: string,
    error: string,
    message: string
    path: string
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    private XAPI_KEY: { [key: string]: string } = {
        'x-api-key': 'djlkls'
    };

    private cache: any[] = [];

    sessionExpiredMessage: string = '';

    constructor(
        private http: HttpClient,
        private router: Router,
        private storage: StorageService,
        private notification: NotificationService,
        private loader: LoaderService,
    ) { }

    /**
   * Funcion que se encarga de agregar los tokens de sesion a la cabecera de la peticion
   * @param headers
   */
    private setToken(headers: HttpHeaders): HttpHeaders {
        const TOKEN: string = this.storage.get('session.token');
        const TOKEN_TYPE: string = this.storage.get('session.tokenType');
        const DYNAMIC_TOKEN: string = this.storage.get('session.dynamicToken');

        if (TOKEN && DYNAMIC_TOKEN) {
            headers = headers.set('Authorization', `${TOKEN_TYPE} ${TOKEN}`);
            headers = headers.set('dynamicToken', DYNAMIC_TOKEN);
        }

        return headers;
    }

    /**
   * Funcion que genera la cabecera de tipo application/json
   */
    private makeHeader(language?: string): HttpHeaders {

        let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        ...this.XAPI_KEY,
        });

        headers = this.setToken(headers);

        return headers;
    }

    private addOriginInURL(url: string): string {
        return `${url}?origin=devel-web`;
    }

    /**
   * Método get, recibe el path y parametros opcionales que puedan ser necesarios para la petición
   * @param url dirección final de la url de la petición
   * @param params parametros añadidos a la url final
   * @param cache permite guardar o no guardarlo en la cache
   * @param options configuracion de las opciones
   * @param responseIsBlob bandera para añadir responseContentBlob
   */
    get(url: string, params?: any, cache?: boolean, options?: any, language?: string): Observable<any> {
        url = this.addOriginInURL(url);
        let headers = this.makeHeader(language);
        let httpParams = new HttpParams();

        if (params) {
        Object.keys(params).forEach(key => {
            httpParams = httpParams.set(key, params[key]);
        });
        }

        if (cache) {
        const cachedResponse = find(this.cache, (o) => isEqual(o.path, url) && isEqual(o.params, params));
        if (cachedResponse) {
            return of(cachedResponse.result);
        }
        }

        return this.http.get(url, { headers, params: httpParams, ...options }).pipe(
            map((response: any) => {
                if (cache) {
                this.cache.push({ path: url, params, result: response });
                }
                return response;
            }),
            catchError(this.handleError.bind(this))
        );
    }

    /**
   * Método post, recibe el path y el body
   * @param url dirección final de la url de la petición
   * @param body objeto Json u objeto a pasar por JSON.stringify para la petición
   * @param options configuracion de las opciones
   * @param urlDeleteCache borra de la cache la url seleccionada
   */
    post(url: string, body: any, options?: any, urlDeleteCache?: string, params?: any): Observable<any> {
        url = this.addOriginInURL(url);
        let headers = this.makeHeader();
        let httpParams = new HttpParams();

        if (params) {
        Object.keys(params).forEach(key => {
            httpParams = httpParams.set(key, params[key]);
        });
        }

        if (options && options['Content-Type'] === 'multipart/form-data') {
        headers = new HttpHeaders({ ...this.XAPI_KEY });
        headers = this.setToken(headers);
        }

        return this.http.post(url, body, { headers, params: httpParams, ...options }).pipe(
            map((response: any) => {
                if (urlDeleteCache)
                    this.deleteCache(urlDeleteCache);
                return response;
            }),
            catchError(this.handleError.bind(this))
        );
    }

    /**
     * Metodo put, recibe el path y el body
     * @param url dirección final de la url de la petición
     * @param body objeto Json u objeto a pasar por JSON.stringify para la petición
     * @param options configuracion de las opciones
     * @param urlDeleteCache borra de la cache la url seleccionada
     * @param params parametros añadidos a la url final
     * @returns
     */

    put(url: string, body: any, options?: any, urlDeleteCache?: string, params?: any): Observable<any> {
        url = this.addOriginInURL(url);

        let headers = this.makeHeader();
        if (options?.headers) {
            headers = { ...headers, ...options.headers };
        }

        let httpParams = new HttpParams();
        if (params) {
            for (const key in params) {
                httpParams = httpParams.set(key, params[key]);
            }
        }

        return this.http.put(url, body, { headers, params: httpParams })
            .pipe(
                map((response: any) => {
                    if (urlDeleteCache)
                        this.deleteCache(urlDeleteCache);
                    return response;
                }),
                catchError(this.handleError.bind(this))
            );
    }

    /*
    * Metodo delete, recibe el path y el body
    * @param url dirección final de la url de la petición
    * @param urlDeleteCache borra de la cache la url seleccionada
    * @returns
    */
    delete(url: string): Observable<any> {
        url = this.addOriginInURL(url);

        const headers = this.makeHeader();
        return this.http.delete(url, { headers })
            .pipe(
                map((response: any) => {
                    return response;
                }),
                catchError(this.handleError.bind(this))
            );
    }




    /**
   * Función para manejar errores de solicitudes HTTP
   */
    private handleError(error: HttpErrorResponse): Observable<never> {
        if (error && error.status) {
            let errorApi: IApiErrorInterface = error.error;
            switch (error.status) {
                case 401:
                    this.sessionExpired();
                    break;
                case 403:
                    if (errorApi.message == 'Access Denied') {
                        this.sessionExpired();
                    } else {
                        this.notification.error(errorApi.message ? errorApi.message : 'Error');
                        // this.loader.hide();
                    }
                    break;
                default:
                    this.notification.error(errorApi.message ? errorApi.message : 'Error');

                    // this.loader.hide();
                    break;
            }
            this.loader.hide();
        } else {
            this.notification.error(
                'A network error occurred. This could be a CORS issue or a dropped internet connection. It is not possible for us to know.\n XMLHttpRequest at Error CORS'
            );
            this.loader.hide();
        }
        // Manejo de errores según la respuesta
        return throwError(() => new Error('Error en la solicitud HTTP'));
    }

    /**
     * Función para borrar la cache
     */
    private deleteCache(url: string): void {
        this.cache = this.cache.filter(item => item.path !== url);
    }

    /**
     * Función para mostrar mensaje de session expirada y redigir al login
     */
    private sessionExpired(): void {
        this.notification.info(this.sessionExpiredMessage);
        this.storage.clear();
        this.router.navigate(['/login']);
    }
}