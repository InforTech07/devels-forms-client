import { Injectable, signal, computed } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    #loading = signal<boolean>(false);

    public loading = computed(() => this.#loading());

    constructor() {}

    private setLoading(loading: boolean) {
        this.#loading.set(loading);
    }
    
    show() {
        this.setLoading(true);
    }

    hide() {
        this.setLoading(false);
    }
}
