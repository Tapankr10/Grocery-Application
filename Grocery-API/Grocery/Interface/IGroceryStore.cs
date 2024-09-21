using Grocery.Model;

namespace Grocery.Interface
{
    public interface IGroceryStore
    {
        Task<IEnumerable<GroceryStore> >GetAllAsync();
        //  Task<Author> GetByIdAsync(int AuthorId);
        Task AddAsync(GroceryStore groceryStore);
        Task UpdateAsync(GroceryStore groceryStore);
        Task DeleteAsync(int StoreId);
        Task GetByIdAsync(GroceryStore groceryStore);
        Task<GroceryStore> GetArticleById(int id);
    }
}

