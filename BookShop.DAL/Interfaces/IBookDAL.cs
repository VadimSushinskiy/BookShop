using BookShop.Shared.DTO;

namespace BookShop.DAL.Interfaces
{
    public interface IBookDAL
    {
        Task<BookDTO?> GetById(int id);

        Task<IEnumerable<BookDTO>> GetWithFilterAndPagination(FilterDTO filter, int pageNumber, int pageSize);

        Task Create(BookDTO dto);

        Task Update(BookDTO dto);

        Task Delete(int id);
    }
}
