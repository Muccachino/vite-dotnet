﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ContosoUniversityBackend.DTO.Instructor;

public class InstructorNameOnlyDto
{
    [Required]
    [StringLength(50)]
    [Display(Name = "Last Name")]
    public string LastName { get; set; }
    [Required]
    [StringLength(50, ErrorMessage = "First name cannot be longer than 50 characters.")]
    [Column("FirstName")]
    [Display(Name = "First Name")]
    public string FirstMidName { get; set; }

    [Display(Name = "Full Name")]
    public string FullName
    {
        get
        {
            return FirstMidName + " " + LastName;
        }
    }
}