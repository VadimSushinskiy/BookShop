﻿namespace BookShop.BLL.Tools.Interfaces
{
    public interface IPasswordHasher
    {
        public string Generate(string password);

        public bool Verify(string password, string hashedPassword);
    }
}
