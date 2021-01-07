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

        [HttpPost]
        [Route("api/teacher/group/folder/add")]
        public IHttpActionResult addFolders([FromBody] JObject folderInfo)
        {

            try
            {
                conn.Open();
                SqlCommand insertRequest = conn.CreateCommand();
                insertRequest.CommandText = "EXEC sp_AddFolder @FID, @FolderName, @GID, @Editable, @Teacher, @CreationDate";
                insertRequest.Parameters.Add("@FID", SqlDbType.VarChar, 100).Value = folderInfo["id"].ToString() + "-" + folderInfo["title"].ToString();
                insertRequest.Parameters.Add("@FolderName", SqlDbType.VarChar, 50).Value = folderInfo["title"];
                insertRequest.Parameters.Add("@GID", SqlDbType.VarChar, 50).Value = folderInfo["id"];
                insertRequest.Parameters.Add("@Editable", SqlDbType.VarChar, 10).Value = "true";
                insertRequest.Parameters.Add("@Teacher", SqlDbType.Int).Value = folderInfo["author"];
                insertRequest.Parameters.Add("@CreationDate", SqlDbType.Date).Value = folderInfo["date"];
                insertRequest.ExecuteNonQuery();
                conn.Close();
                return Ok("Folder agregado");
            }
            catch
            {
                return BadRequest("Error al insertar");
            }
        }

        [HttpPost]
        [Route("api/teacher/group/folder/document")]
        public JArray getGroupfolder([FromBody] JObject folderInfo)
        {
            conn.Open();
            SqlCommand getRequest = conn.CreateCommand();
            getRequest.CommandText = "EXEC sp_GetFolderDocument @FID";
            getRequest.Parameters.Add("@FID", SqlDbType.VarChar, 100).Value = folderInfo["id"];
            getRequest.ExecuteNonQuery();
            SqlDataReader data = getRequest.ExecuteReader();
            JArray obj = new JArray();
            while (data.Read())
            {
                JObject documentInfo = new JObject(
                new JProperty("name", data.GetValue(0).ToString()),
                new JProperty("url", data.GetValue(1).ToString()),
                new JProperty("date", data.GetValue(2).ToString()),
                new JProperty("size", data.GetValue(3).ToString())
                );
                obj.Add(documentInfo);
            }
            data.Close();
            conn.Close();
            return obj;
        }

        [HttpPost]
        [Route("api/teacher/group/folder/delete")]
        public IHttpActionResult deleteFolder([FromBody] JObject FolderInfo)
        {

            try
            {
                conn.Open();
                SqlCommand deleteRequest = conn.CreateCommand();
                deleteRequest.CommandText = "EXEC sp_DeleteFolder @FID";
                Debug.Print(FolderInfo["id"].ToString());
                deleteRequest.Parameters.Add("@FID", SqlDbType.VarChar, 100).Value = FolderInfo["id"];
                deleteRequest.ExecuteNonQuery();
                conn.Close();
                return Ok("Documento eliminado");
            }
            catch
            {
                return BadRequest("Error al eliminar");
            }
        }

        [HttpPost]
        [Route("api/teacher/group/folder/document/add")]
        public IHttpActionResult addDocument([FromBody] JObject documentInfo)
        {

            try
            {
                conn.Open();
                SqlCommand insertRequest = conn.CreateCommand();
                insertRequest.CommandText = "EXEC sp_AddFolderDocument @FID, @DocName, @DocLink, @UploadDate, @DocSize";
                insertRequest.Parameters.Add("@FID", SqlDbType.VarChar, 100).Value = documentInfo["id"];
                insertRequest.Parameters.Add("@DocName", SqlDbType.VarChar, 50).Value = documentInfo["file"];
                insertRequest.Parameters.Add("@DocLink", SqlDbType.VarChar, Int32.MaxValue).Value = documentInfo["url"];
                insertRequest.Parameters.Add("@UploadDate", SqlDbType.Date).Value = documentInfo["date"];
                insertRequest.Parameters.Add("@DocSize", SqlDbType.Int).Value = documentInfo["size"];
                insertRequest.ExecuteNonQuery();
                conn.Close();
                return Ok("Documento agregado");
            }
            catch
            {
                return BadRequest("Error al insertar");
            }
        }

        [HttpPost]
        [Route("api/teacher/group/folder/document/delete")]
        public IHttpActionResult deleteDocument([FromBody] JObject documentInfo)
        {

            try
            {
                conn.Open();
                SqlCommand deleteRequest = conn.CreateCommand();
                deleteRequest.CommandText = "EXEC sp_DeleteFolderDocument @FID, @DocName";
                deleteRequest.Parameters.Add("@FID", SqlDbType.VarChar, 100).Value = documentInfo["id"];
                deleteRequest.Parameters.Add("@DocName", SqlDbType.VarChar, 50).Value = documentInfo["file"];
                deleteRequest.ExecuteNonQuery();
                conn.Close();
                return Ok("Documento eliminado");
            }
            catch
            {
                return BadRequest("Error al eliminar");
            }
        }

        [HttpPost]
        [Route("api/teacher/group/folder/document/update")]
        public IHttpActionResult updateDocument([FromBody] JObject documentInfo)
        {

            try
            {
                conn.Open();
                SqlCommand updateRequest = conn.CreateCommand();
                updateRequest.CommandText = "EXEC sp_UpdateFolderDocument @FID, @DocName, @DocLink";
                updateRequest.Parameters.Add("@FID", SqlDbType.VarChar, 100).Value = documentInfo["id"];
                updateRequest.Parameters.Add("@DocName", SqlDbType.VarChar, 50).Value = documentInfo["file"];
                updateRequest.Parameters.Add("@DocLink", SqlDbType.VarChar, Int32.MaxValue).Value = documentInfo["url"];
                updateRequest.ExecuteNonQuery();
                conn.Close();
                return Ok("Documento actualizado");
            }
            catch
            {
                return BadRequest("Error al actulizar");
            }
        }

        [HttpPost]
        [Route("api/teacher/group/rubros")]
        public JArray getGroupRubros([FromBody] JObject groupInfo)
        {
            conn.Open();
            SqlCommand getRequest = conn.CreateCommand();
            getRequest.CommandText = "EXEC sp_GetRubros @GID";
            getRequest.Parameters.Add("@GID", SqlDbType.VarChar, 50).Value = groupInfo["id"];
            getRequest.ExecuteNonQuery();
            SqlDataReader data = getRequest.ExecuteReader();
            JArray obj = new JArray();
            while (data.Read())
            {
                JObject documentInfo = new JObject(
                new JProperty("rubro", data.GetValue(0).ToString()),
                new JProperty("percentage", data.GetValue(1).ToString())
                );
                obj.Add(documentInfo);
            }
            data.Close();
            conn.Close();
            return obj;
        }

        [HttpPost]
        [Route("api/teacher/group/rubros/add")]
        public IHttpActionResult addRubro([FromBody] JObject rubroInfo)
        {

            try
            {
                conn.Open();
                SqlCommand insertRequest = conn.CreateCommand();
                insertRequest.CommandText = "EXEC sp_AddRubro @GID, @Rubro, @RPercentage";
                insertRequest.Parameters.Add("@GID", SqlDbType.VarChar, 50).Value = rubroInfo["id"];
                insertRequest.Parameters.Add("@Rubro", SqlDbType.VarChar, 50).Value = rubroInfo["rubro"];
                insertRequest.Parameters.Add("@RPercentage", SqlDbType.Int).Value = rubroInfo["percentage"];
                insertRequest.ExecuteNonQuery();
                conn.Close();
                return Ok("Rubro agregado");
            }
            catch
            {
                return BadRequest("Error al insertar");
            }
        }

        [HttpPost]
        [Route("api/teacher/group/rubros/delete")]
        public IHttpActionResult deleteRubro([FromBody] JObject rubroInfo)
        {

            try
            {
                conn.Open();
                SqlCommand deleteRequest = conn.CreateCommand();
                deleteRequest.CommandText = "EXEC sp_DeleteRubro @GID, @Rubro";
                deleteRequest.Parameters.Add("@GID", SqlDbType.VarChar, 50).Value = rubroInfo["id"];
                deleteRequest.Parameters.Add("@Rubro", SqlDbType.VarChar, 50).Value = rubroInfo["rubro"];
                deleteRequest.ExecuteNonQuery();
                conn.Close();
                return Ok("Rubro eliminado");
            }
            catch
            {
                return BadRequest("Error al eliminar");
            }
        }

        [HttpPost]
        [Route("api/teacher/group/rubros/update")]
        public IHttpActionResult updateRubro([FromBody] JObject rubroInfo)
        {

            try
            {
                conn.Open();
                SqlCommand updateRequest = conn.CreateCommand();
                updateRequest.CommandText = "EXEC sp_UpdateRubro @LRubro, @GID, @Rubro, @RPercentage";
                updateRequest.Parameters.Add("@LRubro", SqlDbType.VarChar, 50).Value = rubroInfo["lRubro"];
                updateRequest.Parameters.Add("@GID", SqlDbType.VarChar, 50).Value = rubroInfo["id"];
                updateRequest.Parameters.Add("@Rubro", SqlDbType.VarChar, 50).Value = rubroInfo["rubro"];
                updateRequest.Parameters.Add("@RPercentage", SqlDbType.Int).Value = rubroInfo["percentage"];
                updateRequest.ExecuteNonQuery();
                conn.Close();
                return Ok("Rubro actualizado");
            }
            catch
            {
                return BadRequest("Error al actulizar");
            }
        }

        [HttpPost]
        [Route("api/teacher/group/assignments")]
        public JArray getAssignments([FromBody] JObject rubroInfo)
        {
            conn.Open();
            SqlCommand getRequest = conn.CreateCommand();
            getRequest.CommandText = "EXEC sp_GetAssignment @GID, @Rubro";
            getRequest.Parameters.Add("@GID", SqlDbType.VarChar, 50).Value = rubroInfo["id"];
            getRequest.Parameters.Add("@Rubro", SqlDbType.VarChar, 50).Value = rubroInfo["rubro"];
            getRequest.ExecuteNonQuery();
            SqlDataReader data = getRequest.ExecuteReader();
            JArray obj = new JArray();
            while (data.Read())
            {
                JObject documentInfo = new JObject(
                new JProperty("APercentage", data.GetValue(0).ToString()),
                new JProperty("AName", data.GetValue(1).ToString()),
                new JProperty("DueTime", data.GetValue(2).ToString()),
                new JProperty("DueDate", data.GetValue(3).ToString()),
                new JProperty("ADesc", data.GetValue(4).ToString()),
                new JProperty("ALink", data.GetValue(5).ToString())
                );
                obj.Add(documentInfo);
            }
            data.Close();
            conn.Close();
            return obj;
        }

        [HttpPost]
        [Route("api/teacher/group/assignments/add")]
        public IHttpActionResult addAssignment([FromBody] JObject assignmentInfo)
        {

            try
            {
                conn.Open();
                SqlCommand insertRequest = conn.CreateCommand();
                insertRequest.CommandText = "EXEC sp_AddRubro @GID, @Rubro, @RPercentage";

                insertRequest.CommandText = "EXEC sp_AddAssignment @AID, @GID, @Rubro, @AStarted, @APercentage, @AName, @DueTime, @DueDate, @ADescription, @ALink";
                insertRequest.Parameters.Add("@AID", SqlDbType.VarChar, 100).Value = assignmentInfo["AID"];
                insertRequest.Parameters.Add("@GID", SqlDbType.VarChar, 50).Value = assignmentInfo["GID"];
                insertRequest.Parameters.Add("@Rubro", SqlDbType.VarChar, 50).Value = assignmentInfo["rubro"];
                insertRequest.Parameters.Add("@AStarted", SqlDbType.VarChar, 50).Value = assignmentInfo["started"];
                insertRequest.Parameters.Add("@APercentage", SqlDbType.Int).Value = assignmentInfo["percentage"];
                insertRequest.Parameters.Add("@AName", SqlDbType.VarChar, 50).Value = assignmentInfo["name"];
                insertRequest.Parameters.Add("@DueTime", SqlDbType.Time).Value = assignmentInfo["time"];
                insertRequest.Parameters.Add("@DueDate", SqlDbType.Date).Value = assignmentInfo["date"];
                insertRequest.Parameters.Add("@ADescription", SqlDbType.VarChar, 20).Value = assignmentInfo["desc"];
                insertRequest.Parameters.Add("@ALink", SqlDbType.VarChar, Int32.MaxValue).Value = assignmentInfo["link"];
                insertRequest.ExecuteNonQuery();
                conn.Close();
                return Ok("Asignación agregada");
            }
            catch
            {
                return BadRequest("Error al insertar");
            }
        }

        [HttpPost]
        [Route("api/teacher/group/assignments/delete")]
        public IHttpActionResult deleteAssignment([FromBody] JObject assignmentInfo)
        {

            try
            {
                conn.Open();
                SqlCommand deleteRequest = conn.CreateCommand();
                deleteRequest.CommandText = "EXEC sp_DeleteAssignment @AID";
                deleteRequest.Parameters.Add("@AID", SqlDbType.VarChar, 100).Value = assignmentInfo["id"];
                deleteRequest.ExecuteNonQuery();
                conn.Close();
                return Ok("Asignación eliminada");
            }
            catch
            {
                return BadRequest("Error al eliminar");
            }
        }

        [HttpPost]
        [Route("api/teacher/group/assignemts/update")]
        public IHttpActionResult updateAssignment([FromBody] JObject assignmentInfo)
        {

            try
            {
                conn.Open();
                SqlCommand updateRequest = conn.CreateCommand();
                updateRequest.CommandText = "EXEC sp_UpdateAssignment @AID, @AStarted, @APercentage, @AName, @DueTime, @DueDate, @ADescription, @ALink";
                updateRequest.Parameters.Add("@AID", SqlDbType.VarChar, 100).Value = assignmentInfo["AID"];
                updateRequest.Parameters.Add("@AStarted", SqlDbType.VarChar, 50).Value = assignmentInfo["started"];
                updateRequest.Parameters.Add("@APercentage", SqlDbType.Int).Value = assignmentInfo["percentage"];
                updateRequest.Parameters.Add("@AName", SqlDbType.VarChar, 50).Value = assignmentInfo["name"];
                updateRequest.Parameters.Add("@DueTime", SqlDbType.Time).Value = assignmentInfo["time"];
                updateRequest.Parameters.Add("@DueDate", SqlDbType.Date).Value = assignmentInfo["date"];
                updateRequest.Parameters.Add("@ADescription", SqlDbType.VarChar, 20).Value = assignmentInfo["desc"];
                updateRequest.Parameters.Add("@ALink", SqlDbType.VarChar, Int32.MaxValue).Value = assignmentInfo["link"];
                updateRequest.ExecuteNonQuery();
                conn.Close();
                return Ok("Rubro actualizado");
            }
            catch
            {
                return BadRequest("Error al actulizar");
            }
        }

        [HttpPost]
        [Route("api/teacher/group/assignments/getStudents")]
        public JArray getUploadedAssignments([FromBody] JObject assignmentInfo)
        {
            conn.Open();
            SqlCommand getRequest = conn.CreateCommand();
            getRequest.CommandText = "EXEC  sp_getUploadedAssignmets @AID";
            getRequest.Parameters.Add("@AID", SqlDbType.VarChar, 100).Value = assignmentInfo["assignment"];
            getRequest.ExecuteNonQuery();
            SqlDataReader data = getRequest.ExecuteReader();
            JArray obj = new JArray();
            while (data.Read())
            {
                JObject documentInfo = new JObject(
                new JProperty("id", data.GetValue(0).ToString()),
                new JProperty("url", data.GetValue(1).ToString())
                );
                obj.Add(documentInfo);
            }
            data.Close();
            conn.Close();
            return obj;
        }

        [HttpPost]
        [Route("api/teacher/group/assignemts/feedback")]
        public IHttpActionResult uploadFeedback([FromBody] JObject feedbackInfo)
        {

            try
            {
                conn.Open();
                SqlCommand updateRequest = conn.CreateCommand();
                Debug.Print(feedbackInfo["assignment"].ToString());
                Debug.Print(feedbackInfo["studentId"].ToString());
                Debug.Print(feedbackInfo["grade"].ToString());
                Debug.Print(feedbackInfo["url"].ToString());
                updateRequest.CommandText = "EXEC sp_uploadFeedback @AID, @Student, @Grade, @FLink";
                updateRequest.Parameters.Add("@AID", SqlDbType.VarChar, 100).Value = feedbackInfo["assignment"];
                updateRequest.Parameters.Add("@Student", SqlDbType.Int).Value = feedbackInfo["studentId"];
                updateRequest.Parameters.Add("@Grade", SqlDbType.Int).Value = feedbackInfo["grade"];
                updateRequest.Parameters.Add("@FLink", SqlDbType.VarChar, Int32.MaxValue).Value = feedbackInfo["url"];
                updateRequest.ExecuteNonQuery();
                conn.Close();
                return Ok("Evaluado");
            }
            catch
            {
                return BadRequest("Error al evaluar");
            }
        }

    }
}
