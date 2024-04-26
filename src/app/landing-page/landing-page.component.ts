import { Component } from '@angular/core';
import { FormComponent } from "../form/form.component";
import { InterfaceFiglio } from '../Interfaces/figlio';



@Component({
    selector: 'app-landing-page',
    standalone: true,
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.scss',
    imports: [FormComponent]
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
