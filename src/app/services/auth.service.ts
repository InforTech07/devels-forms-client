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
export class AuthService {

    constructor(
        private storage: StorageService,
        private api: ApiService,
    ) { }

    storeAuth(authData: any) {
        console.log(authData);
        this.storage.set('session', authData);
        console.log(this.storage.get('session'));

    }

    getUserInfo() {
        return this.storage.get('session');
    }

    logout() {
        this.storage.clear();
    }

    login(data: {email: string, password: string}): Observable<any> {
        const url: string = `${API}/auth/login`;
        return this.api.post(url, data).pipe(
            map((resp: any) => {
                this.storeAuth(resp);
                    return resp
                }
            )
        )
    };

}
