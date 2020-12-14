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

   deleteCourse(id, available){
    return this.http.post<JSON>("api/admin/courses/update/availability", {"id":id, "available":available});
   }


   getAdminCourses(key){
    return this.http.get<any[]>("api/admin/courses").subscribe(res => {
      var data = []
      var cont = 0;
      while(cont < res.length){
        data.push(res[cont]);
        cont++;
      }
      localStorage.setItem("adminCourses",JSON.stringify(data));
      if(key){
        globalThis.flag = 1;
        this.router.navigateByUrl("/admin_profile");
      }
    }, error => {
      alert("ERROR");
    });;
  }

  getSemesterCourses(){
    return this.http.get<any[]>("api/admin/courses");
  }


  getAdminSemesters(key){
    return this.http.get<any[]>("api/admin/semester").subscribe(res => {
      var data = []
      var cont = 0;
      while(cont < res.length){
        data.push(res[cont]);
        cont++;
      }
      localStorage.setItem("adminSemesters",JSON.stringify(data));
      if(key){
        globalThis.flag = 2;
        this.router.navigateByUrl("/admin_profile");
      }
    }, error => {
      alert("ERROR");
    });;
  }

  getSemesterStudents(){
    return this.http.get<any[]>("api/admin/student");
  }

  sendNewSemester(year, period, courses){
    return this.http.post<JSON>("api/admin/semester/add",
    {
      "year":year,
      "period":period,
      "courses":courses
    } 
    );
  }

  getStudentCourses(){
    return this.http.post<any[]>("api/student/semester", {"id":"2018367254"});
  }

  getNews(newsId){
    return this.http.post<any[]>("api/student/group/news",
    {
      "id":newsId
    }
    );
  }

}
