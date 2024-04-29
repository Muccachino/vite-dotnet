using AutoMapper;
using ContosoUniversityBackend.DTO.Students;
using ContosoUniversityBackend.Models;

namespace ContosoUniversityBackend.MappingProfiles;

public class StudentMappingProfile : Profile
{
    public StudentMappingProfile()
    {
        CreateMap<Student, GetStudentsDto>().ReverseMap();
        CreateMap<Student, GetSingleStudentDto>().ReverseMap();
        CreateMap<Student, EditStudentDto>().ReverseMap();
        CreateMap<Student, StudentNameOnlyDto>().ReverseMap();
    }
}