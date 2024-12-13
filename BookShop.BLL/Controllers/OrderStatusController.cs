using BookShop.DAL.Interfaces;
using BookShop.Shared.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookShop.BLL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderStatusController : ControllerBase
    {
        public OrderStatusController(IOrderStatusDAL orderStatusDal)
        {
            _orderStatusDal = orderStatusDal;
        }

        private readonly IOrderStatusDAL _orderStatusDal;

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<OrderStatusDTO>>> Get()
        {
            int userId = int.Parse(HttpContext.User.FindFirst(claim => claim.Type == "userId").Value);
            return Ok(await _orderStatusDal.GetByUserId(userId));
        }

        [HttpPost("{cartId}")]
        public async Task<IActionResult> Create(OrderStatusDTO orderStatus, string cartId)
        {
            var claim = HttpContext.User.FindFirst(claim => claim.Type == "userId");
            int? userId = claim != null ? int.Parse(claim.Value) : null;
            await _orderStatusDal.Create(orderStatus, userId, cartId);
            return Created();
        }
    }
}
