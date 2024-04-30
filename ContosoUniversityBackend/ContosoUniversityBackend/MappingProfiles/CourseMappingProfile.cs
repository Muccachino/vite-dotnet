using AutoMapper;
using ContosoUniversityBackend.DTO.Course;
using ContosoUniversityBackend.Models;

namespace ContosoUniversityBackend.MappingProfiles;

public class CourseMappingProfile : Profile
{
    public CourseMappingProfile()
    {
        CreateMap<Course, CourseDto>()
            .ReverseMap();        
        CreateMap<Course, CourseOnlyDto>()
            .ReverseMap();
        CreateMap<Course, GetSingleCourseDto>().ReverseMap();
        CreateMap<Course, CourseWithDepartmentNameStudentsDto>().ReverseMap();
        CreateMap<Course, CourseNameEnrollmentsDto>().ReverseMap();
        CreateMap<Course, CoursesStudentAmountDto>().ReverseMap();
        CreateMap<Course, CourseCreateDto>().ReverseMap();
        CreateMap<Course, CourseEditDto>().ReverseMap();
    }
}