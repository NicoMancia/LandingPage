import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Toast } from 'bootstrap';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent implements OnInit {
  @ViewChild('liveToastSuccess', { static: true })
  toastSuccess!: ElementRef;
  @ViewChild('liveToastDanger', { static: true })
  toastDanger!: ElementRef;

  toastS: any;
  toastD: any;
  private _idToast = '';
  //decorator per far inserire i dati enl figlio dal padre

  @Input() set idToast(value: string) {
    this._idToast = value;
    this.toastCall(this._idToast)
    
  }

  get idToast(): string {
    return this._idToast;
  }

  toastCall(name: string) {
    if(name!=''){
      switch (name) {
        case 'liveToastSuccess':
          this.toastS.show();
          break;
        case 'liveToastDanger':
          this.toastD.show();
          break;
        default:
          break;
      }
    }
  }


  ngOnInit(): void {
    this.toastS = new Toast(this.toastSuccess?.nativeElement, {});
    this.toastD = new Toast(this.toastDanger?.nativeElement, {});
  }
}
