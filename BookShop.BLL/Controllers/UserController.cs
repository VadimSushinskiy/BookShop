using BookShop.BLL.Models;
using BookShop.DAL.Interfaces;
using BookShop.Shared.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using BookShop.BLL.Tools.Interfaces;

namespace BookShop.BLL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public UserController(IUserDAL userDal, IJwtProvider jwtProvider, IPasswordHasher passwordHasher)
        {
            _userDal = userDal;
            _jwtProvider = jwtProvider;
            _passwordHasher = passwordHasher;
        }

        private readonly IUserDAL _userDal;

        private readonly IJwtProvider _jwtProvider;

        private readonly IPasswordHasher _passwordHasher;

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

            HttpContext.Response.Cookies.Append("token", token);

            return Ok(new { name = user.Name, role = user.Role, cartId = user.CartId });
        }

        [HttpGet("logout")]
        [Authorize]
        public IActionResult Logout()
        {
            if (HttpContext.Request.Cookies["token"] != null)
            {
                HttpContext.Response.Cookies.Delete("token");
            }
            return Ok();
        }
    }
}
