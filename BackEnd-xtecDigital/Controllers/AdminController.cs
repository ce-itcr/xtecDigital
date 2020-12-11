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

namespace BackEnd_xtecDigital.Controllers
{
    [EnableCors(origins: "http://localhost:4200/", headers: "*", methods: "*")]
    public class AdminController : ApiController
    {
        static string stringconnection = @"Data Source=(localdb)\xTecDigital; Initial Catalog=xTecDigital; Integrated Security=True";
        SqlConnection conn = new SqlConnection(stringconnection);

        [HttpGet]
        [Route("api/admin/courses")]
        public JArray obtainCourses()
        {
            conn.Open();
            SqlCommand getRequest = conn.CreateCommand();
            getRequest.CommandText = "EXEC sp_GetCourse";
            getRequest.ExecuteNonQuery();
            SqlDataReader data = getRequest.ExecuteReader();
            JArray obj = new JArray();
            while (data.Read())
            {
                JObject courseInfo = new JObject(
                new JProperty("id", data.GetValue(0).ToString()),
                new JProperty("name", data.GetValue(1).ToString()),
                new JProperty("credits", data.GetValue(2).ToString()),
                new JProperty("career", data.GetValue(3).ToString()),
                new JProperty("available", data.GetValue(4).ToString())
                );
                obj.Add(courseInfo);
            }
            data.Close();
            conn.Close();
            return obj;

        }

        [HttpPost]
        [Route("api/admin/courses/add")]
        public IHttpActionResult addCourse([FromBody] JObject courseInfo)
        {

            try
            {
                conn.Open();
                SqlCommand insertRequest = conn.CreateCommand();
                insertRequest.CommandText = "EXEC sp_AddCourse @CID, @CName, @Credits, @Career, @Available";
                insertRequest.Parameters.Add("@CID", SqlDbType.VarChar, 50).Value = courseInfo["id"];
                insertRequest.Parameters.Add("@CName", SqlDbType.VarChar, 50).Value = courseInfo["name"];
                insertRequest.Parameters.Add("@Credits", SqlDbType.Int).Value = (int)courseInfo["credits"];
                insertRequest.Parameters.Add("@Career", SqlDbType.VarChar, 50).Value = courseInfo["career"];
                insertRequest.Parameters.Add("@Available", SqlDbType.VarChar, 20).Value = courseInfo["available"];
                insertRequest.ExecuteNonQuery();
                conn.Close();
                return Ok("Curso agregado");
            }
            catch
            {
                return BadRequest("Error al insertar");
            }
        }

        [HttpPost]
        [Route("api/admin/courses/delete")]
        public IHttpActionResult deleteCourse([FromBody] JObject courseInfo)
        {
            try
            {
                conn.Open();
                SqlCommand deleteRequest = conn.CreateCommand();
                deleteRequest.CommandText = "EXEC sp_DeleteCourse @CID";
                deleteRequest.Parameters.Add("@CID", SqlDbType.VarChar, 50).Value = courseInfo["id"];
                deleteRequest.ExecuteNonQuery();
                conn.Close();
                return Ok("Curso eliminado");
            }
            catch
            {
                return BadRequest("Error al eliminar");
            }
        }

        [HttpPost]
        [Route("api/admin/courses/update")]
        public IHttpActionResult updateCourse([FromBody] JObject courseInfo)
        {
            try
            {
                conn.Open();
                SqlCommand updateRequest = conn.CreateCommand();
                updateRequest.CommandText = "EXEC sp_UpdateCourse @CID, @CName, @Credits, @Career";
                updateRequest.Parameters.Add("@CID", SqlDbType.VarChar, 50).Value = courseInfo["id"];
                updateRequest.Parameters.Add("@CName", SqlDbType.VarChar, 50).Value = courseInfo["name"];
                updateRequest.Parameters.Add("@Credits", SqlDbType.Int).Value = courseInfo["credits"];
                updateRequest.Parameters.Add("@Career", SqlDbType.VarChar, 50).Value = courseInfo["career"];
                updateRequest.ExecuteNonQuery();
                conn.Close();
                return Ok("Curso actualizado");
            }
            catch
            {
                return BadRequest("Error al eliminar");
            }
        }

        [HttpPost]
        [Route("api/admin/courses/update/availability")]
        public IHttpActionResult updateCourseAvailability([FromBody] JObject courseInfo)
        {
            try
            {
                conn.Open();
                SqlCommand updateRequest = conn.CreateCommand();
                updateRequest.CommandText = "EXEC sp_UpdateCourseAvailability @Available";
                updateRequest.Parameters.Add("@Available", SqlDbType.VarChar, 20).Value = courseInfo["available"];
                updateRequest.ExecuteNonQuery();
                conn.Close();
                return Ok("Curso actualizado");
            }
            catch
            {
                return BadRequest("Error al eliminar");
            }
        }

