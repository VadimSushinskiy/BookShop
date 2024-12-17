using BookShop.DAL.Interfaces;
using BookShop.Shared.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookShop.BLL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        public AuthorController(IAuthorDAL authorDal)
        {
            _authorDal = authorDal;
        }

        private readonly IAuthorDAL _authorDal;

        [HttpGet("{name}")]
        public async Task<ActionResult<AuthorDTO>> Get(string name)
        {
            AuthorDTO? author = await _authorDal.Get(name);

            if (author == null)
            {
                return NotFound();
            }
            
            return Ok(author);
        }

        [HttpPost]
        [Authorize(Roles = "Admin, Owner")]
        public async Task<IActionResult> Create(AuthorDTO author)
        {
            try
            {
                await _authorDal.Create(author);
                return Created();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{authorName}")]
        [Authorize(Roles = "Admin, Owner")]
        public async Task<IActionResult> Update(AuthorDTO author, string authorName)
        {
            await _authorDal.Update(authorName, author);

            return NoContent();
        }
    }
}
