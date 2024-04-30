using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ContosoUniversityBackend.Data;
using ContosoUniversityBackend.DTO.Instructor;
using ContosoUniversityBackend.Models;

namespace ContosoUniversityBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InstructorsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public InstructorsController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Instructors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InstructorIndexDto>>> GetInstructors()
        {
            var instructors = await _context.Instructors
                .Include(x => x.CourseAssignments)
                .ThenInclude(y => y.Course)
                .ThenInclude(z => z.Department)
                .Include(x => x.CourseAssignments)
                .ThenInclude(y => y.Course)
                .ThenInclude(z => z.Enrollments)
                .ThenInclude(a => a.Student)

                .Include(x => x.OfficeAssignment)
                .OrderBy(i => i.LastName)
                .ToListAsync();

            return Ok(_mapper.Map<IEnumerable<InstructorIndexDto>>(instructors));
        }

        // GET: api/Instructors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<InstructorDetailsDto>> GetInstructor(int id)
        {
            var response = await _context.Instructors
                .Include(x => x.CourseAssignments)
                    .ThenInclude(y => y.Course)
                        .ThenInclude(z => z.Enrollments)
                .Include(x => x.OfficeAssignment)
                .ToListAsync();
            
            Instructor instructor = null;
            foreach (var item in response)
            {
                if (item.ID == id)
                {
                    instructor = item;
                    
                }
            }

            if (instructor == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<InstructorDetailsDto>(instructor));
        }

        // PUT: api/Instructors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInstructor(int id, InstructorEditDto instructor)
        {
            if (id != instructor.ID)
            {
                return BadRequest();
            }
            //_context.Entry(instructor).State = EntityState.Modified;

            var instructorDB = await _context.Instructors
                .Include(x => x.CourseAssignments)
                    .ThenInclude(y => y.Course)
                .Include(x => x.OfficeAssignment)
                .FirstOrDefaultAsync(x => x.ID == id);

            if (instructorDB == null)
            {
                return NotFound();
            }
            
            if (instructor.CourseIds.Any())
            {
                var courseAssignemnts = new List<CourseAssignment>();
                foreach (var courseId in instructor.CourseIds)
                {
                    courseAssignemnts.Add(new CourseAssignment{Instructor = instructorDB, CourseID = courseId});
                }

                instructorDB.CourseAssignments = courseAssignemnts;
            }

            _mapper.Map<InstructorEditDto, Instructor>(instructor, instructorDB);
            _context.Instructors.Update(instructorDB);
            
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InstructorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Instructors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Instructor>> PostInstructor(InstructorCreateDto instructorDto)
        {
            var instructor = new Instructor();

            if (instructorDto.CourseIds.Any())
            {
                var courseAssignemnts = new List<CourseAssignment>();
                foreach (var courseId in instructorDto.CourseIds)
                {
                    courseAssignemnts.Add(new CourseAssignment{Instructor = instructor, CourseID = courseId});
                }

                instructor.CourseAssignments = courseAssignemnts;
            }

            _mapper.Map<InstructorCreateDto, Instructor>(instructorDto, instructor);
            _context.Instructors.Add(instructor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInstructor", new { id = instructor.ID }, instructor);
        }

        // DELETE: api/Instructors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInstructor(int id)
        {
            var instructor = await _context.Instructors.FindAsync(id);
            if (instructor == null)
            {
                return NotFound();
            }

            _context.Instructors.Remove(instructor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InstructorExists(int id)
        {
            return _context.Instructors.Any(e => e.ID == id);
        }
    }
}
