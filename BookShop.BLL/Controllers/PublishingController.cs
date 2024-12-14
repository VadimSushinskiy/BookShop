﻿using BookShop.DAL.Interfaces;
using BookShop.Shared.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookShop.BLL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PublishingController : ControllerBase
    {
        public PublishingController(IPublishingDAL publishingDal)
        {
            _publishingDal = publishingDal;
        }

        private readonly IPublishingDAL _publishingDal;

        [HttpGet("{name}")]
        public async Task<ActionResult<PublishingDTO>> Get(string name)
        {
            PublishingDTO? publishing = await _publishingDal.Get(name);

            if (publishing == null)
            {
                return NotFound();
            }

            return Ok(publishing);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create(PublishingDTO publishing)
        {
            try
            {
                await _publishingDal.Create(publishing);
                return Created();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{publishingName}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(PublishingDTO publishing, string publishingName)
        {
            await _publishingDal.Update(publishingName, publishing);

            return NoContent();
        }
    }
}
