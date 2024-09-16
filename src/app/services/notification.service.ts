import { Injectable } from '@angular/core';
import { NotificationAppService } from '../components/utils/notification/notification.service';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    constructor(
        private notification: NotificationAppService
    ) {}
    
    private addNotification(type: string, message:string, duration:number=0) {
        this.notification.show(type,message,duration);
    }

    public success(message: string, duration?: number) {
        this.addNotification('success', message, duration);
    }

    public error(message: string, duration?: number) {
        this.addNotification('error', message, duration);
    }

    public warning(message: string, duration?: number) {
        this.addNotification('warning', message, duration);
    }
    
    public info(message: string, duration?: number) {
        this.addNotification('info', message, duration);
    }
}
