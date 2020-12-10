import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class CommunicationService {

  constructor(private http: HttpClient, private router: Router) { }

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

   createCourse(id, name, credits, career){
    return this.http.post<JSON>("api/admin/courses/add", {"id":id, "name":name, "credits":credits, "career":career});
   }

   updateCourse(id, name, credits, career){
    return this.http.post<JSON>("api/admin/courses/update", {"id":id, "name":name, "credits":credits, "career":career});
   }

   deleteCourse(id){
    return this.http.post<JSON>("api/admin/courses/delete", {"id":id});
   }

   getAdminCourses(){
    return this.http.get<any[]>("api/admin/courses");
  }
}
