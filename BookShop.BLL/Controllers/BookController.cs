using BookShop.DAL.Interfaces;
using BookShop.Shared.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookShop.BLL.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookController : ControllerBase
    {
        public BookController(IBookDAL bookDal)
        {
            _bookDal = bookDal;
        }

        private readonly IBookDAL _bookDal;

        [HttpGet("{id}")]
        public async Task<ActionResult<BookDTO>> Get(int id)
        {
            BookDTO? result = await _bookDal.GetById(id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookDTO>>> Get([FromQuery]FilterDTO filter,  int pageNumber, int pageSize)
        {
            if (pageNumber <= 0 || pageSize <= 0)
            {
                return BadRequest();
            }
            return Ok(await _bookDal.GetWithFilterAndPagination(filter, pageNumber, pageSize));
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Create(BookDTO bookDto)
        {
            try
            {
                await _bookDal.Create(bookDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Created();
        }

        [HttpPut]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Update(BookDTO bookDto)
        {
            try
            {
                await _bookDal.Update(bookDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Delete(int id)
        {
            await _bookDal.Delete(id);

            return NoContent();
        }
    }
}
