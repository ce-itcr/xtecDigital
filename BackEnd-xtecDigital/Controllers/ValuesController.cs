﻿using System;
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
