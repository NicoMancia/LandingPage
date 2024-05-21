import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LeadComponent } from './lead/lead.component';


export const routes: Routes = [
    {//caso path "landing-page"
        path: 'landing-page', 
        component: LandingPageComponent //corrisponde alla classe in "landing-page.component.ts"
    },
    {//caso path "lead"
        path: 'lead', 
        component: LeadComponent //corrisponde alla classe in "lead.component.ts"
    },
    {//caso di path che non esiste
        path: '**', //'**' --> path errato / non corrispondente
        redirectTo: 'landing-page', //se il path è errato reindirizza alla pagina 'landing-page'
        pathMatch: 'full' //deve corrispondere tutto il path
    },
    {//caso di path vuoto
        path: '', //'' --> path vuoto
        redirectTo: 'landing-page', //se il path è errato reindirizza alla pagina 'landing-page'
        pathMatch: 'full' //deve corrispondere tutto il path
    }
];


