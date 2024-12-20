using BookShop.DAL.Interfaces;
using BookShop.Shared.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using System.Security.Claims;

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
        public async Task<ActionResult<ReviewDTO>> Get(int bookId, int pageNumber, int pageSize, int additionalSkip)
        {
            if (pageNumber <= 0 || pageSize <= 0)
            {
                return BadRequest();
            }

            return Ok(await _reviewDal.GetWithPagination(bookId, pageNumber, pageSize, additionalSkip));
        }

        [HttpPost("{bookId}")]
        [Authorize]
        public async Task<IActionResult> Create(ReviewDTO reviewDto, int bookId)
        {
            int userId;
            string userName;
            try
            {
                userId = int.Parse(HttpContext.User.FindFirst(claim => claim.Type == "userId")?.Value);
                userName = HttpContext.User.FindFirst(claim => claim.Type == ClaimsIdentity.DefaultNameClaimType).Value;
            }
            catch
            {
                return BadRequest();
            }
            reviewDto.WritingDate = DateTime.Today.ToString("dd MMMM yyyy", CultureInfo.CreateSpecificCulture("uk"));
            int id = await _reviewDal.Create(reviewDto, userId, bookId);

            reviewDto.UserName = userName;
            reviewDto.UserId = userId;
            reviewDto.Id = id;
            return Ok(reviewDto);
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Update(ReviewDTO reviewDto)
        {
            try
            {
                int userId = int.Parse(HttpContext.User.FindFirst(claim => claim.Type == "userId")?.Value);

                var review = await _reviewDal.Get((int)reviewDto.Id);

                if (review?.UserId == userId)
                {
                    await _reviewDal.Update(reviewDto);
                    return Ok();
                }
                else
                {
                    throw new Exception("You can't do it");
                }
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                int userId = int.Parse(HttpContext.User.FindFirst(claim => claim.Type == "userId")?.Value);
                string? role = HttpContext.User.FindFirst(claim => claim.Type == ClaimsIdentity.DefaultRoleClaimType)?.Value;
                var review = await _reviewDal.Get(id);

                if (review?.UserId == userId || role == "Admin" || role == "Owner")
                {
                    await _reviewDal.Delete(id);
                    return Ok();
                }
                else
                {
                    throw new Exception("You can't do it");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
