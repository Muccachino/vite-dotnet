using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ContosoUniversityBackend.Data;
using ContosoUniversityBackend.DTO.Department;
using ContosoUniversityBackend.Models;

namespace ContosoUniversityBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public DepartmentsController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Departments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DepartmentIndexDto>>> GetDepartments()
        {
            var departments = await _context.Departments
                .Include(x => x.Administrator)
                .Include(x => x.Courses)
                .OrderBy(x => x.Name)
                .ToListAsync();

            return Ok(_mapper.Map<IEnumerable<DepartmentIndexDto>>(departments));
        }

        // GET: api/Departments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DepartmentDetailsDto>> GetDepartment(int id)
        {
            var response = await _context.Departments
                .Include(x => x.Administrator)
                .Include(x => x.Courses )
                    .ThenInclude(y => y.Enrollments)
                .ToListAsync();
            
            
            Department department = null;
            foreach (var item in response)
            {
                if (item.DepartmentID == id)
                {
                    department = item;
                    
                }
            }

            if (department == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<DepartmentDetailsDto>(department));
        }

        // PUT: api/Departments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDepartment(int id, DepartmentEditDto department)
        {
            if (id != department.DepartmentID)
            {
                return BadRequest();
            }
            //_context.Entry(department).State = EntityState.Modified;

            var departmentDB = await _context.Departments.FirstOrDefaultAsync(x => x.DepartmentID == id);

            _mapper.Map<DepartmentEditDto, Department>(department, departmentDB);
            _context.Departments.Update(departmentDB);
            
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepartmentExists(id))
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

        // POST: api/Departments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Department>> PostDepartment(DepartmentCreateDto departmentDto)
        {
            var department = new Department();

            _mapper.Map<DepartmentCreateDto, Department>(departmentDto, department);
            _context.Departments.Add(department);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDepartment", new { id = department.DepartmentID }, department);
        }

        // DELETE: api/Departments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepartment(int id)
        {
            var department = await _context.Departments.FindAsync(id);
            if (department == null)
            {
                return NotFound();
            }

            _context.Departments.Remove(department);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DepartmentExists(int id)
        {
            return _context.Departments.Any(e => e.DepartmentID == id);
        }
    }
}
