using System.ComponentModel.DataAnnotations;

namespace BookShop.BLL.Models
{
    public class FormBook
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Range(1, 100000)]
        public decimal Price { get; set; }

        [Required]
        public string Genre { get; set; }

        [Range(1, 10000)]
        public int Volume { get; set; }

        [Required]
        public string Language { get; set; }

        [Required]
        public string AuthorName { get; set; }

        [Required]
        public string PublishingName { get; set; }

        
        public IFormFile? MainImage { get; set; }

        public List<IFormFile> ImgFiles { get; set; } = new List<IFormFile>();
    }
}
