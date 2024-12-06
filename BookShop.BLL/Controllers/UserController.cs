using BookShop.BLL.Models;
using BookShop.DAL.Interfaces;
using BookShop.Shared.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using BookShop.BLL.Tools;
using Microsoft.AspNetCore.Authorization;

namespace BookShop.BLL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public UserController(IUserDAL userDal, JwtProvider jwtProvider)
        {
            _userDal = userDal;
            _jwtProvider = jwtProvider;
        }

        private readonly IUserDAL _userDal;

        private readonly JwtProvider _jwtProvider;

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserDTO userDto)
        {
            userDto.Role = "User";
            try
            {
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
            UserDTO? user = await _userDal.Get(loginUser.Email, loginUser.Password);

            if (user == null)
            {
                return BadRequest();
            }

            string token = _jwtProvider.GenerateToken(user);

            HttpContext.Response.Cookies.Append("token", token);

            return Ok(new { name = user.Name, role = user.Role });
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
