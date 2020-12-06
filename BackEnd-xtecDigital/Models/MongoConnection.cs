using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
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
            Debug.Print(json.ToString());
            Debug.Print(json["id"].ToString());
            Debug.Print(json["pass"].ToString());
            MongoClient dbClient = new MongoClient("mongodb+srv://admin:admin@cluster0.8aanu.mongodb.net/<dbname>?retryWrites=true&w=majority");
            var db = dbClient.GetDatabase("xtecDigital");
            var builder = Builders<BsonDocument>.Filter;
            var filter = builder.Eq("_id", json["id"]) & builder.Eq("Password", json["pass"]);
            var col = db.GetCollection<BsonDocument>("Students");
            var res = col.Find(new BsonDocument()).FirstOrDefault().ToJson();
            Debug.Print(res);
            return JObject.Parse(res);
        }

        public JObject getTeacherData(JObject json)
        {
            Debug.Print(json.ToString());
            Debug.Print(json["id"].ToString());
            Debug.Print(json["pass"].ToString());
            MongoClient dbClient = new MongoClient("mongodb+srv://admin:admin@cluster0.8aanu.mongodb.net/<dbname>?retryWrites=true&w=majority");
            var db = dbClient.GetDatabase("xtecDigital");
            var builder = Builders<BsonDocument>.Filter;
            var filter = builder.Eq("_id", json["id"]) & builder.Eq("Password", json["pass"]);
            var col = db.GetCollection<BsonDocument>("Teachers");
            var res = col.Find(new BsonDocument()).FirstOrDefault().ToJson();
            Debug.Print(res);
            return JObject.Parse(res);
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