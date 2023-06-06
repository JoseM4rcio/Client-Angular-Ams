import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../client';
import { ClientService } from '../client.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  formGroupClient: FormGroup;
  submitted: boolean = false;
  isEditing: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router

  ) {
    this.formGroupClient = formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.getClientById(id);
  }

  getClientById(id: number) {
    this.clientService.getClient(id).subscribe({
      next: data => {
        this.formGroupClient.setValue(data);
        this.isEditing = true;
      }
    })
  }


  save() {
    this.submitted = true;
    if (this.formGroupClient.valid) {
      if (this.isEditing) {
        this.clientService.update(this.formGroupClient.value).subscribe({
          next: () => {
            this.router.navigate(['clients']);
          }
        })
      }
      else {
        this.clientService.save(this.formGroupClient.value).subscribe({
          next: () => {
            this.router.navigate(['clients']);
          }
        })
      }
    }
  }

  cancel() {
    this.router.navigate(['clients']);
  }


  get name(): any {
    return this.formGroupClient.get("name");
  }

  get email(): any {
    return this.formGroupClient.get("email");
  }


}
