using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.SqlClient;
using System.Web.Http.Cors;
using System.Diagnostics;
using Newtonsoft.Json.Linq;
using System.Data;
using Newtonsoft.Json;
using BackEnd_xtecDigital.Models;

namespace BackEnd_xtecDigital.Controllers
{
    [EnableCors(origins: "http://localhost:4200/", headers: "*", methods: "*")]
    public class TeacherController : ApiController
    {
        static string stringconnection = @"Data Source=(localdb)\xTecDigital; Initial Catalog=xTecDigital; Integrated Security=True";
        SqlConnection conn = new SqlConnection(stringconnection);


        [HttpPost]
        [Route("api/teacher/semester")]
        public JArray obtainTeacherSemester([FromBody] JObject teacherInfo)
        {
            conn.Open();
            SqlCommand getRequest = conn.CreateCommand();
            getRequest.CommandText = "EXEC sp_GetTeacherSemester @Teacher";
            getRequest.Parameters.Add("@Teacher", SqlDbType.Int).Value = teacherInfo["id"];
            getRequest.ExecuteNonQuery();
            SqlDataReader data = getRequest.ExecuteReader();
            JArray obj = new JArray();
            List<string[][]> courses = new List<string[][]>();
            List<string[]> semester = new List<string[]>();
            List<string> exists = new List<string>();

            while (data.Read())
            {
                string current = data.GetValue(0).ToString() + data.GetValue(1).ToString();
                if (exists.Contains(current))
                {
                    int i = 0;
                    foreach (var item in semester)
                    {
                        if (data.GetValue(0).ToString() == item[0] && data.GetValue(1).ToString() == item[1])
                        {
                            List<string[]> list = new List<string[]>();
                            string[] course = { data.GetValue(2).ToString() + " GRUPO " + data.GetValue(4).ToString(), data.GetValue(3).ToString() };
                            list.Add(course);
                            foreach (var temp in courses[i])
                            {
                                list.Add(temp);
                            }
                            courses[i] = list.ToArray();
                        }
                        i++;
                    }
                }
                else
                {
                    string[] tempCourse = { data.GetValue(2).ToString() + " GRUPO " + data.GetValue(4).ToString(), data.GetValue(3).ToString() };
                    string[][] temp = { tempCourse };
                    string[] tempSemester = { data.GetValue(0).ToString(), data.GetValue(1).ToString() };
                    semester.Add(tempSemester);
                    courses.Add(temp);
                    exists.Add(current);
                }
            }
            int j = 0;
            foreach (var item in semester)
            {

                SemesterCourse course = new SemesterCourse("SEMESTRE " + item[1] + " " + item[0], courses[j]);
                obj.Add(JsonConvert.SerializeObject(course));
                j++;
            }
            data.Close();
            conn.Close();
            return obj;

        }

        [HttpPost]
        [Route("api/teacher/group/news/add")]
        public IHttpActionResult addNews([FromBody] JObject newsInfo)
        {

            try
            {
                conn.Open();
                SqlCommand insertRequest = conn.CreateCommand();
                insertRequest.CommandText = "EXEC sp_AddNews @PublicationTime, @PublicationDate, @Author, @NMessage, @Title, @GID, @NID";
                insertRequest.Parameters.Add("@PublicationTime", SqlDbType.Time).Value = newsInfo["hour"];
                insertRequest.Parameters.Add("@PublicationDate", SqlDbType.Date).Value = newsInfo["date"];
                insertRequest.Parameters.Add("@Author", SqlDbType.VarChar, 50).Value = newsInfo["author"];
                insertRequest.Parameters.Add("@NMessage", SqlDbType.VarChar, 300).Value = newsInfo["body"];
                insertRequest.Parameters.Add("@Title", SqlDbType.VarChar, 30).Value = newsInfo["title"];
                insertRequest.Parameters.Add("@GID", SqlDbType.VarChar, 50).Value = newsInfo["id"];
                insertRequest.Parameters.Add("@NID", SqlDbType.VarChar, 100).Value = newsInfo["author"] + "-" + newsInfo["date"] + "-" + newsInfo["hour"];
                Debug.Print(newsInfo["author"] + "-" + newsInfo["date"] + "-" + newsInfo["hour"]);
                insertRequest.ExecuteNonQuery();
                conn.Close();
                return Ok("Noticia agregada");
            }
            catch
            {
                return BadRequest("Error al insertar");
            }
        }

        [HttpPost]
        [Route("api/teacher/group/news/update")]
        public IHttpActionResult updateNews([FromBody] JObject newsInfo)
        {

            try
            {
                conn.Open();
                SqlCommand updateRequest = conn.CreateCommand();
                updateRequest.CommandText = "EXEC sp_UpdateNews @NMessage, @Title, @NID";
                updateRequest.Parameters.Add("@NMessage", SqlDbType.VarChar, 300).Value = newsInfo["body"];
                updateRequest.Parameters.Add("@Title", SqlDbType.VarChar, 30).Value = newsInfo["title"];
                updateRequest.Parameters.Add("@NID", SqlDbType.VarChar, 100).Value = newsInfo["id"];
                updateRequest.ExecuteNonQuery();
                conn.Close();
                return Ok("Noticia acualizada");
            }
            catch
            {
                return BadRequest("Error al insertar");
            }
        }

        [HttpPost]
        [Route("api/teacher/group/news/delete")]
        public IHttpActionResult deleteNews([FromBody] JObject newsInfo)
        {

            try
            {
                conn.Open();
                SqlCommand updateRequest = conn.CreateCommand();
                updateRequest.CommandText = "EXEC sp_DeleteNews @NID";
                updateRequest.Parameters.Add("@NID", SqlDbType.VarChar, 100).Value = newsInfo["id"];
                updateRequest.ExecuteNonQuery();
                conn.Close();
                return Ok("Noticia delete");
            }
            catch
            {
                return BadRequest("Error al borrar");
            }
        }
    }
}
