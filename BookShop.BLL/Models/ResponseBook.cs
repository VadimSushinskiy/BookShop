using System.ComponentModel.DataAnnotations;

namespace BookShop.BLL.Models
{
    public class ResponseBook
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
        public float Rating { get; set; }

        [Required]
        public int RatingNumber { get; set; }

        [Required]
        public string CoverType { get; set; }

        [Required]
        public int PublicationYear { get; set; }

        [Required]
        public string AuthorName { get; set; }

        [Required]
        public string PublishingName { get; set; }

        public string MainImageSrc { get; set; }

        public List<string> ImgFilesSrc { get; set; } = new List<string>();
    }
}
