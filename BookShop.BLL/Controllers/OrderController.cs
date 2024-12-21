using BookShop.DAL.Interfaces;
using BookShop.DAL.Models;
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
            try
            {
                await _orderDal.Create(order, cartId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

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
            try
            {
                await _orderDal.ChangeCount(id, change);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return NoContent();
        }
    }
}
