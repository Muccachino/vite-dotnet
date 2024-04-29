using AutoMapper;
using ContosoUniversityBackend.DTO.CourseAssignment;
using ContosoUniversityBackend.Models;

namespace ContosoUniversityBackend.MappingProfiles;

public class CourseAssignmentMappingProfile : Profile
{
    public CourseAssignmentMappingProfile()
    {
        CreateMap<CourseAssignment, CA_CoursesDepartmentStudentsDto>().ReverseMap();
        CreateMap<CourseAssignment, CA_CoursesOnlyDto>().ReverseMap();
    }
    
}