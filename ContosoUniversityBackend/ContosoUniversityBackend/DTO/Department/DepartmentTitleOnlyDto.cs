using System.ComponentModel.DataAnnotations;

namespace ContosoUniversityBackend.DTO.Department;

public class DepartmentTitleOnlyDto
{

    [StringLength(50, MinimumLength = 3)]
    public string Name { get; set; }
}