using BookShop.Shared.DTO;

namespace BookShop.BLL.Models
{
    public class ResponseCart
    {
        public string Id { get; set; }

        public decimal TotalPrice { get; set; }

        public List<ResponseOrder> Orders { get; set; }
    }
}
