using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ContosoUniversityBackend.DTO.Department;
using ContosoUniversityBackend.DTO.Enrollements;

namespace ContosoUniversityBackend.DTO.Course;

public class CourseWithDepartmentNameStudentsDto
{
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    [Display(Name = "Number")]
    public int CourseID { get; set; }

    [StringLength(50, MinimumLength = 3)]
    public string Title { get; set; }
    
    public DepartmentTitleOnlyDto Department { get; set; }

    public ICollection<EnrollmentWithStudentDto> Enrollments { get; set; }
}