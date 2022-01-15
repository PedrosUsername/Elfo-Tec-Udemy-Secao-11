import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ContactService } from '../contact.service';
import { DetailsComponent } from '../details/details.component';
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

  totalElementos = 0;
  pagina = 0;
  tamanho = 3;
  pageSizeOptions : number[] = [3]

  constructor(
    private service: ContactService,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this._montarFormulario();
    this._listarContatosPages(0, this.tamanho);
  }

  submit(){
    const formValues = this.form.value;
    const contato: Contact = new Contact(formValues.name, formValues.email);
    this.service.save(contato).subscribe( response => {
//    Interessante... Atualizando o atributo dessa forma, não ativa o Detector de Mudança  
//    o novo contato só aparece depois de um refresh na pagina.
//    this.contacts.push(response);

//    Mas dessa forma, ativa, e a pagina nao precisa ser atualizada
      this._listarContatosPages(0, this.tamanho);
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
            .subscribe(response => this._listarContatosPages(this.pagina, this.tamanho));
    }
  }

  favoriting(contact: Contact){
    this.service.favorite(contact).subscribe(response => {
      contact.favorite = !contact.favorite;
    })
  }

  visualize(contact: Contact){
    this.dialog.open( DetailsComponent, {
      width: '400px',
      height: '450px',
      data: contact
    })
  }

  paginar(event: PageEvent){
    this.pagina = event.pageIndex;
    this._listarContatosPages(this.pagina, this.tamanho);
  }

  _listarContatos(){
    this.service.list().subscribe(response => {
      this.contacts = response;
    })
  }
  _listarContatosPages( pagina: number, tamanho: number ){
    this.service.listPages(pagina, tamanho).subscribe(response => {
      this.contacts = response.content;
      this.totalElementos = response.totalElements;
      this.pagina = response.number;

      console.log(this.totalElementos);
      console.log(this.pagina);
      console.log(this.tamanho);
      console.log(this.pageSizeOptions);
    })
  }

  _montarFormulario(){
    this.form = this.fb.group({
      name: ['', Validators.required ],
      email: ['', [Validators.required, Validators.email] ]
    })  
  }

}
