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
using System.Data;
using Newtonsoft.Json;

namespace BackEnd_xtecDigital.Controllers
{
    [EnableCors(origins: "http://localhost:4200/", headers: "*", methods: "*")]
    public class StudentController : ApiController
    {
        static string stringconnection = @"Data Source=(localdb)\xTecDigital; Initial Catalog=xTecDigital; Integrated Security=True";
        SqlConnection conn = new SqlConnection(stringconnection);

        [HttpPost]
        [Route("api/student/semester")]
        public JArray obtainStudentSemester([FromBody] JObject studentInfo)
        {
            conn.Open();
            SqlCommand getRequest = conn.CreateCommand();
            getRequest.CommandText = "EXEC sp_GetStudentSemester @Student";
            getRequest.Parameters.Add("@Student", SqlDbType.Int).Value = studentInfo["id"];
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
            foreach(var item in semester)
            {

                StudentCourse course = new StudentCourse("SEMESTER " + item[1] + " " + item[0], courses[j]);
                obj.Add(JsonConvert.SerializeObject(course));
                j++;
            }
            data.Close();
            conn.Close();
            return obj;

        }

        public class StudentCourse
        {
            public string semester;
            public string[][] courses;

            public StudentCourse(string semester, string[][] courses)
            {
                this.semester = semester;
                this.courses = courses;
            }
        }
    }
}
