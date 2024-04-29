using System.ComponentModel.DataAnnotations;

namespace ContosoUniversityBackend.Models;

public class EnrollmentDateGroup
{
    [DataType(DataType.Date)]
    public DateTime? EnrollmentDate { get; set; }

    public int StudentCount { get; set; }
}