import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit {
  @ViewChild('exampleModal', { static: true })
  modal!: ElementRef;

  modalS!: Modal;
  private _idModal = '';
  //decorator per far inserire i dati enl figlio dal padre

  @Input() set idModal(value: string) {
    this._idModal = value;
    this.showModal();
  }

  showModal(): void {
    if (this.modalS) {
      this.modalS.show();
    }
  }

  get idModal(): string {
    return this._idModal;
  }

  ngOnInit(): void {
    this.modalS = new Modal(this.modal.nativeElement);
  }
}
