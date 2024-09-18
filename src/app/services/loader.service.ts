import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    // Definir un signal para controlar el estado de carga
    public loading = signal(false);

    constructor() {}

    show() {
        // Cambiar el estado a true para mostrar el loader
        this.loading.set(true);
        console.log('Loader mostrado', this.loading());
    }

    hide() {
        // Cambiar el estado a false para ocultar el loader
        this.loading.set(false);
        console.log('Loader ocultado', this.loading());
    }
}
