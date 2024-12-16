namespace BookShop.BLL.Tools.Interfaces
{
    public interface IFileHelper
    {
        Task<string> GetPathByIdClient(int id);

        Task CreateFile(IFormFile file, int id);

        Task DeleteFiles(int id);
    }
}
