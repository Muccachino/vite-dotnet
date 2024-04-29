using System.ComponentModel.DataAnnotations;

namespace ContosoUniversityBackend.DTO.Department;

public class DepartmentTitleOnlyDto
{
    public int DepartmentID { get; set; }

    [StringLength(50, MinimumLength = 3)]
    public string Name { get; set; }
}