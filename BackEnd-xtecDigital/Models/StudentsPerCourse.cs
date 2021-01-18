using MongoDB.Bson;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEnd_xtecDigital.Models
{
    public class StudentsPerCourse
    {
        MongoConnection mongoConnection = new MongoConnection();
        public JObject getStudentsPerCourse(int[] students)
        {
            List<JObject> studentDocs = new List<JObject>();
            foreach (int studentID in students)
            {
                studentDocs.Add(mongoConnection.getReportStudentData(studentID));
            }
            JObject obj = new JObject();
            for (int i = 0; i < students.Length; i++)
            {
                JProperty property = new JProperty(students[i].ToString(), studentDocs[i]);
                obj.Add(property);
            }
            return obj;
        }
    }
}