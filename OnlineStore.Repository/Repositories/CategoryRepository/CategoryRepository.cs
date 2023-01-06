using Microsoft.EntityFrameworkCore;
using OnlineStore.Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Repository.Repositories.CategoryRepository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly OnlineStoreDBContext _context;
        public CategoryRepository(OnlineStoreDBContext context)
        {
            _context = context;
        }

        public Category GetById(int id)
        {
            return _context.Categories.Find(id);
        }
        public IEnumerable<Category> GetAll()
        {
            return _context.Categories.ToList();
        }
        public void Add(Category category)
        {
            _context.Categories.Add(category);
            _context.SaveChanges();
        }
        public void Remove(Category category)
        {

            _context.Categories.Remove(category);
            _context.SaveChanges();
        }
        public void Update(Category category)
        {
            _context.Entry(category).State = EntityState.Modified;
            _context.SaveChanges();
        }
        public bool Exists(int id)
        {
            return _context.Categories.Any(b => b.CategoryId == id);
        }
    }
}
