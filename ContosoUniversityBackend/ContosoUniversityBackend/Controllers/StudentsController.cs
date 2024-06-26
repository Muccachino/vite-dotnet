using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ContosoUniversityBackend.Data;
using ContosoUniversityBackend.DTO.Students;
using ContosoUniversityBackend.Models;

namespace ContosoUniversityBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public StudentsController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Students
        /// <summary>
        /// Gets a List of all Students with some nested objects
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetStudentsDto>>> GetStudents()
        {
            var students = await _context.Students
                .Include(x => x.Enrollments)
                    .ThenInclude(y => y.Course)
                .ToListAsync();
            
            return Ok(_mapper.Map<IEnumerable<GetStudentsDto>>(students));
        }

        // GET: api/Students/5
        /// <summary>
        /// Gets a single Student depending on given ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<GetSingleStudentDto>> GetStudent(int id)
        {
            var response = await _context.Students
                .Include(x => x.Enrollments)
                .ThenInclude(y => y.Course)
                .ToListAsync();
            Student student = null;
            foreach (var item in response)
            {
                if (item.ID == id)
                {
                    student = item;
                    
                }
            }
            

            if (student == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<GetStudentsDto>(student));
        }

        // PUT: api/Students/5
        /// <summary>
        /// Updates a specific Student in the database
        /// </summary>
        /// <param name="id"></param>
        /// <param name="student"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudent(int id, EditStudentDto student)
        {
            if (id != student.ID)
            {
                return BadRequest();
            }

            var studentDB = await _context.Students
                .Include(x => x.Enrollments)
                    .ThenInclude(x => x.Course)
                .FirstOrDefaultAsync(x => x.ID == student.ID);

            if (studentDB == null)
            {
                return NotFound();
            }
            _mapper.Map<EditStudentDto, Student>(student, studentDB);
            //_context.Entry(student).State = EntityState.Modified;
            _context.Students.Update(studentDB);
            
            try
            { 
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentExists(id))
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

        // POST: api/Students
        /// <summary>
        /// Creates a new Student and saves it to the database
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<Student>> PostStudent(CreateStudentDto dto)
        {
            var student = new Student();

            if (dto.CourseIds.Any())
            {
                var enrollments = new List<Enrollment>();
                foreach (var courseId in dto.CourseIds)
                {
                    enrollments.Add(new Enrollment{ Student = student, CourseID = courseId});
                }
                student.Enrollments = enrollments;
            }

            _mapper.Map<CreateStudentDto, Student>(dto, student);
            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudent", new { id = student.ID }, student);
        }

        // DELETE: api/Students/5
        /// <summary>
        /// Deletes a specific Student
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StudentExists(int id)
        {
            return _context.Students.Any(e => e.ID == id);
        }
    }
}
