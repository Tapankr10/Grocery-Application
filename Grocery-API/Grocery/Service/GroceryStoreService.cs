using Grocery.Interface;
using Grocery.Model;

namespace Grocery.Service
{
    public class GroceryStoreService
    {
        private readonly IGroceryStore _groceryStore;

        public GroceryStoreService(IGroceryStore repo)
        {
            _groceryStore = repo;
        }
        public async Task<IEnumerable<GroceryStore>> GetAllGroceryStoreAsync()
        {
            return await _groceryStore.GetAllAsync();
        }

        public async Task<GroceryStore> GetGroceryStore(int id)
        {
            return await _groceryStore.GetArticleById(id);
        }

        public async Task AddGroceryStoreAsync(GroceryStore groceryStore)
        {
            await _groceryStore.AddAsync(groceryStore);
        }

        public async Task UpdateGroceryStoresync(GroceryStore groceryStore)
        {
            await _groceryStore.UpdateAsync(groceryStore);
        }

        public async Task DeleteAsync(int AuthorId)
        {
            await _groceryStore.DeleteAsync(AuthorId);
        }
    }
}

