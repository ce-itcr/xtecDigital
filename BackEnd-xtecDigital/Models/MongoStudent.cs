using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEnd_xtecDigital.Models
{
    [BsonIgnoreExtraElements]
    public class MongoStudent
    {
        [BsonId]
        public int _id { get; set; }
        public string FName { get; set; } 
        public string LName1 { get; set; }
        public string LName2 { get; set; }
        public string Email { get; set; }
        public int PhoneNumber { get; set; }
        public string Password { get; set; }


    }
}