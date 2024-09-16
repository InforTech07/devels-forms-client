import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-card',
    template: `
        <div class="w-56 h-64 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div class="flex flex-col items-center justify-center">
                <svg width="100px" height="100px" viewBox="0 0 48 48" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.096"></g><g id="SVGRepo_iconCarrier"><defs><style>.cls-1{fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;}</style></defs><path class="cls-1" d="M10.35,4.5a2,2,0,0,0-1.95,2v35.1a2,2,0,0,0,1.95,2h27.3a2,2,0,0,0,2-2V14.49h-8a2,2,0,0,1-1.95-2v-8Z"></path><line class="cls-1" x1="29.61" y1="4.5" x2="39.6" y2="14.49"></line><line class="cls-1" x1="15.84" y1="22.97" x2="32.16" y2="22.97"></line><line class="cls-1" x1="15.84" y1="35.07" x2="32.16" y2="35.07"></line><line class="cls-1" x1="15.84" y1="29.02" x2="32.16" y2="29.02"></line></g></svg>
                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white"></h5>
                <span class="text-sm mb-4 text-gray-500 dark:text-gray-400">{{survey.name}}</span>
                <div class="inline-flex rounded-md shadow-sm" role="group">
                    <button (click)="deleteSurveyById(survey.id)" type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </button>
                    <button (click)="editSurveyById(survey.id)" type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M8.56078 20.2501L20.5608 8.25011L15.7501 3.43945L3.75012 15.4395V20.2501H8.56078ZM15.7501 5.56077L18.4395 8.25011L16.5001 10.1895L13.8108 7.50013L15.7501 5.56077ZM12.7501 8.56079L15.4395 11.2501L7.93946 18.7501H5.25012L5.25012 16.0608L12.7501 8.56079Z" fill="#080341"></path> </g></svg>
                    </button>
                </div>
                <div class="inline-flex rounded-md shadow-sm" role="group">
                    <button type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                        <svg fill="#000000" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m23.589 22.261-2.102-2.101c.51-.769.814-1.713.814-2.728 0-2.389-1.683-4.385-3.929-4.866l-.033-.006v-4.043c0-.009 0-.018 0-.026 0-.246-.088-.471-.233-.646l.001.002v-.005c-.019-.023-.039-.045-.06-.066l-.008-.009c-.009-.009-.018-.018-.027-.027l-7.44-7.44c-.021-.021-.042-.04-.065-.059l-.026-.018c-.016-.013-.033-.026-.05-.038l-.025-.018c-.018-.012-.036-.022-.054-.034l-.023-.012q-.034-.02-.075-.037l-.032-.013-.051-.018-.036-.011-.058-.015-.028-.006c-.028-.006-.057-.01-.086-.013h-8.948c-.559.002-1.011.454-1.015 1.012v20.377c0 .561.454 1.017 1.015 1.019h16.306.004c1.013 0 1.955-.304 2.74-.827l-.018.011 2.102 2.102c.181.166.423.268.689.268.563 0 1.019-.456 1.019-1.019 0-.266-.102-.508-.269-.689l.001.001zm-3.325-4.827c0 1.625-1.318 2.943-2.943 2.943s-2.943-1.318-2.943-2.943 1.318-2.943 2.943-2.943c1.624.002 2.941 1.318 2.943 2.942zm-9.396-13.956 3.993 3.994h-3.993zm-8.83-1.44h6.793v6.453c0 .563.456 1.019 1.019 1.019h6.453v3.05c-2.278.487-3.962 2.483-3.962 4.873 0 1.109.362 2.133.975 2.96l-.01-.013h-11.269z"></path></g></svg>
                    </button>
                    <button type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                        <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M19 21H5V5h2v2h10V5h2v2.172l1-1V4h-3V3h-3a2 2 0 0 0-4 0H7v1H4v18h16V11.828l-1 1zM8 4h3V2.615A.615.615 0 0 1 11.614 2h.771a.615.615 0 0 1 .615.615V4h3v2H8zm14.646 1.646l.707.707-8.853 8.854-3.854-3.854.707-.707 3.147 3.147z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>
                    </button>
                </div>

            </div>
    </div>
`
})
export class CardComponent{
    @Input() survey: any;
    @Output() deleteSurvey = new EventEmitter<number>();

    constructor(private router: Router) {}

    deleteSurveyById(id: number) {
        this.deleteSurvey.emit(id);
    }

    editSurveyById(id: number) {
        this.router.navigate([`app/survey/${id}`]);
    }
}



