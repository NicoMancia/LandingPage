import { Component, HostListener, OnInit } from '@angular/core';
import { LeadService } from '../Services/lead.service';
import { InterfaceLead } from '../Interfaces/figlio';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgFor } from '@angular/common';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-lead',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, FormsModule, ToastComponent],
  templateUrl: './lead.component.html',
  styleUrl: './lead.component.scss',
  providers: [LeadService],
})
export class LeadComponent implements OnInit {
  isHover: boolean = false;

  @HostListener('document: mouseover', ['$event'])
  onMouseOver(event: MouseEvent) {
    this.isHover = true;
  }

  @HostListener('mouseout', ['$event'])
  onMouseOut(event: MouseEvent) {
    this.isHover = false;
  }

  searchId!: string;

  attr_disable: boolean = true;

  idInputToast: string = '';

  idAlert!: string;
  contentAlert!: string;

  modificaAttiva: boolean[] = [];

  leadGroup: FormGroup = this.fb.group({
    leads: this.fb.array([]),
  });

  constructor(private fb: FormBuilder, private leadService: LeadService) {}

  get leads() {
    return this.leadGroup.controls['leads'] as FormArray;
  }

  toggleModifica(index: number, idLead: number, data: any) {
    this.modificaAttiva[index] = !this.modificaAttiva[index];

    if (this.modificaAttiva[index] == false) {
      this.update(idLead, data);
    }
  }

  update(idLead: number, data: any): void {
    this.leadService.update(idLead, data).subscribe({
      next: () => {
        this.idInputToast = 'liveToastSuccess';
        this.addLead();
        this.resetToast();
      },
      error: () => {
        this.idInputToast = 'liveToastDanger';
        this.resetToast();
      },
    });
  }

  remove(id: number): void {
    this.leadService.remove(id).subscribe({
      next: () => {
        this.addLead();
        this.idInputToast = 'liveToastSuccess';
        this.resetToast();
      },
      error: () => {
        this.idInputToast = 'liveToastDanger';
        this.resetToast();
      },
    });
  }

  findOne(id: string): void {
    if (Number(id)) {
      console.log('pippo');
      this.leadService.findOne(Number(id)).subscribe({
        next: (response: InterfaceLead) => {
          this.leads.clear();
          this.leads.push(
            this.fb.group({
              id: [response.id],
              nome: [response.nome],
              cognome: [response.cognome],
              email: [response.email],
              regione: [response.regione],
            })
          );
          this.idInputToast = 'liveToastSuccess';
          this.resetToast();
          this.modificaAttiva[0] = false;
        },
        error: () => {
          this.idInputToast = 'liveToastDanger';
          this.resetToast();
        },
      });
    } else {
      this.idInputToast = 'liveToastDanger';
      this.resetToast();
    }
  }

  addLead() {
    this.searchId = '';
    this.leads.clear();
    this.leadService.findAll().subscribe({
      next: (response: InterfaceLead[]) => {
        for (let i = 0; i < response.length; i++) {
          this.leads.push(
            this.fb.group({
              id: [response[i].id],
              nome: [response[i].nome],
              cognome: [response[i].cognome],
              email: [response[i].email],
              regione: [response[i].regione],
            })
          );
        }
        this.idInputToast = 'liveToastSuccess';
        this.resetToast();
      },
      error: () => {
        this.idInputToast = 'liveToastDanger';
        this.resetToast();
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
    this.addLead();
  }
}
