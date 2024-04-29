using System.ComponentModel.DataAnnotations;
using ContosoUniversityBackend.DTO.Enrollements;

namespace ContosoUniversityBackend.DTO.Course;

public class CoursesStudentAmountDto
{
    [Display(Name = "Number")]
    public int CourseID { get; set; }

    [StringLength(50, MinimumLength = 3)]
    public string Title { get; set; }

    [Range(0, 5)]
    public int Credits { get; set; }
    public ICollection<EnrollmentAmountOnlyDto> Enrollments { get; set; }

}