using Microsoft.EntityFrameworkCore;
using OnlineStore.Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Repository.Repositories.ProductRepository
{
    public class ProductRepository : IProductRepository
    {
        private readonly OnlineStoreDBContext _context;
        public ProductRepository(OnlineStoreDBContext context)
        {
            _context = context;
        }

        public Product GetById(int id)
        {
            return _context.Products.Include(p => p.Brand).Include(p => p.Category).FirstOrDefault(p => p.ProductId == id);
        }
        public IEnumerable<Product> GetAll()
        {
            return _context.Products.Include(p => p.Brand).Include(p => p.Category).ToList();
        }
        public void Add(Product product)
        {
            _context.Products.Add(product);
            _context.SaveChanges();
        }
        public void Remove(Product product)
        {

            _context.Products.Remove(product);
            _context.SaveChanges();
        }
        public void Update(Product product)
        {
            _context.Entry(product).State = EntityState.Modified;
            _context.SaveChanges();
        }
        public bool Exists(int id)
        {
            return _context.Products.Any(p => p.ProductId == id);
        }
    }
}
