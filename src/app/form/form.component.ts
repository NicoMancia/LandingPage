import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InterfaceLead, InterfaceItemForm } from '../Interfaces/figlio';
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
    private leadService: LeadService
  ) {}

  @ViewChild('selectRegione') mySelect!: ElementRef; //creo un elemento "mySelect" che corrisponde all'elemento nel documento HTML con l'ID "selectRegione"

  @ViewChild('labelRegione') myLabel!: ElementRef;

  onCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement; //
    const isChecked = checkbox.checked; //creo una variabile e gli asegno true se è selezionata o false se non è selezionata
    // const select = document.getElementById('selectRegione');

    if (isChecked) {
      this.mySelect.nativeElement.style.display = 'block';
      this.myLabel.nativeElement.style.display = 'block';
    } else {
      this.checkoutForm.value.regione = '';
      this.mySelect.nativeElement.value = '';
      this.mySelect.nativeElement.style.display = 'none';
      this.myLabel.nativeElement.style.display = 'none';
    }
  }

  create(): void {
    this.leadService.create(this.checkoutForm.value).subscribe({
      next: () => {
        this.idInputToast = 'liveToastSuccess';
        this.resetToast();
        this.checkoutForm.reset();
      },
      error: () => {
        this.idInputToast = 'liveToastDanger';
        this.resetToast();
        this.checkoutForm.reset();
      },
    });
  }

  resetToast() {
    if (this.idInputToast != '') {
      setTimeout(() => {
        this.idInputToast = '';
      }, 0);
    }
  }

  ngOnInit(): void {
    console.log('ciao padre');
    this.eventOutput.emit('Ciao padre!'); // eventOutput.emit -- il metodo emit crea la comunicazione per inviare un messaggio al padre
    console.log(this.figlio);
  }
}
