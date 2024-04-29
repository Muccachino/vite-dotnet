using AutoMapper;
using ContosoUniversityBackend.DTO.OfficeAssignment;
using ContosoUniversityBackend.Models;

namespace ContosoUniversityBackend.MappingProfiles;

public class OfficeAssignmentMappingProfile: Profile
{
    public OfficeAssignmentMappingProfile()
    {
        CreateMap<OfficeAssignment, OA_OfficeLocationOnlyDto>().ReverseMap();
    }
}