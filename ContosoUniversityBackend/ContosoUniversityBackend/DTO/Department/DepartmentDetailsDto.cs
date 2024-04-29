using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ContosoUniversityBackend.DTO.Course;
using ContosoUniversityBackend.DTO.Instructor;

namespace ContosoUniversityBackend.DTO.Department;

public class DepartmentDetailsDto
{
    public int DepartmentID { get; set; }

    [StringLength(50, MinimumLength = 3)]
    public string Name { get; set; }

    [DataType(DataType.Currency)]
    [Column(TypeName = "money")]
    public decimal Budget { get; set; }
    
    public InstructorNameOnlyDto Administrator { get; set; }
    
    public ICollection<CoursesStudentAmountDto> Courses { get; set; }
}