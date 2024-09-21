using Grocery.Interface;
using Grocery.Model;
using Microsoft.EntityFrameworkCore;

namespace Grocery.Repository
{
    public class GroceryStoreRepository:IGroceryStore
    {
        private readonly GroceryDbContext _context;


        public GroceryStoreRepository(GroceryDbContext context)
        {
            _context = context;
        }
        public async Task AddAsync(GroceryStore groceryStore)
        {
            await _context.GroceryStores.AddAsync(groceryStore);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int ArticleId)
        {
            var author = await _context.GroceryStores.FindAsync(ArticleId);
            if (author != null)
            {
                _context.GroceryStores.Remove(author);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<GroceryStore>> GetAllAsync()
        {
            return await _context.GroceryStores.ToListAsync() ?? throw new NullReferenceException();
        }

        //public async Task<Article> GetArticleById(int id)
        //{
        //    return await _context.Articles.FirstOrDefaultAsync(e => e.ArticleID == id) ?? throw new NullReferenceException();

        //}
        public async Task<GroceryStore> GetArticleById(int id)
        {
            var article = await _context.GroceryStores.FirstOrDefaultAsync(e => e.StoreId == id);

            if (article == null)
            {
                throw new KeyNotFoundException($"Article with ID {id} not found.");
            }

            return article;
        }


        public Task GetByIdAsync(GroceryStore groceryStore)
        {
            throw new NotImplementedException();
        }

        public async Task UpdateAsync(GroceryStore groceryStore)
        {
            var existingCourse = await _context.GroceryStores.FindAsync(groceryStore.StoreId);
            if (existingCourse == null)
            {
                throw new KeyNotFoundException("Course not found.");
            }

            _context.Entry(existingCourse).CurrentValues.SetValues(groceryStore);
            await _context.SaveChangesAsync();
        }

    }
}
