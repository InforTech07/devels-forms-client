import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { StorageService } from "./storage.service";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";


const API = environment.API_APP
@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private storage: StorageService,
        private api: ApiService,
    ) { }

    newUser(data: {email: string, password: string}): Observable<any> {
        const url: string = `${API}/users`;
        return this.api.post(url, data).pipe(
            map((resp: any) => {
                return resp
            })
        )
    };

}
