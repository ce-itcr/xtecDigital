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

namespace BackEnd_xtecDigital.Controllers
{
    [EnableCors(origins: "http://localhost:4200/", headers: "*", methods: "*")]
    public class ValuesController : ApiController
    {
        static string stringconnection = @"Data Source=(localdb)\xTecDigital; Initial Catalog=xTecDigital; Integrated Security=True";
        SqlConnection conn = new SqlConnection(stringconnection);

        [HttpGet]
        [Route("api/admin/courses")]
        public JArray obtainCourses()
        {
            conn.Open();
            string query = "SELECT CID, CName, Credits, Career FROM COURSE;";
            SqlCommand command = new SqlCommand(query, conn);
            SqlDataReader data = command.ExecuteReader();
            JArray obj = new JArray();
            while (data.Read())
            {
                JObject courseInfo = new JObject(
                new JProperty("id", data.GetValue(0).ToString()),
                new JProperty("name", data.GetValue(1).ToString()),
                new JProperty("credits", data.GetValue(2).ToString()),
                new JProperty("career", data.GetValue(3).ToString())
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
            conn.Open();
            try
            {
                string query = "INSERT INTO COURSE VALUES ('" + courseInfo["CID"] + "', '" + courseInfo["CName"] + 
                    "', " + courseInfo["Credits"] + ", '" + courseInfo["Career"] + "');";

                SqlCommand insertRequest = new SqlCommand(query, conn);
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
                string query = "DELETE FROM CGROUPS WHERE CID='" + courseInfo["CID"] + "');";
                SqlCommand deleteRequest = new SqlCommand(query, conn);
                deleteRequest.ExecuteNonQuery();

                query = "DELETE FROM COURSE WHERE CID='" + courseInfo["CID"] + "');";
                deleteRequest = new SqlCommand(query, conn);
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
            conn.Open();
            int flag = 0;
            string query = "UPDATE COURSE SET CName='" + courseInfo["CName"] + "', Credits=" + courseInfo["Credits"] + 
                ", Career='" + courseInfo["Career"] + "' WHERE CID='" + courseInfo["CID"] + "');";
            SqlCommand updateRequest = new SqlCommand(query, conn);
            flag = updateRequest.ExecuteNonQuery();

            if(flag == 1)
            {
                return Ok("Curso actualizado");
            }
            else
            {
                return BadRequest("Course ID not found");
            }
        }


        // GET api/values
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        public string Get(int id)
        {
            conn.Open();
            System.Diagnostics.Debug.Print("La conexion a la BD: " + conn.Database + " ha sido existosa");
            string query = "SELECT * FROM COURSE;";
            SqlCommand command = new SqlCommand(query, conn);
            SqlDataReader data = command.ExecuteReader();
            while (data.Read())
            {
                Debug.Print(data.GetValue(1).ToString());
            }
            data.Close();
            conn.Close();
            return "value";
        }

        // POST api/values
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
