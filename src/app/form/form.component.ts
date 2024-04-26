import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormServiceService } from '../form-service.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InterfaceFiglio, InterfaceItemForm } from '../Interfaces/figlio';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, FloatLabelModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  providers: [FormServiceService]
})

export class FormComponent implements OnInit{
  @Input() //decorator per far inserire i dati enl figlio dal padre
    figlio!: InterfaceFiglio; //creo una variabile di tipo InterfaceFiglio per inserirci i dati

  @Output() //decoratr per far comunicare dal figlio la padre ogni qual volta che vi è un cambiamento
  eventOutput: EventEmitter<any> = new EventEmitter<any>(); //creo un nuovo evento di tipo EventEmitter

  items: InterfaceItemForm[] = [{
    placeholder: 'Full name',
    name: 'nome',
    label: 'Full name'
  }, {
    placeholder: 'Email address',
    name: 'email',
    label: 'Email address'
  },{
    placeholder: 'Phone number',
    name: 'phone',
    label: 'Phone number'
  }];

  checkoutForm: FormGroup = this.formBuilder.group({
    nome: '',
    email: '',
    phone: ''
  }); 

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormServiceService
  ){
    console.log('Costruttore!!');
  }
  
  sendForm(): void{
    console.log(this.checkoutForm.value);
    //this.formService.sendForm(this.checkoutForm.value).subscribe();
  }

  ngOnInit(): void {
    console.log('ciao padre');
    this.eventOutput.emit('Ciao padre!') // eventOutput.emit -- il metodo emit crea la comunicazione per inviare un mesasagio al padre 
    console.log(this.figlio);
  }
}
