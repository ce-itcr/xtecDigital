using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEnd_xtecDigital.Models
{
    public class SemesterCourse
    {
        public string semester;
        public string[][] courses;

        public SemesterCourse(string semester, string[][] courses)
        {
            this.semester = semester;
            this.courses = courses;
        }
    }
}