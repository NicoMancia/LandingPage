import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import {
  InterfaceLead,
  InterfaceItemForm,
  InterfaceSelect,
} from '../Interfaces/figlio';
import { LeadService } from '../Services/lead.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, FloatLabelModule, ToastComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  providers: [LeadService],
})
export class FormComponent implements OnInit {
  @Input() //decorator per far inserire i dati enl figlio dal padre
  figlio!: InterfaceLead; //creo una variabile di tipo InterfaceFiglio per inserirci i dati

  @Output() //decoratr per far comunicare dal figlio al padre ogni qual volta che vi è un cambiamento
  eventOutput: EventEmitter<any> = new EventEmitter<any>(); //creo un nuovo evento di tipo EventEmitter

  idInputToast: string = '';

  options: InterfaceSelect[] = [
    {
      value: 'Abruzzo',
    },
    {
      value: 'Basilicata',
    },
    {
      value: 'Calabria',
    },
    {
      value: 'Campania',
    },
    {
      value: 'Emilia-Romagna',
    },
    {
      value: 'Friuli-Venezia Giulia',
    },
    {
      value: 'Lazio',
    },
    {
      value: 'Liguria',
    },
    {
      value: 'Lombardia',
    },
    {
      value: 'Marche',
    },
    {
      value: 'Molise',
    },
    {
      value: 'Piemonte',
    },
    {
      value: 'Puglia',
    },
    {
      value: 'Sardegna',
    },
    {
      value: 'Sicilia',
    },
    {
      value: 'Toscana',
    },
    {
      value: 'Trentino-Alto Adige',
    },
    {
      value: 'Umbria',
    },
    {
      value: "Valle d'Aosta",
    },
    {
      value: 'Veneto',
    },
  ];

  items: InterfaceItemForm[] = [
    {
      placeholder: 'Nome',
      name: 'nome',
      label: 'Nome',
    },
    {
      placeholder: 'cognome',
      name: 'cognome',
      label: 'Cognome',
    },
    {
      placeholder: 'indirizzoemail@esempio.com',
      name: 'email',
      label: 'email@esempio.com',
    },
  ];

  checkoutForm: FormGroup = this.formBuilder.group({
    nome: '',
    cognome: '',
    email: '',
    regione: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private leadService: LeadService,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {}

  @ViewChild('selectRegione') mySelectRegion!: ElementRef; //creo un elemento "mySelect" che corrisponde all'elemento nel documento HTML con l'ID "selectRegione"

  @ViewChild('labelRegione') myLabelRegion!: ElementRef;

  @ViewChild('checkTerms') mySelectTerms!: ElementRef;

  @ViewChild('labelCampoObb') myLabelObb!: ElementRef;

  onCheckboxChangeRegion(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const isChecked = checkbox.checked; //creo una variabile e gli asegno true se è selezionata o false se non è selezionata

    if (isChecked) {
      this.mySelectRegion.nativeElement.style.display = 'block';
      this.myLabelRegion.nativeElement.style.display = 'block';
    } else {
      this.checkoutForm.value.regione = '';
      this.mySelectRegion.nativeElement.value = '';
      this.mySelectRegion.nativeElement.style.display = 'none';
      this.myLabelRegion.nativeElement.style.display = 'none';
    }
  }

  onCheckboxChangeTerms(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const isChecked = checkbox.checked; //creo una variabile e gli asegno true se è selezionata o false se non è selezionata

    if (isChecked) {
      this.renderer.removeClass(this.mySelectTerms.nativeElement, 'red-border');
      this.myLabelObb.nativeElement.style.display = 'none';
    }
  }

  create(): void {
    if (this.mySelectTerms.nativeElement.checked) {
      this.leadService.create(this.checkoutForm.value).subscribe({
        next: () => {
          this.idInputToast = 'liveToastSuccess';
          this.resetToast();
          this.checkoutForm.reset();
          this.mySelectRegion.nativeElement.checked = false;
        },
        error: () => {
          console.log(this.mySelectTerms.nativeElement.checked);
          this.mySelectTerms.nativeElement.checked = false;
          console.log(this.mySelectTerms.nativeElement.checked);
          this.idInputToast = 'liveToastDanger';
          this.resetToast();
          this.checkoutForm.reset();
        },
      });
    } else {
      this.renderer.addClass(this.mySelectTerms.nativeElement, 'red-border');
      this.myLabelObb.nativeElement.style.display = 'block';
    }
  }

  resetToast() {
    if (this.idInputToast != '') {
      setTimeout(() => {
        this.idInputToast = '';
      }, 0);
    }
  }

  ngOnInit(): void {}
}
