using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace BookShop.Shared.DTO
{
    public class BookDTO
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

        public List<ImageDTO> Images { get; set; } = new List<ImageDTO>();
    }
}
