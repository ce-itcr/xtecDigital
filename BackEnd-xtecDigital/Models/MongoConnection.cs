using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Cryptography;
using System.Web;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace BackEnd_xtecDigital.Models
{
    public class MongoConnection
    {
        public JObject findAllStudents()
        {
            MongoClient dbClient = new MongoClient("mongodb+srv://admin:admin@cluster0.8aanu.mongodb.net/<dbname>?retryWrites=true&w=majority");

            var dbList = dbClient.ListDatabases().ToList();
            var db = dbClient.GetDatabase("xtecDigital");
            var col = db.GetCollection<BsonDocument>("Students").Find(new BsonDocument()).ToList();
            JObject obj = new JObject();
            Debug.Print(db.GetCollection<BsonDocument>("Students").Find(new BsonDocument()).ToList()[0].ToJson());
            int x = 1;
            foreach (BsonDocument doc in col)
            {
                JProperty property = new JProperty("Student" + x.ToString(), JObject.Parse(doc.ToJson()));
                obj.Add(property);
                x++;
            }
            return obj;
        }

        public JObject findAllTeachers()
        {
            MongoClient dbClient = new MongoClient("mongodb+srv://admin:admin@cluster0.8aanu.mongodb.net/<dbname>?retryWrites=true&w=majority");

            var dbList = dbClient.ListDatabases().ToList();
            var db = dbClient.GetDatabase("xtecDigital");
            var col = db.GetCollection<BsonDocument>("Teachers").Find(new BsonDocument()).ToList();
            JObject obj = new JObject();
            int x = 1;
            foreach (BsonDocument doc in col)
            {
                JProperty property = new JProperty("Teacher" + x.ToString(), JObject.Parse(doc.ToJson()));
                obj.Add(property);
                x++;
            }
            return obj;
        }

        public JObject getStudentData(JObject json)
        {
            try
            {
                MongoClient dbClient = new MongoClient("mongodb+srv://admin:admin@cluster0.8aanu.mongodb.net/<dbname>?retryWrites=true&w=majority");
                var db = dbClient.GetDatabase("xtecDigital");
                var builder = Builders<MongoStudent>.Filter;
                var filter1 = builder.Eq(u => u._id, json["id"]);
                var filter2 = builder.Eq(u => u.Password, MD5Encoding.MD5Encryption(json["pass"].ToString()));
                var fullFilter = builder.And(new[] { filter1, filter2 });
                var col = db.GetCollection<MongoStudent>("Students");
                var student = col.Find(fullFilter).FirstOrDefault().ToJson();
                return JObject.Parse(student);
            } catch
            {
                return JObject.Parse(new MongoStudent().ToJson());
            }
        }

        public JObject getTeacherData(JObject json)
        {
            try
            {
                MongoClient dbClient = new MongoClient("mongodb+srv://admin:admin@cluster0.8aanu.mongodb.net/<dbname>?retryWrites=true&w=majority");
                var db = dbClient.GetDatabase("xtecDigital");
                var builder = Builders<MongoTeacher>.Filter;
                var filter1 = builder.Eq(u => u._id, json["id"]);
                var filter2 = builder.Eq(u => u.Password, MD5Encoding.MD5Encryption(json["pass"].ToString()));
                var fullFilter = builder.And(new[] { filter1, filter2 });
                var col = db.GetCollection<MongoTeacher>("Teachers");
                var teacher = col.Find(fullFilter).FirstOrDefault().ToJson();
                return JObject.Parse(teacher);
            }
            catch
            {
                return JObject.Parse(new MongoTeacher().ToJson());
            }
        }

        public void insertStudent(JObject json)
        {
            MongoClient dbClient = new MongoClient("mongodb+srv://admin:admin@cluster0.8aanu.mongodb.net/<dbname>?retryWrites=true&w=majority");
            var db = dbClient.GetDatabase("xtecDigital");
            var col = db.GetCollection<BsonDocument>("Students");
            string encryptedPass = MD5Encoding.MD5Encryption(json["pass"].ToString());
            var doc = new BsonDocument
            {
                {"_id", (int)json["id"]},
                {"Name", json["name"].ToString()},
                {"Email", json["email"].ToString()},
                {"PhoneNumber", (int)json["phone"]},
                {"Password", encryptedPass}
            };
            col.InsertOne(doc);
        }

        public void insertTeacher(JObject json)
        {
            MongoClient dbClient = new MongoClient("mongodb+srv://admin:admin@cluster0.8aanu.mongodb.net/<dbname>?retryWrites=true&w=majority");
            var db = dbClient.GetDatabase("xtecDigital");
            var col = db.GetCollection<BsonDocument>("Teachers");
            string encryptedPass = MD5Encoding.MD5Encryption(json["pass"].ToString());
            var doc = new BsonDocument
            {
                {"_id", (int)json["id"]},
                {"Name", json["name"].ToString()},
                {"Email", json["email"].ToString()},
                {"Password", encryptedPass}
            };
            col.InsertOne(doc);
        }
    }
}