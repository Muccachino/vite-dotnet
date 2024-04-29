using AutoMapper;
using ContosoUniversityBackend.DTO.Enrollements;
using ContosoUniversityBackend.Models;

namespace ContosoUniversityBackend.MappingProfiles;

public class EnrollmentMappingProfile : Profile
{
    public EnrollmentMappingProfile()
    {
        CreateMap<Enrollment, EnrollmentDto>().ReverseMap();
        CreateMap<Enrollment, EnrollmentWithStudentDto>().ReverseMap();
        CreateMap<Enrollment, EnrollmentAmountOnlyDto>().ReverseMap();
    }
    
}