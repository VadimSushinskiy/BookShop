using BookShop.Shared.DTO;

namespace BookShop.DAL.Interfaces
{
    public interface IAuthorDAL
    {
        Task<AuthorDTO?> Get(string name);

        Task Create(AuthorDTO author);

        Task Update(string name, AuthorDTO author);

        Task Delete(string name);
    }
}
