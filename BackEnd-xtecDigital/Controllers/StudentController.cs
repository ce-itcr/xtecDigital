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
using System.Globalization;

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

                SemesterCourse course = new SemesterCourse("SEMESTRE " + item[1] + " " + item[0], courses[j]);
                obj.Add(JsonConvert.SerializeObject(course));
                j++;
            }
            data.Close();
            conn.Close();
            return obj;

        }


        [HttpPost]
        [Route("api/student/group/news")]
        public JArray getGroupNews([FromBody] JObject groupInfo)
        {
            conn.Open();
            SqlCommand getRequest = conn.CreateCommand();
            getRequest.CommandText = "EXEC sp_GetStudentNews @GID";
            getRequest.Parameters.Add("@GID", SqlDbType.VarChar, 50).Value = groupInfo["id"];
            getRequest.ExecuteNonQuery();
            SqlDataReader data = getRequest.ExecuteReader();
            JArray obj = new JArray();
            while (data.Read())
            {
                int pos1 = data.GetValue(1).ToString().IndexOf("/") + 1;
                pos1 += data.GetValue(1).ToString().Substring(pos1).IndexOf("/") + 5;
                DateTime date = DateTime.ParseExact(data.GetValue(1).ToString().Substring(0, pos1), "dd/MM/yyyy", CultureInfo.InvariantCulture);
                string correctdate = date.ToString("yyyy/MM/dd");
                JObject newsInfo = new JObject(
                new JProperty("title", data.GetValue(0).ToString()),
                new JProperty("publicationDate", correctdate),
                new JProperty("publicationTime", data.GetValue(2).ToString()),
                new JProperty("author", data.GetValue(3).ToString()),
                new JProperty("message", data.GetValue(4).ToString())
                );
                obj.Add(newsInfo);
            }
            data.Close();
            conn.Close();
            return obj;
        }

        [HttpPost]
        [Route("api/student/group/folder")]
        public JArray getGroupfolder([FromBody] JObject groupInfo)
        {
            conn.Open();
            SqlCommand getRequest = conn.CreateCommand();
            getRequest.CommandText = "EXEC sp_GetGroupFolder @GID";
            getRequest.Parameters.Add("@GID", SqlDbType.VarChar, 50).Value = groupInfo["id"];
            getRequest.ExecuteNonQuery();
            SqlDataReader data = getRequest.ExecuteReader();
            JArray obj = new JArray();
            while (data.Read())
            {
                int pos1 = data.GetValue(2).ToString().IndexOf("/") + 1;
                pos1 += data.GetValue(2).ToString().Substring(pos1).IndexOf("/") + 5;
                JObject newsInfo = new JObject(
                new JProperty("name", data.GetValue(0).ToString()),
                new JProperty("Teacher", data.GetValue(1).ToString()),
                new JProperty("creationDate", data.GetValue(2).ToString().Substring(0, pos1))
                );
                obj.Add(newsInfo);
            }
            data.Close();
            conn.Close();
            return obj;
        }
    }
}
