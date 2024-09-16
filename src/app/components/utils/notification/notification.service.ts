import { Injectable, signal } from '@angular/core';
import { INotification } from './notification.interface';

@Injectable({
    providedIn: 'root',
})
export class NotificationAppService {
    public notifications = signal<INotification[]>([]);
    private nextId = 0;
    public showContainer = signal<boolean>(false);

    /**
     * Show a notification
     * @param type
     * @param message
     * @param duration
     */
    public show(type: string, message: string, duration: number = 0) {
        if (
            type === 'error' ||
            type === 'warning' ||
            type === 'success' ||
            type === 'info'
        ) {
            const id = this.nextId++;
            const notification: INotification = {
                id,
                type,
                message,
                duration,
            };
            this.notifications.update(() => [
                notification,
            ]);
            this.toogleContainer();

            if (duration > 0) {
                setTimeout(() => {
                    this.removeNotification(id);
                }, duration);
            }
        } else {
            throw new Error('Invalid type');
        }
    }

    public removeNotification(id: number) {
        this.notifications.update((notifications) =>
            notifications.filter((notification) => notification.id !== id)
        );
        this.toogleContainer();
    }

    private toogleContainer() {
        if (this.notifications().length > 0) {
            this.showContainer.set(true);
        } else {
            this.showContainer.set(false);
        }
    }
}
