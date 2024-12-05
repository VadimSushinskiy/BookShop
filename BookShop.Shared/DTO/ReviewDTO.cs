using System.ComponentModel.DataAnnotations;

namespace BookShop.Shared.DTO
{
    public class ReviewDTO
    {
        [Required]
        public string Text { get; set; }

        [Range(1, 5)]
        public int Rating { get; set; }

        public string? UserName { get; set; }
    }
}
