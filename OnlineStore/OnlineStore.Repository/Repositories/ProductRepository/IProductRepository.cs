using OnlineStore.Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Repository.Repositories.ProductRepository
{
    public interface IProductRepository
    {
        public Product GetById(int id);
        public IEnumerable<Product> GetAll();
        public void Add(Product product);
        public void Remove(Product product);
        public void Update(Product product);
        public bool Exists(int id);
    }
}
