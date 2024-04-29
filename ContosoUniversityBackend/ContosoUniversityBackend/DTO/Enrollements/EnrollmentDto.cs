﻿using System.ComponentModel.DataAnnotations;
using ContosoUniversityBackend.DTO.Course;
using ContosoUniversityBackend.Models;

namespace ContosoUniversityBackend.DTO.Enrollements;

public class EnrollmentDto
{
    public int EnrollmentID { get; set; }
    public int CourseID { get; set; }
    public int StudentID { get; set; }

    public string GradeString
    {
        get
        {
            string result = Grade switch
            {
                Models.Grade.A => "A",
                Models.Grade.B => "B",
                Models.Grade.C => "C",
                Models.Grade.D => "D",
                Models.Grade.F => "F",
                _ => "No Grade"
            };

            return result;
        }
    } 

    [DisplayFormat(NullDisplayText = "No grade")]
    public Grade? Grade { get; set; }
        
    public CourseOnlyDto Course { get; set; }
}