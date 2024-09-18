import { Observable, map, forkJoin, catchError, of } from "rxjs";
import { Injectable, } from "@angular/core";
import { environment } from "src/environments/environment";
import { ApiService } from "./api.service";
import { StorageService } from "./storage.service";


const API: string = environment.API_APP;

@Injectable(
    {providedIn: 'root'}
)
export class SurveyResponseService {
    constructor(
        private api: ApiService,
        private storage: StorageService
    ){}

    //get survey by accesscode
    public getSurveyByAccess(access: string): Observable<any> {
        const url: string = `${API}/surveys/token/${access}`;
        return this.api.get(url).pipe(
            map((response: any) => {
                return response;
            }),
            catchError(error => {
                return of(undefined);
            })
        );
    }

    public saveSurveyResponse(responses: any): Observable<any> {
        const url: string = `${API}/survey-responses/responses`;
        return this.api.post(url, responses).pipe(
            map((response: any) => {
                return response;
            }),
            catchError(error => {
                return of(undefined);
            })
        );
    }

    public saveQuestionResponse(response: any): Observable<any> {
        const url: string = `${API}/survey-responses/${response.surveyQuestionId}`;
        return this.api.post(url, response).pipe(
            map((response: any) => {
                return response;
            }),
            catchError(error => {
                return of(undefined);
            })
        );
    }

    public getResponsesByQuestionId(id: number): Observable<any> {
        const url: string = `${API}/survey-responses/${id}`;
        return this.api.get(url).pipe(
            map((response: any) => {
                return response;
            }),
            catchError(error => {
                return of(undefined);
            })
        );
    }

}