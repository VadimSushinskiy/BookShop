using BookShop.Shared.DTO;

namespace BookShop.DAL.Interfaces
{
    public interface IPublishingDAL
    {
        Task<PublishingDTO?> Get(string name);

        Task Create(PublishingDTO publishing);

        Task Update(string name, PublishingDTO publishing);

        Task Delete(string name);

        Task<List<ViewPublishingDTO>> GetStatistics(string name, int pageNumber, int pageSize);
    }
}
