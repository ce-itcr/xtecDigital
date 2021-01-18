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

                string[] data = getGID(newsInfo);

                conn.Open();
                SqlCommand insertRequest = conn.CreateCommand();
                insertRequest.CommandText = "EXEC sp_AddNews @PublicationTime, @PublicationDate, @Author, @NMessage, @Title, @Number, @CID, @Year, @Period";
                insertRequest.Parameters.Add("@PublicationTime", SqlDbType.Time).Value = newsInfo["hour"];
                insertRequest.Parameters.Add("@PublicationDate", SqlDbType.Date).Value = newsInfo["date"];
                insertRequest.Parameters.Add("@Author", SqlDbType.VarChar, 50).Value = newsInfo["author"];
                insertRequest.Parameters.Add("@NMessage", SqlDbType.VarChar, 300).Value = newsInfo["body"];
                insertRequest.Parameters.Add("@Title", SqlDbType.VarChar, 30).Value = newsInfo["title"];
                insertRequest.Parameters.Add("@Number", SqlDbType.Int).Value = data[3];
                insertRequest.Parameters.Add("@CID", SqlDbType.VarChar, 50).Value = data[2];
                insertRequest.Parameters.Add("@Year", SqlDbType.VarChar, 4).Value = data[0];
                insertRequest.Parameters.Add("@Period", SqlDbType.VarChar, 1).Value = data[1];
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

                string[] data = getNewsInfo(newsInfo);

                conn.Open();
                SqlCommand updateRequest = conn.CreateCommand();
                updateRequest.CommandText = "EXEC sp_UpdateNews @NMessage, @Title, @PublicationTime, @PublicationDate, @Author";
                updateRequest.Parameters.Add("@NMessage", SqlDbType.VarChar, 300).Value = newsInfo["body"];
                updateRequest.Parameters.Add("@Title", SqlDbType.VarChar, 30).Value = newsInfo["title"];
                updateRequest.Parameters.Add("@PublicationTime", SqlDbType.Time).Value = data[2];
                updateRequest.Parameters.Add("@PublicationDate", SqlDbType.Date).Value = data[1];
                updateRequest.Parameters.Add("@Author", SqlDbType.VarChar, 50).Value = data[0];
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

                string[] data = getNewsInfo(newsInfo);

                conn.Open();
                SqlCommand updateRequest = conn.CreateCommand();
                updateRequest.CommandText = "EXEC sp_DeleteNews @PublicationTime, @PublicationDate, @Author";
                updateRequest.Parameters.Add("@PublicationTime", SqlDbType.Time).Value = data[2];
                updateRequest.Parameters.Add("@PublicationDate", SqlDbType.Date).Value = data[1];
                updateRequest.Parameters.Add("@Author", SqlDbType.VarChar, 50).Value = data[0];
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

                string[] GID = getGID(folderInfo);

                conn.Open();
                SqlCommand insertRequest = conn.CreateCommand();
                insertRequest.CommandText = "EXEC sp_AddFolder @FolderName, @Number, @CID, @Year, @Period, @Editable, @Teacher, @CreationDate";
                insertRequest.Parameters.Add("@FolderName", SqlDbType.VarChar, 50).Value = folderInfo["title"];
                insertRequest.Parameters.Add("@Number", SqlDbType.Int).Value = GID[3];
                insertRequest.Parameters.Add("@CID", SqlDbType.VarChar, 50).Value = GID[2];
                insertRequest.Parameters.Add("@Year", SqlDbType.VarChar, 4).Value = GID[0];
                insertRequest.Parameters.Add("@Period", SqlDbType.VarChar, 1).Value = GID[1];
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

            string[] GID = getGID(folderInfo);

            conn.Open();
            SqlCommand getRequest = conn.CreateCommand();
            getRequest.CommandText = "EXEC sp_GetFolderDocument @FolderName, @Number, @CID, @Year, @Period";
            getRequest.Parameters.Add("@FolderName", SqlDbType.VarChar, 50).Value = folderInfo["title"];
            getRequest.Parameters.Add("@Number", SqlDbType.Int).Value = GID[3];
            getRequest.Parameters.Add("@CID", SqlDbType.VarChar, 50).Value = GID[2];
            getRequest.Parameters.Add("@Year", SqlDbType.VarChar, 4).Value = GID[0];
            getRequest.Parameters.Add("@Period", SqlDbType.VarChar, 1).Value = GID[1];
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
        public IHttpActionResult deleteFolder([FromBody] JObject folderInfo)
        {

            try
            {

                string[] GID = getGID(folderInfo);

                conn.Open();
                SqlCommand deleteRequest = conn.CreateCommand();
                deleteRequest.CommandText = "EXEC sp_DeleteFolder @FolderName, @Number, @CID, @Year, @Period";
                deleteRequest.Parameters.Add("@FolderName", SqlDbType.VarChar, 50).Value = folderInfo["title"];
                deleteRequest.Parameters.Add("@Number", SqlDbType.Int).Value = GID[3];
                deleteRequest.Parameters.Add("@CID", SqlDbType.VarChar, 50).Value = GID[2];
                deleteRequest.Parameters.Add("@Year", SqlDbType.VarChar, 4).Value = GID[0];
                deleteRequest.Parameters.Add("@Period", SqlDbType.VarChar, 1).Value = GID[1];
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

                string[] GID = getGID(documentInfo);

                conn.Open();
                SqlCommand insertRequest = conn.CreateCommand();
                insertRequest.CommandText = "EXEC sp_AddFolderDocument @FolderName, @Number, @CID, @Year, @Period, @DocName, @DocLink, @UploadDate, @DocSize";
                insertRequest.Parameters.Add("@FolderName", SqlDbType.VarChar, 50).Value = documentInfo["title"];
                insertRequest.Parameters.Add("@Number", SqlDbType.Int).Value = GID[3];
                insertRequest.Parameters.Add("@CID", SqlDbType.VarChar, 50).Value = GID[2];
                insertRequest.Parameters.Add("@Year", SqlDbType.VarChar, 4).Value = GID[0];
                insertRequest.Parameters.Add("@Period", SqlDbType.VarChar, 1).Value = GID[1];
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

                string[] GID = getGID(documentInfo);

                conn.Open();
                SqlCommand deleteRequest = conn.CreateCommand();
                deleteRequest.CommandText = "EXEC sp_DeleteFolderDocument @FolderName, @Number, @CID, @Year, @Period, @DocName";
                deleteRequest.Parameters.Add("@FolderName", SqlDbType.VarChar, 50).Value = documentInfo["title"];
                deleteRequest.Parameters.Add("@Number", SqlDbType.Int).Value = GID[3];
                deleteRequest.Parameters.Add("@CID", SqlDbType.VarChar, 50).Value = GID[2];
                deleteRequest.Parameters.Add("@Year", SqlDbType.VarChar, 4).Value = GID[0];
                deleteRequest.Parameters.Add("@Period", SqlDbType.VarChar, 1).Value = GID[1];
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

                string[] GID = getGID(documentInfo);

                conn.Open();
                SqlCommand updateRequest = conn.CreateCommand();
                updateRequest.CommandText = "EXEC sp_UpdateFolderDocument @FolderName, @Number, @CID, @Year, @Period, @DocName, @DocLink";
                updateRequest.Parameters.Add("@FolderName", SqlDbType.VarChar, 50).Value = documentInfo["title"];
                updateRequest.Parameters.Add("@Number", SqlDbType.Int).Value = GID[3];
                updateRequest.Parameters.Add("@CID", SqlDbType.VarChar, 50).Value = GID[2];
                updateRequest.Parameters.Add("@Year", SqlDbType.VarChar, 4).Value = GID[0];
                updateRequest.Parameters.Add("@Period", SqlDbType.VarChar, 1).Value = GID[1];
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

            string[] GID = getGID(groupInfo);

            conn.Open();
            SqlCommand getRequest = conn.CreateCommand();
            getRequest.CommandText = "EXEC sp_GetRubros @Number, @CID, @Year, @Period";
            getRequest.Parameters.Add("@Number", SqlDbType.Int).Value = GID[3];
            getRequest.Parameters.Add("@CID", SqlDbType.VarChar, 50).Value = GID[2];
            getRequest.Parameters.Add("@Year", SqlDbType.VarChar, 4).Value = GID[0];
            getRequest.Parameters.Add("@Period", SqlDbType.VarChar, 1).Value = GID[1];
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

                string[] GID = getGID(rubroInfo);

                conn.Open();
                SqlCommand insertRequest = conn.CreateCommand();
                insertRequest.CommandText = "EXEC sp_AddRubro @Number, @CID, @Year, @Period, @Rubro, @RPercentage";
                insertRequest.Parameters.Add("@Number", SqlDbType.Int).Value = GID[3];
                insertRequest.Parameters.Add("@CID", SqlDbType.VarChar, 50).Value = GID[2];
                insertRequest.Parameters.Add("@Year", SqlDbType.VarChar, 4).Value = GID[0];
                insertRequest.Parameters.Add("@Period", SqlDbType.VarChar, 1).Value = GID[1];
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

                string[] GID = getGID(rubroInfo);

                conn.Open();
                SqlCommand deleteRequest = conn.CreateCommand();
                deleteRequest.CommandText = "EXEC sp_DeleteRubro @Number, @CID, @Year, @Period, @Rubro";
                deleteRequest.Parameters.Add("@Number", SqlDbType.Int).Value = GID[3];
                deleteRequest.Parameters.Add("@CID", SqlDbType.VarChar, 50).Value = GID[2];
                deleteRequest.Parameters.Add("@Year", SqlDbType.VarChar, 4).Value = GID[0];
                deleteRequest.Parameters.Add("@Period", SqlDbType.VarChar, 1).Value = GID[1];
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

                string[] GID = getGID(rubroInfo);

                conn.Open();
                SqlCommand updateRequest = conn.CreateCommand();
                updateRequest.CommandText = "EXEC sp_UpdateRubro @LRubro, @Number, @CID, @Year, @Period, @Rubro, @RPercentage";
                updateRequest.Parameters.Add("@LRubro", SqlDbType.VarChar, 50).Value = rubroInfo["lRubro"];
                updateRequest.Parameters.Add("@Number", SqlDbType.Int).Value = GID[3];
                updateRequest.Parameters.Add("@CID", SqlDbType.VarChar, 50).Value = GID[2];
                updateRequest.Parameters.Add("@Year", SqlDbType.VarChar, 4).Value = GID[0];
                updateRequest.Parameters.Add("@Period", SqlDbType.VarChar, 1).Value = GID[1];
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

            string[] GID = getGID(rubroInfo);

            conn.Open();
            SqlCommand getRequest = conn.CreateCommand();
            getRequest.CommandText = "EXEC sp_GetAssignment @Number, @CID, @Year, @Period, @Rubro";
            getRequest.Parameters.Add("@Number", SqlDbType.Int).Value = GID[3];
            getRequest.Parameters.Add("@CID", SqlDbType.VarChar, 50).Value = GID[2];
            getRequest.Parameters.Add("@Year", SqlDbType.VarChar, 4).Value = GID[0];
            getRequest.Parameters.Add("@Period", SqlDbType.VarChar, 1).Value = GID[1];
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

                string[] GID = getGID(assignmentInfo);

                conn.Open();
                SqlCommand insertRequest = conn.CreateCommand();

                insertRequest.CommandText = "EXEC sp_AddAssignment @Number, @CID, @Year, @Period, @Rubro, @AStarted, @APercentage, @AName, @DueTime, @DueDate, @ADescription, @ALink";
                insertRequest.Parameters.Add("@Number", SqlDbType.Int).Value = GID[3];
                insertRequest.Parameters.Add("@CID", SqlDbType.VarChar, 50).Value = GID[2];
                insertRequest.Parameters.Add("@Year", SqlDbType.VarChar, 4).Value = GID[0];
                insertRequest.Parameters.Add("@Period", SqlDbType.VarChar, 1).Value = GID[1];
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

                string[] GID = getGID(assignmentInfo);
                int end = assignmentInfo["id"].ToString().Length;

                Debug.Print(assignmentInfo["id"].ToString().Substring(15, end - 15));

                conn.Open();
                SqlCommand deleteRequest = conn.CreateCommand();
                deleteRequest.CommandText = "EXEC sp_DeleteAssignment @Number, @CID, @Year, @Period, @AName";
                deleteRequest.Parameters.Add("@Number", SqlDbType.Int).Value = GID[3];
                deleteRequest.Parameters.Add("@CID", SqlDbType.VarChar, 50).Value = GID[2];
                deleteRequest.Parameters.Add("@Year", SqlDbType.VarChar, 4).Value = GID[0];
                deleteRequest.Parameters.Add("@Period", SqlDbType.VarChar, 1).Value = GID[1];
                deleteRequest.Parameters.Add("@AName", SqlDbType.VarChar, 50).Value = assignmentInfo["id"].ToString().Substring(16, end - 16);
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

            string[] GID = getGID(assignmentInfo);

            conn.Open();
            SqlCommand getRequest = conn.CreateCommand();
            getRequest.CommandText = "EXEC  sp_getUploadedAssignmets @Number, @CID, @Year, @Period, @AName";
            getRequest.Parameters.Add("@Number", SqlDbType.Int).Value = GID[3];
            getRequest.Parameters.Add("@CID", SqlDbType.VarChar, 50).Value = GID[2];
            getRequest.Parameters.Add("@Year", SqlDbType.VarChar, 4).Value = GID[0];
            getRequest.Parameters.Add("@Period", SqlDbType.VarChar, 1).Value = GID[1];
            getRequest.Parameters.Add("@AName", SqlDbType.VarChar, 50).Value = assignmentInfo["title"];
            getRequest.ExecuteNonQuery();
            SqlDataReader data = getRequest.ExecuteReader();
            JArray obj = new JArray();
            while (data.Read())
            {
                JObject documentInfo = new JObject(
                new JProperty("id", data.GetValue(0).ToString()),
                new JProperty("url", data.GetValue(1).ToString()),
                new JProperty("group", data.GetValue(2).ToString())
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

                string[] GID = getGID(feedbackInfo);

                conn.Open();
                SqlCommand updateRequest = conn.CreateCommand();
                updateRequest.CommandText = "EXEC sp_uploadFeedback @Number, @CID, @Year, @Period, @AName, @SGroup, @Grade, @FLink";
                updateRequest.Parameters.Add("@Number", SqlDbType.Int).Value = GID[3];
                updateRequest.Parameters.Add("@CID", SqlDbType.VarChar, 50).Value = GID[2];
                updateRequest.Parameters.Add("@Year", SqlDbType.VarChar, 4).Value = GID[0];
                updateRequest.Parameters.Add("@Period", SqlDbType.VarChar, 1).Value = GID[1];
                updateRequest.Parameters.Add("@AName", SqlDbType.VarChar, 50).Value = feedbackInfo["title"];
                updateRequest.Parameters.Add("@SGroup", SqlDbType.Int).Value = feedbackInfo["groupNum"];
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

        [HttpPost]
        [Route("api/teacher/group/students/get")]
        public string[] obtainStudents([FromBody] JObject groupInfo)
        {

            string[] GID = getGID(groupInfo);

            conn.Open();
            SqlCommand getRequest = conn.CreateCommand();
            getRequest.CommandText = "EXEC sp_getCourseStudents @Number, @CID, @Year, @Period";
            getRequest.Parameters.Add("@Number", SqlDbType.Int).Value = GID[3];
            getRequest.Parameters.Add("@CID", SqlDbType.VarChar, 50).Value = GID[2];
            getRequest.Parameters.Add("@Year", SqlDbType.VarChar, 4).Value = GID[0];
            getRequest.Parameters.Add("@Period", SqlDbType.VarChar, 1).Value = GID[1];
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
        [Route("api/teacher/group/workgroups/add")]
        public IHttpActionResult addWorkGroup([FromBody] JObject groupInfo)
        {

            try
            {
                foreach(var student in groupInfo["Students"])
                {

                    string[] GID = getGID(groupInfo);
                    int end = groupInfo["id"].ToString().Length;

                    conn.Open();
                    SqlCommand insertRequest = conn.CreateCommand();
                    insertRequest.CommandText = "EXEC sp_addWorkGroup @Student, @Number, @CID, @Year, @Period, @AName, @GroupNum";
                    insertRequest.Parameters.Add("@Student", SqlDbType.Int).Value = student;
                    insertRequest.Parameters.Add("@Number", SqlDbType.Int).Value = GID[3];
                    insertRequest.Parameters.Add("@CID", SqlDbType.VarChar, 50).Value = GID[2];
                    insertRequest.Parameters.Add("@Year", SqlDbType.VarChar, 4).Value = GID[0];
                    insertRequest.Parameters.Add("@Period", SqlDbType.VarChar, 1).Value = GID[1];
                    insertRequest.Parameters.Add("@AName", SqlDbType.VarChar, 50).Value = groupInfo["id"].ToString().Substring(16, end - 16);
                    insertRequest.Parameters.Add("@GroupNum", SqlDbType.Int).Value = groupInfo["GID"];
                    insertRequest.ExecuteNonQuery();
                    conn.Close();

                    conn.Open();
                    insertRequest = conn.CreateCommand();
                    insertRequest.CommandText = "EXEC sp_studentAssignment @Number, @CID, @Year, @Period, @AName, @SID, @SGroup";
                    insertRequest.Parameters.Add("@Number", SqlDbType.Int).Value = GID[3];
                    insertRequest.Parameters.Add("@CID", SqlDbType.VarChar, 50).Value = GID[2];
                    insertRequest.Parameters.Add("@Year", SqlDbType.VarChar, 4).Value = GID[0];
                    insertRequest.Parameters.Add("@Period", SqlDbType.VarChar, 1).Value = GID[1];
                    insertRequest.Parameters.Add("@AName", SqlDbType.VarChar, 50).Value = groupInfo["id"].ToString().Substring(16, end - 16);
                    insertRequest.Parameters.Add("@SID", SqlDbType.Int).Value = student;
                    insertRequest.Parameters.Add("@SGroup", SqlDbType.Int).Value = groupInfo["GID"];
                    insertRequest.ExecuteNonQuery();
                    conn.Close();
                }
                
                return Ok("Asignación agregada");
            }
            catch
            {
                return BadRequest("Error al insertar");
            }
        }

        [HttpPost]
        [Route("api/teacher/group/individual/add")]
        public IHttpActionResult addIndividualAssignment([FromBody] JObject groupInfo)
        {

            try
            {
                int cont = 1;
                foreach (var student in groupInfo["Students"])
                {

                    string[] GID = getGID(groupInfo);
                    int end = groupInfo["id"].ToString().Length;

                    conn.Open();
                    SqlCommand insertRequest = conn.CreateCommand();
                    insertRequest.CommandText = "EXEC sp_addWorkGroup @Student, @Number, @CID, @Year, @Period, @AName, @GroupNum";
                    insertRequest.Parameters.Add("@Student", SqlDbType.Int).Value = student;
                    insertRequest.Parameters.Add("@Number", SqlDbType.Int).Value = GID[3];
                    insertRequest.Parameters.Add("@CID", SqlDbType.VarChar, 50).Value = GID[2];
                    insertRequest.Parameters.Add("@Year", SqlDbType.VarChar, 4).Value = GID[0];
                    insertRequest.Parameters.Add("@Period", SqlDbType.VarChar, 1).Value = GID[1];
                    insertRequest.Parameters.Add("@AName", SqlDbType.VarChar, 50).Value = groupInfo["id"].ToString().Substring(16, end - 16);
                    insertRequest.Parameters.Add("@GroupNum", SqlDbType.Int).Value = cont;
                    insertRequest.ExecuteNonQuery();
                    conn.Close();

                    conn.Open();
                    insertRequest = conn.CreateCommand();
                    insertRequest.CommandText = "EXEC sp_studentAssignment @Number, @CID, @Year, @Period, @AName, @SID, @SGroup";
                    insertRequest.Parameters.Add("@Number", SqlDbType.Int).Value = GID[3];
                    insertRequest.Parameters.Add("@CID", SqlDbType.VarChar, 50).Value = GID[2];
                    insertRequest.Parameters.Add("@Year", SqlDbType.VarChar, 4).Value = GID[0];
                    insertRequest.Parameters.Add("@Period", SqlDbType.VarChar, 1).Value = GID[1];
                    insertRequest.Parameters.Add("@AName", SqlDbType.VarChar, 50).Value = groupInfo["id"].ToString().Substring(16, end - 16);
                    insertRequest.Parameters.Add("@SID", SqlDbType.Int).Value = student;
                    insertRequest.Parameters.Add("@SGroup", SqlDbType.Int).Value = cont;
                    insertRequest.ExecuteNonQuery();
                    conn.Close();

                    cont++;
                }

                return Ok("Asignación agregada");
            }
            catch
            {
                return BadRequest("Error al insertar");
            }
        }

        public string[] getGID(JObject groupInfo)
        {
            string[] info = {
                groupInfo["id"].ToString().Substring(0, 4), //year
                groupInfo["id"].ToString().Substring(5, 1), //period
                groupInfo["id"].ToString().Substring(7, 6), //cid
                groupInfo["id"].ToString().Substring(14, 1) //number
            };
            return info;
        }

        public string[] getNewsInfo(JObject newsInfo)
        {
            string[] info = {
                newsInfo["id"].ToString().Substring(0, 8), //id
                newsInfo["id"].ToString().Substring(9, 10), //date
                newsInfo["id"].ToString().Substring(20, 8) //time
        };
            return info;
        }


        [HttpPost]
        [Route("api/teacher/group/showGrades")]
        public IHttpActionResult showGrades([FromBody] JObject groupInfo)
        {

            string[] GID = getGID(groupInfo);
            int end = groupInfo["id"].ToString().Length;

            Debug.Print(GID[3].ToString());
            Debug.Print(GID[2].ToString());
            Debug.Print(GID[0].ToString());
            Debug.Print(GID[1].ToString());
            Debug.Print(groupInfo["id"].ToString().Substring(16, end - 16).ToString());
            Debug.Print(groupInfo["PDate"].ToString());
            Debug.Print(groupInfo["author"].ToString());
            Debug.Print(DateTime.Now.TimeOfDay.ToString().Substring(0,8));
            

            conn.Open();
            SqlCommand insertRequest = conn.CreateCommand();
            insertRequest.CommandText = "EXEC sp_showGrades @Number, @CID, @Year, @Period, @AName, @PDate, @PTime, @Author";
            insertRequest.Parameters.Add("@Number", SqlDbType.Int).Value = GID[3];
            insertRequest.Parameters.Add("@CID", SqlDbType.VarChar, 50).Value = GID[2];
            insertRequest.Parameters.Add("@Year", SqlDbType.VarChar, 4).Value = GID[0];
            insertRequest.Parameters.Add("@Period", SqlDbType.VarChar, 1).Value = GID[1];
            insertRequest.Parameters.Add("@AName", SqlDbType.VarChar, 50).Value = groupInfo["id"].ToString().Substring(16, end - 16);
            insertRequest.Parameters.Add("@PDate", SqlDbType.Date).Value = groupInfo["PDate"];
            insertRequest.Parameters.Add("@PTime", SqlDbType.Time).Value = DateTime.Now.TimeOfDay.ToString().Substring(0, 8); 
            insertRequest.Parameters.Add("@Author", SqlDbType.Int).Value = groupInfo["author"];
            insertRequest.ExecuteNonQuery();
            conn.Close();

            return Ok("Asignación agregada");
        }

    }
}
