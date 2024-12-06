using BookShop.BLL.Tools;
using BookShop.DAL.Interfaces;
using BookShop.Shared.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BookShop.BLL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        public CartController(ICartDAL cartDal)
        {
            _cartDal = cartDal;
        }

        private readonly ICartDAL _cartDal;

        [HttpGet("{cartId}")]
        [Authorize]
        public async Task<ActionResult<CartDTO>> GetUser(string cartId)
        {
            Claim? claim = HttpContext.User.FindFirst(claim => claim.Type == "cartId");
            if (claim == null || claim.Value != cartId)
            {
                return BadRequest();
            }

            return Ok(await _cartDal.GetById(cartId));
        }

        [HttpGet("anon/{cartId}")]
        public async Task<ActionResult<CartDTO>> GetAnonUser(string cartId)
        {
            CartDTO? cart = await _cartDal.GetById(cartId);

            if (cart == null)
            {
                return NotFound();
            }

            return Ok(cart);
        }

        [HttpPost("anon")]
        public async Task<ActionResult<CartDTO>> CreateAnonUser()
        {
            CartDTO cart = await _cartDal.Create();

            return Ok(cart);
        }
    }
}
