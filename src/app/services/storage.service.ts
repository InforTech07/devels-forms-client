import { Injectable } from '@angular/core';
import { get } from 'lodash';

@Injectable()
export class StorageService {
    private AC_INTM:string = 'devel-forms';

    constructor() {
        this.initStorage();
    }

    private initStorage(): void {
        const initStorage = localStorage.getItem(this.AC_INTM);
        if (!initStorage) {
            localStorage.setItem(this.AC_INTM, JSON.stringify({}));
        }
    }

    private getMasterObject(): any {
        let dataStorage = window.localStorage.getItem(this.AC_INTM);
        if(!dataStorage)
            window.localStorage.setItem(this.AC_INTM, JSON.stringify({}));
        if(dataStorage)
            return JSON.parse(dataStorage);
    }

    /**
     * Funcion que se encarga de setear un valor en el localstorage
     * @param key
     * @param value
     */
    public set(key: string, value: any): void {
        try {
            const master = this.getMasterObject();
            master[key] = value;
            localStorage.setItem(this.AC_INTM, JSON.stringify(master));
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * Funcion que se encarga de obtener un valor en el localstorage
     * @param key
     * @returns any
     */
    public get(key: string): any {
        try{
            return get(this.getMasterObject(), key);
        }catch (e) {
            console.error(e);
            return null;
        }
    }

    /**
     * Funcion que se encarga de borrar un valor en el localstorage
     * @param key
     */
    public remove(key: string): void {
        try{
            const master = this.getMasterObject();
            delete master[key];
            localStorage.setItem(this.AC_INTM, JSON.stringify(master));
        }catch (e) {
            console.error(e);
        }
    }

    /**
     * Funcion que se encarga de borrar todos los valores en el localstorage
     */
    public clear(): void {
        try{
            localStorage.clear()
            localStorage.setItem(this.AC_INTM, JSON.stringify({}));
        }catch (e) {
            console.error(e);
        }
    }
}
