﻿namespace BookShop.DAL.Models.Entities
{
    public class OrderStatus
    {
        public int Id { get; set; }

        public decimal TotalPrice { get; set; }

        public string Status { get; set; } = null!;

        public DateTime CreatedDate { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public string DeliveryType { get; set; }

        public int? UserId { get; set; }

        public User? User { get; set; }
    }
}
