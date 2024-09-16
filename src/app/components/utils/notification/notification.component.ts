import { Component, Input, signal, OnInit  } from '@angular/core';
import { CommonModule } from "@angular/common"
import { NotificationAppService } from './notification.service';

@Component({
    standalone: true,
    imports: [CommonModule],
    selector: 'app-container-notification',
    templateUrl: './notification.component.html'
})
export class NotificationContainerComponent {
    constructor(
        public notificationAppService: NotificationAppService
    ){}

    toggleIsVisible(id: number){
        this.notificationAppService.removeNotification(id)
    }
}
