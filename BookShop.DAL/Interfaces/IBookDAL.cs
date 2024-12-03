using BookShop.Shared.DTO;

namespace BookShop.DAL.Interfaces
{
    public interface IBookDAL
    {
        BookDTO? GetById(int id);

        BookDTO? GetByName(string name);

        IEnumerable<BookDTO> GetWithFilterAndPagination(FilterDTO filter, int pageNumber, int pageSize);
    }
}
