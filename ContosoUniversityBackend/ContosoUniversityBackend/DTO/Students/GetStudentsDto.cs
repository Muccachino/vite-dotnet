using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ContosoUniversityBackend.DTO.Enrollements;
using ContosoUniversityBackend.Models;

namespace ContosoUniversityBackend.DTO.Students;

public class GetStudentsDto
{
    public int ID { get; set; }

    [Required]
    [StringLength(50)]
    [Display(Name = "Last Name")]
    public string LastName { get; set; }
    [Required]
    [StringLength(50, ErrorMessage = "First name cannot be longer than 50 characters.")]
    [Column("FirstName")]
    [Display(Name = "First Name")]
    public string FirstMidName { get; set; }

    [Display(Name = "Full Name")]
    public string FullName
    {
        get
        {
            return FirstMidName + " " + LastName;
        }
    }
    [DataType(DataType.Date)]
    [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
    [Display(Name = "Enrollment Date")]
    public DateTime EnrollmentDate { get; set; }


    public ICollection<EnrollmentDto>? Enrollments { get; set; }
}