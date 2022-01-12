import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../contact.service';
import { Contact } from './contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  colunas = ['id', 'nome', 'email', 'favorito'];
  form!: FormGroup;
  contacts: Contact[] = [];

  constructor(
    private service: ContactService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this._montarFormulario();
    this._listarContatos()
  }

  submit(){
    const formValues = this.form.value;
    const contato: Contact = new Contact(formValues.name, formValues.email);
    this.service.save(contato).subscribe( response => {
      this.contacts.push(response);
      console.log(this.contacts);
    } );
  }

  favorite(contato: Contact){

  }

  _listarContatos(){
    this.service.list().subscribe(response => {
      this.contacts = response;
    })
  }

  _montarFormulario(){
    this.form = this.fb.group({
      name: ['', Validators.required ],
      email: ['', [Validators.required, Validators.email] ]
    })  
  }

}
