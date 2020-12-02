import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(private http: HttpClient) { }

   // LOGIN - INICIO DE SESIÓN | VERIFICACIÓN DE USUARIO
   public verifyUser(username: string, password: string){
    return this.http.post<JSON>("https://jsonplaceholder.typicode.com/posts", {"username": username, "password": password});
   }

}
