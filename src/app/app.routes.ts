import { Routes } from '@angular/router';
import { SimpleLayoutComponent } from './components/layouts/simple-layout/simple.layout.component';
import { FullLayoutComponent } from './components/layouts/full-layout/full.layout.component';

export const routes: Routes = [
    {
        path: '',
        component: SimpleLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./components/public/public.module').then(m => m.PublicModule)
            }
        ]
    },
    { 
        path: 'app', 
        component: FullLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./components/private/private.module').then(m => m.PrivateModule)
            }
        ]
    }
];
