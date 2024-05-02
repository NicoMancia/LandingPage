import { Component } from '@angular/core';
import { FormComponent } from "../form/form.component";
import { InterfaceFiglio } from '../Interfaces/figlio';
import { CallToActionComponent } from '../call-to-action/call-to-action.component';



@Component({
    selector: 'app-landing-page',
    standalone: true,
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.scss',
    imports: [FormComponent, CallToActionComponent]
})
export class LandingPageComponent {
    figlio: InterfaceFiglio = {
        nome: 'Mario',
        cognome: 'Rossi',
        email: 'mariorossi@gmail.com'
    }

    risposta()
    {
        console.log('ciao figlio');
    }
}
