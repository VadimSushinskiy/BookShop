using BookShop.DAL.Interfaces;
using BookShop.Shared.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookShop.BLL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        public ReviewController(IReviewDAL reviewDal)
        {
            _reviewDal = reviewDal;
        }

        private readonly IReviewDAL _reviewDal;

        [HttpGet("{bookId}")]
        public async Task<ActionResult<ReviewDTO>> Get(int bookId, int pageNumber, int pageSize)
        {
            if (pageNumber <= 0 || pageSize <= 0)
            {
                return BadRequest();
            }

            return Ok(await _reviewDal.GetWithPagination(bookId, pageNumber, pageSize));
        }

        [HttpPost("{bookId}")]
        public async Task<IActionResult> Create(ReviewDTO reviewDto, int userId, int bookId)
        {
            await _reviewDal.Create(reviewDto, userId, bookId);
            return Created();
        }
    }
}
