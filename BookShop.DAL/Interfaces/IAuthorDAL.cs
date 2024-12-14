using BookShop.Shared.DTO;

namespace BookShop.DAL.Interfaces
{
    public interface IAuthorDAL
    {
        public Task<AuthorDTO?> Get(string name);

        public Task Create(AuthorDTO author);

        public Task Update(string name, AuthorDTO author);
    }
}
