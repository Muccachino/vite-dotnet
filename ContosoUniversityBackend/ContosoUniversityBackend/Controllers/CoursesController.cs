using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ContosoUniversityBackend.Data;
using ContosoUniversityBackend.DTO.Course;
using ContosoUniversityBackend.Models;

namespace ContosoUniversityBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public CoursesController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Courses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CourseDto>>> GetCourses()
        {
            var courses = await _context.Courses
                .Include(x => x.Department)    
                .Include(x => x.Enrollments)
                .ThenInclude(x => x.Student)
                .OrderBy(x => x.Title)
                .ToListAsync();

            return Ok(_mapper.Map<IEnumerable<CourseDto>>(courses));
        }

        // GET: api/Courses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GetSingleCourseDto>> GetCourse(int id)
        {
            var response = await _context.Courses
                .Include(x => x.Department)
                .Include(x => x.Enrollments)
                    .ThenInclude(y => y.Student)
                .ToListAsync();
            
            Course course = null;
            foreach (var item in response)
            {
                if (item.CourseID == id)
                {
                    course = item;
                    
                }
            }

            if (course == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<GetSingleCourseDto>(course));
        }

        // PUT: api/Courses/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCourse(int id, CourseEditDto course)
        {
            if (id != course.CourseID)
            {
                return BadRequest();
            }

            var courseDB = await _context.Courses.FirstOrDefaultAsync(x => x.CourseID == id);

            _mapper.Map<CourseEditDto, Course>(course, courseDB!);
            _context.Courses.Update(courseDB!);
            //_context.Entry(course).State = EntityState.Modified;
            
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CourseExists(id))
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

        // POST: api/Courses
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Course>> PostCourse(CourseCreateDto courseDto)
        {

            var course = new Course();
            _mapper.Map<CourseCreateDto, Course>(courseDto, course);
            _context.Courses.Add(course);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CourseExists(course.CourseID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Courses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null)
            {
                return NotFound();
            }

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CourseExists(int id)
        {
            return _context.Courses.Any(e => e.CourseID == id);
        }
    }
}
