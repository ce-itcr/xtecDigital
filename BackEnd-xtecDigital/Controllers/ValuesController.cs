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

            try
            {
                conn.Open();
                SqlCommand insertRequest = conn.CreateCommand();
                insertRequest.CommandText = "EXEC sp_AddCourse @CID, @CName, @Credits, @Career";
                insertRequest.Parameters.Add("@CID", SqlDbType.VarChar, 50).Value = courseInfo["id"];
                insertRequest.Parameters.Add("@CName", SqlDbType.VarChar, 50).Value = courseInfo["name"];
                insertRequest.Parameters.Add("@Credits", SqlDbType.Int).Value = (int)courseInfo["credits"];
                insertRequest.Parameters.Add("@Career", SqlDbType.VarChar, 50).Value = courseInfo["career"];
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
            try {
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
