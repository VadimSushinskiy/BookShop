using BookShop.Shared.DTO;

namespace BookShop.DAL.Interfaces
{
    public interface IReviewDAL
    {
        Task<ReviewDTO?> Get(int id);

        Task<IEnumerable<ReviewDTO>> GetWithPagination(int bookId, int pageNumber, int pageSize, int additionalSkip);

        Task<int> Create(ReviewDTO review, int userId, int bookId);

        Task Update(ReviewDTO review);

        Task Delete(int id);
    }
}
