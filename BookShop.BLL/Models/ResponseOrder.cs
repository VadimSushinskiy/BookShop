using BookShop.Shared.DTO;

namespace BookShop.BLL.Models
{
    public class ResponseOrder
    {
        public int? Id { get; set; }

        public int Count { get; set; }

        public BookDTO Book { get; set; }

        public string ImgSrc { get; set; }
    }
}
