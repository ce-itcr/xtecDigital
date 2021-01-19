import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class CommunicationService {

  constructor(private http: HttpClient, private router: Router) { }

   //SEND DATA TO LOGIN - INICIO DE SESIÓN | VERIFICACIÓN DE USUARIO
   public verifyUser(username: string, password: string){
    return this.http.post<JSON>("https://jsonplaceholder.typicode.com/posts", {"username": username, "password": password});
   }

   //SEND DATA TO UPDATE USER DATA
   sendProfileDataToUpdate(userName, fullName, password, phone, address, nationality, birthDate, imgUrl){
    return this.http.post<JSON>("https://jsonplaceholder.typicode.com/posts", {"userName": userName, "fullName": fullName,
                                                                               "password": password, "phone": phone,
                                                                               "address": address, "nationality": nationality,
                                                                               "birthDate": birthDate, "imgUrl": imgUrl});
   }

   //SEND DATA TO CREATE COURSE
   createCourse(id, name, credits, career){
    return this.http.post<JSON>("api/admin/courses/add", {"id":id, "name":name, "credits":credits, "career":career});
   }

   //SEND DATA TO UPDATE COURSE
   updateCourse(id, name, credits, career){
    return this.http.post<JSON>("api/admin/courses/update", {"id":id, "name":name, "credits":credits, "career":career});
   }

   //SEND DATA TO DELETE COURSE
   deleteCourse(id, available){
    return this.http.post<JSON>("api/admin/courses/update/availability", {"id":id, "available":available});
   }

   //SEND DATA TO GET ADMIN COURSES
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

  //SEND DATA TO GET ABAILABILITY COURSE IN SEMESTERS
  getSemesterCourses(){
    return this.http.get<any[]>("api/admin/courses");
  }

  //SEND DATA TO GET ADMIN SEMESTERS
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
    });
  }

  //SEND DATA TO GET STUDENTS FOR SEMESTER
  getSemesterStudents(){
    return this.http.get<any[]>("api/admin/student");
  }

  //SEND DATA TO CREATE A NEW SEMESTER
  sendNewSemester(year, period, courses){
    return this.http.post<JSON>("api/admin/semester/add",
    {
      "year":year,
      "period":period,
      "courses":courses
    } 
    );
  }

  //SEND DATA TO GET COURSES FOR STUDENT
  getStudentCourses(){
    return this.http.post<any[]>("api/student/semester", {"id":localStorage.getItem("current_username")});
  }

  //SEND DATA TO GET COURSES FOR TEACHER
  getTeacherCourses(){
    return this.http.post<any[]>("api/teacher/semester", {"id":localStorage.getItem("current_username")});
  }

  //SEND DATA TO GET COURSE NEWS
  getNews(newsId){
    return this.http.post<any[]>("api/student/group/news",
    {
      "id":newsId
    }
    );
  }

  //SEND DATA TO CREATE NEWS
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

  //SEND DATA TO DELETE NEWS
  deleteNews(newsId){
    return this.http.post<any[]>("api/teacher/group/news/delete",
    {
      "id":newsId
    }
    );
  }

  //SEND DATA TO UPDATE NEWS
  updateNews(newsId, title, body){
    return this.http.post<any[]>("api/teacher/group/news/update",
    {
      "id":newsId,
      "title":title,
      "body":body
    }
    );
  }

  //SEND DATA TO GET COURSE DOCUMENTS
  getDocuments(){
    return this.http.post<any[]>("api/student/group/folder",
    {
      "id":localStorage.getItem("newsId")
    }
    );
  }

  //SEND DATA TO CREATE DOCUMENT
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

  //SEND DATA TO GET DOCUMENT FILES
  getDocumentFiles(folder){
    var id = localStorage.getItem("newsId") + "-" + folder;
    return this.http.post<any[]>("api/teacher/group/folder/document",
    {
      "id":id,
      "title":folder
    }
    );
  }

  //SEND DATA TO CREATE DOCUMENT FILE
  createDocumentFile(folder ,name, date, size, url){
    var id = localStorage.getItem("newsId") + "-" + folder;
    return this.http.post<any[]>("api/teacher/group/folder/document/add",
    {
      "id":id,
      "title":folder,
      "file":name,
      "date":date,
      "size":size,
      "url":url
    }
    );
  }

  //SEND DATA TO DELETE DOCUMENT FILE
  deleteDocumentFile(folder, name){
    var id = localStorage.getItem("newsId") + "-" + folder;
    return this.http.post<any[]>("api/teacher/group/folder/document/delete",
    {
      "id":id,
      "title":folder,
      "file":name
    }
    );
  }

  //SEND DATA TO UPDATE DOCUMENT FILE
  updateDocumentFile(folder, name, url){
    var id = localStorage.getItem("newsId") + "-" + folder;
    return this.http.post<any[]>("api/teacher/group/folder/document/update",
    {
      "id":id,
      "title":folder,
      "file":name,
      "url":url
    }
    );
  }

  //SEND DATA TO DELETE FOLDER
  deleteFolder(folder){
    var id = localStorage.getItem("newsId") + "-" + folder;
    return this.http.post<any[]>("api/teacher/group/folder/delete",
    {
      "id":id,
      "title":folder
    }
    );
  }

  //SEND DATA TO GET COURSE RUBROS
  getRubros(){
    return this.http.post<any[]>("api/teacher/group/rubros",
    {
      "id":localStorage.getItem("newsId")
    }
    );
  }

  //SEND DATA TO CREATE RUBRO
  createRubro(rubro, percentage){
    return this.http.post<any[]>("api/teacher/group/rubros/add",
    {
      "id":localStorage.getItem("newsId"),
      "rubro":rubro,
      "percentage":percentage
    }
    );
  }

  //SEND DATA TO DELETE RUBRO
  deleteRubro(rubro){
    return this.http.post<any[]>("api/teacher/group/rubros/delete",
    {
      "id":localStorage.getItem("newsId"),
      "rubro":rubro
    }
    );
  }

  //SEND DATA TO UPDATE RUBRO
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

  //SEND DATA TO GET COURSE ASSIGNMENTS
  getAssignments(){
    return this.http.post<any[]>("api/teacher/group/assignments",
    {
      "id":localStorage.getItem("newsId"),
      "rubro":localStorage.getItem("currentRubroSection")
    }
    );
  }

  //SEND DATA TO CREATE ASSIGNMENT
  createAssignment(name, started, percentage, time, date, desc, link){
    var AID = localStorage.getItem("newsId") + "-" + name;
    return this.http.post<any[]>("api/teacher/group/assignments/add",
    {
      "id":AID,
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

  //SEND DATA TO DELETE ASSIGNMENT
  deleteAssignment(name){
    var AID = localStorage.getItem("newsId") + "-" + name;
    return this.http.post<any[]>("api/teacher/group/assignments/delete",
    {
      "id":AID
    }
    );
  }

  //SEND DATA TO LOG IN A STUDENT
  studentLogIn(id, pass){
    return this.http.post<any[]>("api/StudentData",
    {
      "id":id,
      "pass":pass
    }
    );
  }

  //SEND DATA TO LOG IN A TEACHER
  teacherLogIn(id, pass){
    return this.http.post<any[]>("api/TeacherData",
    {
      "id":id,
      "pass":pass
    }
    );
  }

  //SEND DATA TO UPLOAD ASSIGNMENTS
  uploadAssignment(url, rubro, assign){
    var assignmentID = localStorage.getItem("newsId") + "-" + assign;
    return this.http.post<any[]>("api/student/rubros/assignments/upload",
    {
      "SID":localStorage.getItem("current_username"),
      "id":assignmentID,
      "title":assign,
      "url":url
    }
    );
  }

  //SEND DATA TO GET COURSE ASSIGNMENTS
  getStudentAssignments(assign){
    var assignmentID = localStorage.getItem("newsId") + "-" + assign;
    return this.http.post<any[]>("api/teacher/group/assignments/getStudents",
    {
      "id":assignmentID,
      "title":assign
    }
    );
  }

  //SEND DATA TO UPLOAD FEEDBACK TO STUDENTS
  uploadFeedback(group , assignment, url, grade){
    var assignmentID = localStorage.getItem("newsId") + "-" + assignment;
    return this.http.post<any[]>("api/teacher/group/assignemts/feedback",
    {
      "groupNum":group,
      "id":assignmentID,
      "title":assignment,
      "url":url,
      "grade":grade
    }
    );
  }

  //SEND DATA TO GET STUDENT FEEDBACK
  getFeedback(assignment){
    var assignmentID = localStorage.getItem("newsId") + "-" + assignment;
    return this.http.post<any[]>("api/teacher/group/assignments/getFeedback",
    {
      "studentId":localStorage.getItem("current_username"),
      "id":assignmentID,
      "title":assignment
    }
    );
  }

  //SEND DATA TO GET STUDENTS TO UPLOAD FEEDBACK
  getGroupStudents(){
    return this.http.post<any[]>("api/teacher/group/students/get",
    {
      "id":localStorage.getItem("newsId")
    }
    );
  }

  //SEND DATA TO CREATE A ASSIGNMENT WORKGROUP
  createWorkGroup(groupNum, assignment, students, rubro){
    var assignmentID = localStorage.getItem("newsId") + "-" + assignment;
    return this.http.post<any[]>("api/teacher/group/workgroups/add",
    {
      "id":assignmentID,
      "Students":students,
      "rubro":rubro,
      "GID":groupNum
    }
    );
  }

  //SEND DATA TO CREATE A INDIVIDUAL ASSIGNMENT
  createIndividualAssignemnt(assignment, students, rubro){
    var assignmentID = localStorage.getItem("newsId") + "-" + assignment;
    return this.http.post<any[]>("api/teacher/group/individual/add",
    {
      "id":assignmentID,
      "Students":students,
      "rubro":rubro
    }
    );
  }

  //SEND DATA TO CREATE SEMESTER BY EXCEL FILE
  createSemesterByExcel(url){
    return this.http.post<any[]>("api/admin/semester/uploadExcel",
    {
      "url":url
    }
    );
  }

  //SEND DATA TO GET STUDENT GRADE
  showGrades(assignment, PDate, PTime){
    var assignmentID = localStorage.getItem("newsId") + "-" + assignment;
    return this.http.post<any[]>("api/teacher/group/showGrades",
    {
      "id":assignmentID,
      "PDate":PDate,
      "PTime":PTime,
      "author":localStorage.getItem("current_username")
    }
    );
  }

  //SEND DATA TO GET STUDENT GRADE
  generateReport(){
    var assignmentID = localStorage.getItem("newsId");
    return this.http.post<any[]>("api/teacher/course/generate/report/students",
    {
      "id":assignmentID
    }
    );
  }

  studentGrades(){
    return this.http.post<any[]>("api/students/course/generate/report/grades",
    {
      "id":localStorage.getItem("newsId"),
      "student":localStorage.getItem("current_username")
    }
    );
  }

  teacherGrades(){
    return this.http.post<any[]>("api/teacher/course/generate/report/grades",
    {
      "id":localStorage.getItem("newsId")
    }
    );
  }

}
