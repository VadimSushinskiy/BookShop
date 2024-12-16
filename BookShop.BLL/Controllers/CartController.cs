using BookShop.BLL.Models;
using BookShop.BLL.Tools;
using BookShop.BLL.Tools.Implementations;
using BookShop.BLL.Tools.Interfaces;
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
        public CartController(ICartDAL cartDal, IFileHelper fileHelper)
        {
            _cartDal = cartDal;
            _fileHelper = fileHelper;
        }

        private readonly ICartDAL _cartDal;

        private readonly IFileHelper _fileHelper;

        [HttpGet("{cartId}")]
        [Authorize]
        public async Task<ActionResult<ResponseCart>> GetUser(string cartId)
        {
            Claim? claim = HttpContext.User.FindFirst(claim => claim.Type == "cartId");
            if (claim == null || claim.Value != cartId)
            {
                return BadRequest();
            }

            CartDTO? cart = await _cartDal.GetById(cartId);

            ResponseCart response = cart.MapFromDto();

            foreach (ResponseOrder order in response.Orders)
            {
                order.ImgSrc = await _fileHelper.GetPathByIdClient(order.Book.Images[0].Id);
            }

            return Ok(response);
        }

        [HttpGet("anon/{cartId}")]
        public async Task<ActionResult<ResponseCart>> GetAnonUser(string cartId)
        {
            CartDTO? cart = await _cartDal.GetById(cartId);

            if (cart == null)
            {
                return NotFound();
            }

            ResponseCart response = cart.MapFromDto();

            foreach (ResponseOrder order in response.Orders)
            {
                order.ImgSrc = await _fileHelper.GetPathByIdClient(order.Book.Images[0].Id);
            }

            return Ok(response);
        }

        [HttpPost("anon")]
        public async Task<ActionResult<CartDTO>> CreateAnonUser()
        {
            CartDTO cart = await _cartDal.Create();

            return Ok(cart);
        }
    }
}
