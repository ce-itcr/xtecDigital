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

            Debug.Print(groupInfo["id"].ToString());

            string year = groupInfo["id"].ToString().Substring(0,4);
            string period = groupInfo["id"].ToString().Substring(5, 1);
            string CID = groupInfo["id"].ToString().Substring(7, 6);
            string number = groupInfo["id"].ToString().Substring(14, 1);

            Debug.Print(year);
            Debug.Print(period);
            Debug.Print(CID);
            Debug.Print(number);

            conn.Open();
            SqlCommand getRequest = conn.CreateCommand();
            getRequest.CommandText = "EXEC sp_GetStudentNews @Number, @CID, @Year, @Period";
            getRequest.Parameters.Add("@Number", SqlDbType.Int).Value = number;
            getRequest.Parameters.Add("@CID", SqlDbType.VarChar, 50).Value = CID;
            getRequest.Parameters.Add("@Year", SqlDbType.VarChar, 4).Value = year;
            getRequest.Parameters.Add("@Period", SqlDbType.VarChar, 1).Value = period;
            getRequest.ExecuteNonQuery();
            SqlDataReader data = getRequest.ExecuteReader();
            JArray obj = new JArray();
            while (data.Read())
            {
                int pos1 = data.GetValue(1).ToString().IndexOf("/") + 1;
                pos1 += data.GetValue(1).ToString().Substring(pos1).IndexOf("/") + 5;
                string y = data.GetValue(1).ToString().Substring(0, pos1);
                Debug.Print("No funca: " + y);
                Debug.Print("Funca:" + "01/12/2021");
                DateTime date = DateTime.ParseExact(y, "dd/MM/yyyy", CultureInfo.InvariantCulture);
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
                JObject folderInfo = new JObject(
                new JProperty("name", data.GetValue(0).ToString()),
                new JProperty("Teacher", data.GetValue(1).ToString()),
                new JProperty("creationDate", data.GetValue(2).ToString().Substring(0, pos1))
                );
                obj.Add(folderInfo);
            }
            data.Close();
            conn.Close();
            return obj;
        }

        [HttpPost]
        [Route("api/student/rubros/assignments/upload")]
        public IHttpActionResult uploadAssignment([FromBody] JObject assignmentInfo)
        {

            try
            {
                conn.Open();
                SqlCommand updateRequest = conn.CreateCommand();
                Debug.Print(assignmentInfo["id"].ToString());
                Debug.Print(assignmentInfo["assignment"].ToString());
                Debug.Print(assignmentInfo["url"].ToString());
                updateRequest.CommandText = "EXEC sp_uploadAssignment @AID, @SLink, @SID";
                updateRequest.Parameters.Add("@AID", SqlDbType.VarChar, 100).Value = assignmentInfo["assignment"];
                updateRequest.Parameters.Add("@SLink", SqlDbType.VarChar, Int32.MaxValue).Value = assignmentInfo["url"];
                updateRequest.Parameters.Add("@SID", SqlDbType.Int).Value = assignmentInfo["id"];
                updateRequest.ExecuteNonQuery();
                conn.Close();
                return Ok("Asignación cargada");
            }
            catch
            {
                return BadRequest("Error al insertar");
            }
        }

        [HttpPost]
        [Route("api/teacher/group/assignments/getFeedback")]
        public JArray getFeedback([FromBody] JObject feedbackInfo)
        {
            conn.Open();
            SqlCommand getRequest = conn.CreateCommand();
            Debug.Print(feedbackInfo["assignment"].ToString());
            Debug.Print(feedbackInfo["studentId"].ToString());
            getRequest.CommandText = "EXEC  sp_getFeedback @AID, @Student";
            getRequest.Parameters.Add("@AID", SqlDbType.VarChar, 100).Value = feedbackInfo["assignment"];
            getRequest.Parameters.Add("@Student", SqlDbType.Int).Value = feedbackInfo["studentId"];
            getRequest.ExecuteNonQuery();
            SqlDataReader data = getRequest.ExecuteReader();
            JArray obj = new JArray();
            while (data.Read())
            {
                JObject documentInfo = new JObject(
                new JProperty("grade", data.GetValue(0).ToString()),
                new JProperty("url", data.GetValue(1).ToString())
                );
                obj.Add(documentInfo);
            }
            data.Close();
            conn.Close();
            return obj;
        }
    }
}
