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

        [HttpGet("{userId}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<OrderStatusDTO>>> Get(int userId)
        {
            return Ok(await _orderStatusDal.GetByUserId(userId));
        }

        [HttpPost("{userId}")]
        [Authorize]
        public async Task<IActionResult> Create(OrderStatusDTO orderStatus, int userId)
        {
            await _orderStatusDal.Create(orderStatus, userId);

            return Created();
        }
    }
}
