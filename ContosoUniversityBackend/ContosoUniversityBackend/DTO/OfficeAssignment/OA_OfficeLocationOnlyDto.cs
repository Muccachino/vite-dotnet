using System.ComponentModel.DataAnnotations;

namespace ContosoUniversityBackend.DTO.OfficeAssignment;

public class OA_OfficeLocationOnlyDto
{
    [StringLength(50)]
    [Display(Name = "Office Location")]
    public string Location { get; set; }
}