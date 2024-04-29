using System.ComponentModel.DataAnnotations;
using ContosoUniversityBackend.DTO.Students;
using ContosoUniversityBackend.Models;

namespace ContosoUniversityBackend.DTO.Enrollements;

public class EnrollmentWithStudentDto
{
    
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
    public StudentNameOnlyDto Student { get; set; }
    
}