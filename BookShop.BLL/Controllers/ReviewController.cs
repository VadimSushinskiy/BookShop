﻿using BookShop.DAL.Interfaces;
using BookShop.Shared.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
            await _reviewDal.Create(reviewDto, userId, bookId);

            reviewDto.UserName = userName;
            return Ok(reviewDto);
        }
    }
}
