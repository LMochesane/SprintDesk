using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SprintDesk.Api.Data;
using SprintDesk.Api.Models;

namespace SprintDesk.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == loginDto.Email && u.PasswordHash == loginDto.Password);

            if (user == null)
            {
                return Unauthorized(new { message = "Invalid email or password." });
            }

            return Ok(new
            {
                message = "Login successful",
                username = user.Username,
                email = user.Email,
                role = user.Role
            });
        }

        // Helper endpoint to quickly create a user or seed demo accounts
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User newUser)
        {
            var exists = await _context.Users.AnyAsync(u => u.Email == newUser.Email);
            if (exists)
            {
                return BadRequest(new { message = "Email already registered." });
            }

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User created successfully!", username = newUser.Username, role = newUser.Role });
        }
    }

    public class LoginDto
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}