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

   sendProfileDataToUpdate(userName, fullName, password, phone, address, nationality, birthDate, imgUrl){
    return this.http.post<JSON>("https://jsonplaceholder.typicode.com/posts", {"userName": userName, "fullName": fullName,
                                                                               "password": password, "phone": phone,
                                                                               "address": address, "nationality": nationality,
                                                                               "birthDate": birthDate, "imgUrl": imgUrl});
   }

   getAdminCourses(){
    return this.http.get<any[]>("api/admin/courses").subscribe(res => {
      globalThis.adminCourses = [];
      var cont = 0;
      while(cont < res.length){
        globalThis.adminCourses.push(res[cont]);
        cont++;
      }
    }, error => {
      alert("ERROR");
    });
  }

  reset(){
    globalThis.flag = 0;
    this.getAdminCourses();
  }
}
