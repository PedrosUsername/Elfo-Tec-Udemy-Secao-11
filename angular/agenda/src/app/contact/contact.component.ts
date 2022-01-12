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
  colunas = ['foto', 'id', 'nome', 'email', 'favorito'];
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
//    Interessante... Atualizando o atributo dessa forma, não ativa o Detector de Mudança  
//    o novo contato só aparece depois de um refresh na pagina.
//    this.contacts.push(response);

//    Mas dessa forma, ativa, e a pagina nao precisa ser atualizada
      let l = [ ... this.contacts, response ];
      this.contacts = l;
    } );
  }

  uploadFoto(event: any, contato: any){
    const files = event.target.files;
    if(files){
      const foto = files[0];
      const formData: FormData = new FormData();
      formData.append("foto", foto);
      this.service
            .upload(contato, formData)
            .subscribe(response => this._listarContatos());
    }
  }

  favoriting(contact: Contact){
    this.service.favorite(contact).subscribe(response => {
      contact.favorite = !contact.favorite;
    })
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
