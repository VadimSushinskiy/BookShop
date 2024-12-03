using BookShop.Shared.DTO;

namespace BookShop.DAL.Interfaces
{
    public interface IReviewDAL
    {
        IEnumerable<ReviewDTO> GetWithPagination(int pageNumber, int pageSize);
    }
}
