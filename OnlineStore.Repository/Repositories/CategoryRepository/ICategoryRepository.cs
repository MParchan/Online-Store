using OnlineStore.Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Repository.Repositories.CategoryRepository
{
    public interface ICategoryRepository
    {
        public Category GetById(int id);
        public IEnumerable<Category> GetAll();
        public void Add(Category category);
        public void Remove(Category category);
        public void Update(Category category);
        public bool Exists(int id);
    }
}
