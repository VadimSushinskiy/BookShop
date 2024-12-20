using BookShop.BLL.Models;
using BookShop.DAL.Interfaces;
using BookShop.Shared.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using BookShop.BLL.Tools.Interfaces;
using System.Text.Json;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace BookShop.BLL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public UserController(IUserDAL userDal, IJwtProvider jwtProvider, IPasswordHasher passwordHasher, IConfiguration configuration)
        {
            _userDal = userDal;
            _jwtProvider = jwtProvider;
            _passwordHasher = passwordHasher;
            _configuration = configuration;
        }

        private readonly IUserDAL _userDal;

        private readonly IJwtProvider _jwtProvider;

        private readonly IPasswordHasher _passwordHasher;

        private readonly IConfiguration _configuration;

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserDTO userDto)
        {
            userDto.Role = "User";
            try
            {
                userDto.Password = _passwordHasher.Generate(userDto.Password);
                await _userDal.Create(userDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Created();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginUser loginUser)
        {
            UserDTO? user = await _userDal.Get(loginUser.Email);

            if (user == null || !_passwordHasher.Verify(loginUser.Password, user.Password))
            {
                return BadRequest();
            }

            string token = _jwtProvider.GenerateToken(user);
            var options = _configuration.GetSection("JwtOptions");

            HttpContext.Response.Cookies.Append("token", token, new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddHours(double.Parse(options["ExpiresHours"]!))
            });
            HttpContext.Response.Cookies.Append("userInfo", JsonSerializer.Serialize(new { name = user.Name, role = user.Role, cartId = user.CartId, id = user.Id }), new CookieOptions
            {
                HttpOnly = false,
                Expires = DateTime.UtcNow.AddHours(double.Parse(options["ExpiresHours"]!))
            });

            return Ok();
        }

        [HttpGet("logout")]
        [Authorize]
        public IActionResult Logout()
        {
            if (HttpContext.Request.Cookies["token"] != null)
            {
                HttpContext.Response.Cookies.Delete("token");
            }
            if (HttpContext.Request.Cookies["userInfo"] != null)
            {
                HttpContext.Response.Cookies.Delete("userInfo");
            }
            return Ok();
        }

        [HttpGet]
        [Authorize(Roles = "Owner")]
        public async Task<ActionResult<List<ViewUserDTO>>> GetAll(string? name, int pageNumber, int pageSize)
        {
            return await _userDal.GetALL(name, pageNumber, pageSize);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Owner")]
        public async Task<IActionResult> ChangeRole(int id, [FromQuery]string role)
        {
            await _userDal.ChangeRole(id, role);

            return Ok();
        }
    }
}
