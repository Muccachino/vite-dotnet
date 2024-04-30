using ContosoUniversityBackend.DTO.Course;

namespace ContosoUniversityBackend.DTO.CourseAssignment;

public class CA_CoursesOnlyDto
{
    public int CourseID { get; set; }

    public CourseNameEnrollmentsDto Course { get; set; }
}