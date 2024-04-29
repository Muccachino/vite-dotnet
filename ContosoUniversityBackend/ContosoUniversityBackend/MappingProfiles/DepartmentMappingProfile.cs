using AutoMapper;
using ContosoUniversityBackend.DTO.Department;
using ContosoUniversityBackend.Models;

namespace ContosoUniversityBackend.MappingProfiles;

public class DepartmentMappingProfile : Profile
{
    public DepartmentMappingProfile()
    {
        CreateMap<Department, DepartmentTitleOnlyDto>().ReverseMap();
        CreateMap<Department, DepartmentIndexDto>().ReverseMap();
        CreateMap<Department, DepartmentDetailsDto>().ReverseMap();
    }
}