namespace BookShop.DAL.Interfaces
{
    public interface IOrderStatusDAL
    {
        IEnumerable<IOrderStatusDAL> GetByUserId(int userId);
    }
}
