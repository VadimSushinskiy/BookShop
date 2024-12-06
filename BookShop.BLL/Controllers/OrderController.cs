using BookShop.DAL.Interfaces;
using BookShop.Shared.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookShop.BLL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        public OrderController(IOrderDAL orderDal)
        {
            _orderDal = orderDal;
        }

        private readonly IOrderDAL _orderDal;

        [HttpPost("{cartId}")]
        public async Task<IActionResult> Create(OrderDTO order, string cartId)
        {
            await _orderDal.Create(order, cartId);

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _orderDal.Delete(id);

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ChangeCount(int id, int change)
        {
            await _orderDal.ChangeCount(id, change);

            return NoContent();
        }
    }
}
