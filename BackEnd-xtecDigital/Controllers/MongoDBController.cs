using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace BackEnd_xtecDigital.Controllers
{
    [EnableCors(origins: "http://localhost:4200/", headers: "*", methods: "*")]
    public class MongoDBController : ApiController
    {

        [HttpPost]
        [Route("api/MongoTest")]
        public IHttpActionResult mongoTest([FromBody] JObject users)
        {
            Console.WriteLine(7);
            Models.MongoConnection mongo = new Models.MongoConnection();
            Console.WriteLine(6);
            Console.WriteLine(8);
            //return Ok(testMongo.findWithFilter("Nombre", "agustin"));
            //return Ok(testMongo.findAll());
            //testMongo.insertStudent(2018209698, "Ivan", "ivan@gmail.com", 88888888, "pass");
            return Ok();
        }
    }
}
