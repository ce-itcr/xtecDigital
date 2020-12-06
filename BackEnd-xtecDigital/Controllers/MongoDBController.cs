using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace BackEnd_xtecDigital.Controllers
{
    [EnableCors(origins: "http://localhost:4200/", headers: "*", methods: "*")]
    public class MongoDBController : ApiController
    {
        Models.MongoConnection mongo = new Models.MongoConnection();

        [HttpPost]
        [Route("api/TeacherData")]
        public IHttpActionResult teacherData([FromBody] JObject users)
        {
            return Ok(mongo.getTeacherData(users));
        }

        [HttpPost]
        [Route("api/StudentData")]
        public IHttpActionResult studentData([FromBody] JObject users)
        {
            return Ok(mongo.getStudentData(users));
        }

        [HttpPost]
        [Route("api/InsertTeacher")]
        public IHttpActionResult insertTeacher([FromBody] JObject users)
        {
            mongo.insertTeacher(users);
            return Ok();
        }

        [HttpPost]
        [Route("api/InsertStudent")]
        public IHttpActionResult insertStudent([FromBody] JObject users)
        {
            mongo.insertStudent(users);
            return Ok();
        }

        [HttpPost]
        [Route("api/FindAllTeachers")]
        public IHttpActionResult findAllTeachers([FromBody] JObject users)
        {
            return Ok(mongo.findAllTeachers());
        }

        [HttpPost]
        [Route("api/FindAllStudents")]
        public IHttpActionResult findAllStudents([FromBody] JObject users)
        {
            return Ok(mongo.findAllStudents());
        }
    }
}
