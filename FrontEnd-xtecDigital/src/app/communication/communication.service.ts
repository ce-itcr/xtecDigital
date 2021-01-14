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
    return this.http.post<any[]>("api/student/semester", {"id":localStorage.getItem("current_username")});
  }

  getTeacherCourses(){
    return this.http.post<any[]>("api/teacher/semester", {"id":localStorage.getItem("current_username")});
  }

  getNews(newsId){
    return this.http.post<any[]>("api/student/group/news",
    {
      "id":newsId
    }
    );
  }

  createNews(author, title, body, date, hour, newsId){
    return this.http.post<any[]>("api/teacher/group/news/add",
    {
      "id":newsId,
      "author":author,
      "title":title,
      "body":body,
      "date":date,
      "hour":hour
    }
    );
  }

  deleteNews(newsId){
    alert(newsId);
    return this.http.post<any[]>("api/teacher/group/news/delete",
    {
      "id":newsId
    }
    );
  }

  updateNews(newsId, title, body){
    return this.http.post<any[]>("api/teacher/group/news/update",
    {
      "id":newsId,
      "title":title,
      "body":body
    }
    );
  }

  getDocuments(){
    return this.http.post<any[]>("api/student/group/folder",
    {
      "id":localStorage.getItem("newsId")
    }
    );
  }

  createDocument(title, author, date){
    return this.http.post<any[]>("api/teacher/group/folder/add",
    {
      "id":localStorage.getItem("newsId"),
      "title":title,
      "author":author,
      "date":date
    }
    );
  }

  getDocumentFiles(folder){
    var id = localStorage.getItem("newsId") + "-" + folder;
    return this.http.post<any[]>("api/teacher/group/folder/document",
    {
      "id":id
    }
    );
  }

  createDocumentFile(folder ,name, date, size, url){
    var id = localStorage.getItem("newsId") + "-" + folder;
    return this.http.post<any[]>("api/teacher/group/folder/document/add",
    {
      "id":id,
      "file":name,
      "date":date,
      "size":size,
      "url":url
    }
    );
  }

  deleteDocumentFile(folder, name){
    var id = localStorage.getItem("newsId") + "-" + folder;
    return this.http.post<any[]>("api/teacher/group/folder/document/delete",
    {
      "id":id,
      "file":name
    }
    );
  }

  updateDocumentFile(folder, name, url){
    var id = localStorage.getItem("newsId") + "-" + folder;
    return this.http.post<any[]>("api/teacher/group/folder/document/update",
    {
      "id":id,
      "file":name,
      "url":url
    }
    );
  }

  deleteFolder(folder){
    var id = localStorage.getItem("newsId") + "-" + folder;
    return this.http.post<any[]>("api/teacher/group/folder/delete",
    {
      "id":id
    }
    );
  }

  getRubros(){
    return this.http.post<any[]>("api/teacher/group/rubros",
    {
      "id":localStorage.getItem("newsId")
    }
    );
  }

  createRubro(rubro, percentage){
    return this.http.post<any[]>("api/teacher/group/rubros/add",
    {
      "id":localStorage.getItem("newsId"),
      "rubro":rubro,
      "percentage":percentage
    }
    );
  }

  deleteRubro(rubro){
    return this.http.post<any[]>("api/teacher/group/rubros/delete",
    {
      "id":localStorage.getItem("newsId"),
      "rubro":rubro
    }
    );
  }

  updateRubro(lRubro, rubro, percentage){
    return this.http.post<any[]>("api/teacher/group/rubros/update",
    {
      "lRubro":lRubro,
      "id":localStorage.getItem("newsId"),
      "rubro":rubro,
      "percentage":percentage
    }
    );
  }

  getAssignments(){
    return this.http.post<any[]>("api/teacher/group/assignments",
    {
      "id":localStorage.getItem("newsId"),
      "rubro":localStorage.getItem("currentRubroSection")
    }
    );
  }

  createAssignment(name, started, percentage, time, date, desc, link){
    var AID = localStorage.getItem("newsId") + "-" + name;
    return this.http.post<any[]>("api/teacher/group/assignments/add",
    {
      "AID":AID,
      "GID":localStorage.getItem("newsId"),
      "rubro":localStorage.getItem("currentRubroSection"),
      "started":started,
      "percentage":percentage,
      "name":name,
      "time":time,
      "date":date,
      "desc":desc,
      "link":link
    }
    );
  }

  deleteAssignment(name){
    var AID = localStorage.getItem("newsId") + "-" + name;
    return this.http.post<any[]>("api/teacher/group/assignments/delete",
    {
      "id":AID
    }
    );
  }

  studentLogIn(id, pass){
    return this.http.post<any[]>("api/StudentData",
    {
      "id":id,
      "pass":pass
    }
    );
  }

  teacherLogIn(id, pass){
    return this.http.post<any[]>("api/TeacherData",
    {
      "id":id,
      "pass":pass
    }
    );
  }

  uploadAssignment(url, rubro, assign){
    var assignmentID = localStorage.getItem("newsId") + "-" + assign;
    alert(localStorage.getItem("current_username"));
    alert(assignmentID);
    alert(url);
    return this.http.post<any[]>("api/student/rubros/assignments/upload",
    {
      "id":localStorage.getItem("current_username"),
      "assignment":assignmentID,
      "url":url
    }
    );
  }

  getStudentAssignments(assign){
    var assignmentID = localStorage.getItem("newsId") + "-" + assign;
    return this.http.post<any[]>("api/teacher/group/assignments/getStudents",
    {
      "assignment":assignmentID
    }
    );
  }

  uploadFeedback(studentId , assignment, url, grade){
    var assignmentID = localStorage.getItem("newsId") + "-" + assignment;
    return this.http.post<any[]>("api/teacher/group/assignemts/feedback",
    {
      "studentId":studentId,
      "assignment":assignmentID,
      "url":url,
      "grade":grade
    }
    );
  }

  getFeedback(assignment){
    var assignmentID = localStorage.getItem("newsId") + "-" + assignment;
    alert(assignmentID);
    alert(localStorage.getItem("current_username"));
    return this.http.post<any[]>("api/teacher/group/assignments/getFeedback",
    {
      "studentId":localStorage.getItem("current_username"),
      "assignment":assignmentID
    }
    );
  }

  getGroupStudents(){
    return this.http.post<any[]>("api/teacher/group/students/get",
    {
      "id":localStorage.getItem("newsId")
    }
    );
  }

  createWorkGroup(groupNum, assignment, students){
    var assignmentID = localStorage.getItem("newsId") + "-" + assignment;
    return this.http.post<any[]>("api/teacher/group/workgroups/add",
    {
      "AID":assignmentID,
      "GID":groupNum,
      "Students":students
    }
    );
  }

  createIndividualAssignemnt(assignment, students){
    var assignmentID = localStorage.getItem("newsId") + "-" + assignment;
    return this.http.post<any[]>("api/teacher/group/individual/add",
    {
      "AID":assignmentID,
      "Students":students
    }
    );
  }

}
