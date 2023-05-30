import { ClientService } from './../client.service';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Client } from '../client';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnChanges {
  @Input()
  client: Client = {} as Client;

  @Output()
  saveEvent = new EventEmitter<Client>();

  @Output()
  cleanEvent = new EventEmitter<void>();

  formGroupClient: FormGroup;

  constructor(
    private clientService: ClientService,
    private formBuilder: FormBuilder
  ) {
    this.formGroupClient = formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.formGroupClient.setValue(this.client);
  }

  save() {
    if(this.formGroupClient.valid){
      this.saveEvent.emit(this.formGroupClient.value);
      this.formGroupClient.reset();
    }
  }

  clean(){
    this.cleanEvent.emit();
    this.formGroupClient.reset();
  }
}
