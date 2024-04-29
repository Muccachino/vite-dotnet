using AutoMapper;
using ContosoUniversityBackend.DTO.Instructor;
using ContosoUniversityBackend.Models;

namespace ContosoUniversityBackend.MappingProfiles;

public class InstructorMappingProfile: Profile
{
    public InstructorMappingProfile()
    {
        CreateMap<Instructor, InstructorIndexDto>().ReverseMap();
        CreateMap<Instructor, InstructorDetailsDto>().ReverseMap();
        CreateMap<Instructor, InstructorNameOnlyDto>().ReverseMap();
    }
}