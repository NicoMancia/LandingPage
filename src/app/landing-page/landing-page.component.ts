import { Component } from '@angular/core';
import { FormComponent } from "../form/form.component";
import { InterfaceLead } from '../Interfaces/figlio';
import { CallToActionComponent } from '../call-to-action/call-to-action.component';
import { LogoComponent } from '../logo/logo.component';



@Component({
    selector: 'app-landing-page',
    standalone: true,
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.scss',
    imports: [FormComponent, CallToActionComponent,LogoComponent]
})
export class LandingPageComponent {
    pippo: InterfaceLead = {
        id: 2,
        nome: 'Mario',
        cognome: 'Rossi',
        email: 'mariorossi@gmail.com'
    }

    risposta()
    {
    }
}
