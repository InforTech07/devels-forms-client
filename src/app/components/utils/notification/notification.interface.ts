/**\
 * @title Notification
 * @description A notification component to display messages to the user
 */
export interface INotification {
    id: number;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    duration?: number;
}
