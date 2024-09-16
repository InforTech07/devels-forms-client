import { Observable, map, forkJoin, catchError, of } from "rxjs";
import { Injectable, } from "@angular/core";
import { environment } from "src/environments/environment";
import { ApiService } from "./api.service";
import { StorageService } from "./storage.service";


const API: string = environment.API_APP;

@Injectable(
    {providedIn: 'root'}
)
export class SurveyService {
    constructor(
        private api: ApiService,
        private storage: StorageService
    ){}

    //get all surveys
    public getSurveys(): Observable<any> {
        const url: string = `${API}/surveys`;
        return this.api.get(url).pipe(
            map((response: any) => {
                return response;
            }),
            catchError(error => {
                return of(undefined);
            })
        );
    }

    public newSurvey(survey: any): Observable<any> {
        const url: string = `${API}/surveys`;
        return this.api.post(url, survey).pipe(
            map((response: any) => {
                return response;
            }),
            catchError(error => {
                return of(undefined);
            })
        );
    }

    public addQuestion(question: any): Observable<any> {
        const url: string = `${API}/surveys/add-question`;
        return this.api.post(url, question).pipe(
            map((response: any) => {
                return response;
            }),
            catchError(error => {
                return of(undefined);
            })
        );
    }

    public addOption(option: any): Observable<any> {
        const url: string = `${API}/option/add-option-question`;
        return this.api.post(url, option).pipe(
            map((response: any) => {
                return response;
            }),
            catchError(error => {
                return of(undefined);
            })
        );
    }

    public getSurvey(id: number): Observable<any> {
        const url: string = `${API}/surveys/${id}`;
        return this.api.get(url).pipe(
            map((response: any) => {
                return response;
            }),
            catchError(error => {
                return of(undefined);
            })
        );
    }

    public deleteSurvey(id: number): Observable<any> {
        const url: string = `${API}/surveys/${id}`;
        return this.api.delete(url).pipe(
            map((response: any) => {
                return response;
            }),
            catchError(error => {
                return of(undefined);
            })
        );
    }



    // private getInsurancesApi(): Observable<any> {
    //     const url: string = `${API_AC}/api/insurances/v5/insurance`;
    //     const params: any = { status: 'alta'};
    //     return this.api.get(url, params).pipe(
    //         map((response: any) => {
    //             return response;
    //         }),
    //         catchError( error => {
    //             return of(undefined);
    //         })
    //     );
    // }

    // private getExternalComunicationInsurance(): Observable<any> {
    //     const url: string = `${API_AC}/api/insurances/v5/insurance/comunication`;
    //     return this.api.get(url).pipe(
    //         map((response: any) => {
    //             return response;
    //         }),
    //         catchError(error => {
    //             return of(undefined)
    //         })
    //     );
    // }

    // public deleteExtComunication(id:number): Observable<any>{
    //     const url: string = `${API_AC}/api/insurances/v5/comunication/updateComunicationStatus`;
    //     const params: any = { idComunication: id, activate: false};
    //     return this.api.put(url,'','','',params).pipe(
    //         map((response: any) => {
    //             return response;
    //         })
    //     );  
    // }
    
    // public getClaims(): Observable<any> {
    //     if(this.storage.get('claims')) {
    //         return of(this.storage.get('claims'))
    //     }else{
    //         const url: string = `${API_AC}/api/claims/v5/claim`;
    //         return this.api.get(url).pipe(
    //             map((response: any) => {
    //                 this.storage.set('claims', response)
    //                 return response;
    //             }),
    //             catchError(error => {
    //                 return of(undefined);
    //             })
    //         );
    //     }
    // }

    // public getDocument(id: number){
    //     const url: string = `${API_AC}/api/files/v5/file/${id}`;
    //     return this.api.get(url).pipe(
    //         map((document: any) => {
    //             return document;
    //         })
    //     );
    // }
}