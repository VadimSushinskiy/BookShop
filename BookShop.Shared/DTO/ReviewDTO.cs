using System.ComponentModel.DataAnnotations;

namespace BookShop.Shared.DTO
{
    public class ReviewDTO
    {
        public int? Id { get; set; }

        [Required]
        public string Text { get; set; }

        [Range(1, 5)]
        public int Rating { get; set; }

        public string? UserName { get; set; }

        public int? UserId { get; set; }

        public string? WritingDate { get; set; }
    }
}
