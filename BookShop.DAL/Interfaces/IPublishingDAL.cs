using BookShop.Shared.DTO;

namespace BookShop.DAL.Interfaces
{
    public interface IPublishingDAL
    {
        public Task<PublishingDTO?> Get(string name);

        public Task Create(PublishingDTO publishing);

        public Task Update(string name, PublishingDTO publishing);
    }
}
