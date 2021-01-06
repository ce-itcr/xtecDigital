using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEnd_xtecDigital.Models
{
    [BsonIgnoreExtraElements]
    public class MongoTeacher
    {
        [BsonId]
        public int _id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}