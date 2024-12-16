using BookShop.Shared.DTO;

namespace BookShop.DAL.Interfaces
{
    public interface IBookDAL
    {
        Task<BookDTO?> GetById(int id);

        Task<List<BookDTO>> GetWithFilterAndPagination(FilterDTO filter, int pageNumber, int pageSize);

        Task<List<int>> Create(BookDTO dto);

        Task<(List<int>, List<int>)> Update(BookDTO dto);

        Task<List<int>> Delete(int id);
    }
}
