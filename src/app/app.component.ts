import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { LoaderComponent } from './components/utils/loader/loader.component';
import { NotificationContainerComponent } from './components/utils/notification/notification.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LoaderComponent,
    RouterOutlet,
    NotificationContainerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'client';

  ngOnInit(): void {
    initFlowbite();
  }
}