        [HttpGet]
        [Route("api/admin/semester")]
        public JArray obtainSemester()
        {
            conn.Open();
            SqlCommand getRequest = conn.CreateCommand();
            getRequest.CommandText = "EXEC sp_GetSemester";
            getRequest.ExecuteNonQuery();
            SqlDataReader data = getRequest.ExecuteReader();
            JArray obj = new JArray();
            List<string[]> arr = new List<string[]>();
            List<string> exists = new List<string>();
            int i = 0;
            while (data.Read())
            {
                string current = data.GetValue(0).ToString() + data.GetValue(1).ToString();
                if (exists.Contains(current))
                {
                    foreach (var item in arr)
                    {
                        if (data.GetValue(0).ToString() == item[0] && data.GetValue(1).ToString() == item[1])
                        {
                            item[2] += ", " + data.GetValue(2).ToString();
                        }
                    }
                }
                else
                {
                    string[] temp = { data.GetValue(0).ToString(), data.GetValue(1).ToString(), data.GetValue(2).ToString() };
                    arr.Add(temp);
                    exists.Add(current);
                    i++;
                }
            }
            foreach (var item in arr)
            {
          
                JObject courseInfo = new JObject(
                new JProperty("year", item[0]),
                new JProperty("period", item[1]),
                new JProperty("course", item[2])
                );
                obj.Add(courseInfo);
            }
            data.Close();
            conn.Close();
            return obj;

        }

        [HttpGet]
        [Route("api/admin/student")]
        public string[] obtainStudents()
        {
            conn.Open();
            SqlCommand getRequest = conn.CreateCommand();
            getRequest.CommandText = "EXEC sp_GetStudent";
            getRequest.ExecuteNonQuery();
            SqlDataReader data = getRequest.ExecuteReader();
            List<string> list = new List<string> { };
            while (data.Read())
            {
                list.Add(data.GetValue(0).ToString());
            }
            data.Close();
            conn.Close();
            return list.ToArray();
        }

        [HttpPost]
        [Route("api/admin/semester/add")]
        public IHttpActionResult addSemester([FromBody] JObject semesterInfo)
        {

            try
            {
                conn.Open();
                SqlCommand insertRequest = conn.CreateCommand();
                insertRequest.CommandText = "EXEC sp_AddSemester @Year, @Period";
                insertRequest.Parameters.Add("@Year", SqlDbType.Char, 4).Value = semesterInfo["year"];
                insertRequest.Parameters.Add("@Period", SqlDbType.Char, 1).Value = semesterInfo["period"];
                insertRequest.ExecuteNonQuery();
                conn.Close();
                string currentSemester = semesterInfo["year"] + "-" + semesterInfo["period"];
                foreach (var item in semesterInfo["courses"]) {
                    string GID = currentSemester + "-" + item[0].ToString() + "-" + item[2].ToString();
                    conn.Open();
                    insertRequest = conn.CreateCommand();
                    insertRequest.CommandText = "EXEC sp_AddGroup @GID, @Number, @CID, @SemID";
                    insertRequest.Parameters.Add("@GID", SqlDbType.VarChar, 50).Value = GID;
                    insertRequest.Parameters.Add("@Number", SqlDbType.Int).Value = (int)item[2];
                    insertRequest.Parameters.Add("@CID", SqlDbType.VarChar, 50).Value = item[0].ToString();
                    insertRequest.Parameters.Add("@SemID", SqlDbType.VarChar, 50).Value = currentSemester;
                    insertRequest.ExecuteNonQuery();
                    conn.Close();
                    Debug.Print(GID);

                    foreach (var element in item[3])
                    {
                        conn.Open();
                        insertRequest = conn.CreateCommand();
                        insertRequest.CommandText = "EXEC sp_AddStudentToGroup @GID, @Student";
                        insertRequest.Parameters.Add("@Student", SqlDbType.Int).Value = (int)element;
                        insertRequest.Parameters.Add("@GID", SqlDbType.VarChar, 50).Value = GID;
                        insertRequest.ExecuteNonQuery();
                        conn.Close();
                        Debug.Print("2");
                    }

                    foreach (var element in item[1])
                    {
                        conn.Open();
                        insertRequest = conn.CreateCommand();
                        insertRequest.CommandText = "EXEC sp_AddTeacherToGroup @GID, @Teacher";
                        insertRequest.Parameters.Add("@Teacher", SqlDbType.Int).Value = (int)element;
                        insertRequest.Parameters.Add("@GID", SqlDbType.VarChar, 50).Value = GID;
                        insertRequest.ExecuteNonQuery();
                        conn.Close();
                        Debug.Print("3");
                    }
                }

                return Ok("Semestre agregado");
            }
            catch
            {
                return BadRequest("Error al insertar");
            }
        }

    }
}
