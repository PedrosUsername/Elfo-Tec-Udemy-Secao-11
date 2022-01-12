import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from './contact/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  url = "http://127.0.0.1:8080/api/contatos";

  constructor(
    private http: HttpClient
  ) { }

  save(contato: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.url, contato);
  }

  list(): Observable<Contact[]> {

    return this.http.get<any>(this.url);
  }

  favorite(contato: Contact): Observable<any> {
    return this.http.patch( `${this.url}/${contato.id}/favorito`, null );
  }

  upload(contato: Contact, formData: FormData): Observable<any> {
    return this.http.put(`${this.url}/${contato.id}/foto`, formData, { responseType : 'blob'} );
  }
}
