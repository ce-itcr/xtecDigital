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
        public JObject findAll()
        {
            MongoClient dbClient = new MongoClient("mongodb+srv://admin:<SPyNGA7F>@cluster0.8aanu.mongodb.net/<xtecDigital>?retryWrites=true&w=majority");

            var dbList = dbClient.ListDatabases().ToList();
            var db = dbClient.GetDatabase("DBaaS_Taller");
            var col = db.GetCollection<BsonDocument>("Notas").Find(new BsonDocument()).ToList();
            JObject obj = new JObject();
            int x = 1;
            foreach (BsonDocument doc in col)
            {
                JProperty property = new JProperty("user" + x.ToString(), JObject.Parse(doc.ToJson()));
                obj.Add(property);
                x++;
            }
            return obj;
        }

        public JObject findWithFilter(string attribute, string value)
        {
            MongoClient dbClient = new MongoClient("mongodb+srv://admin:<SPyNGA7F>@cluster0.8aanu.mongodb.net/<xtecDigital>?retryWrites=true&w=majority");
            var db = dbClient.GetDatabase("DBaaS_Taller");
            var filter = Builders<BsonDocument>.Filter.Eq(attribute, value);
            var col = db.GetCollection<BsonDocument>("Notas");
            var res = col.Find(filter).FirstOrDefault().ToJson();
            Debug.Print(res);
            return JObject.Parse(res);
        }

        public void insertStudent(int id, string name, string email, int tel, string password)
        {
            MongoClient dbClient = new MongoClient("mongodb+srv://admin:admin@cluster0.8aanu.mongodb.net/<bname>?retryWrites=true&w=majority");
            var db = dbClient.GetDatabase("xtecDigital");
            var col = db.GetCollection<BsonDocument>("Students");
            string encryptedPass = MD5Encoding.MD5Encryption(password);
            var doc = new BsonDocument
            {
                {"Id", id},
                {"Name", name},
                {"Email", email},
                {"PhoneNumber", tel},
                {"Password", encryptedPass}
            };
            col.InsertOne(doc);
        }
    }
}