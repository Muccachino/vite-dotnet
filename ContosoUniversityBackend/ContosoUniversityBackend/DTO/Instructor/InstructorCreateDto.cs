using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ContosoUniversityBackend.DTO.CourseAssignment;
using ContosoUniversityBackend.DTO.OfficeAssignment;

namespace ContosoUniversityBackend.DTO.Instructor;

public class InstructorCreateDto
{
    [Required]
    [StringLength(50)]
    [Display(Name = "Last Name")]
    public string LastName { get; set; }
    [Required]
    [StringLength(50, ErrorMessage = "First name cannot be longer than 50 characters.")]
    [Column("FirstName")]
    [Display(Name = "First Name")]
    public string FirstMidName { get; set; }
    
    [DataType(DataType.Date)]
    [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
    [Display(Name = "Hire Date")]
    public DateTime HireDate { get; set; }
    
    public List<int> CourseIds { get; set; }
    
    public OA_OfficeLocationOnlyDto? OfficeAssignment { get; set; }


}