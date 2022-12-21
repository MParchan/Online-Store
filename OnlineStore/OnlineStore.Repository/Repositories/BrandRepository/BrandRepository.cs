using Microsoft.EntityFrameworkCore;
using OnlineStore.Repository.Entities;
using OnlineStore.Repository.Repositories.ProductRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Repository.Repositories.BrandRepository
{
    public class BrandRepository : IBrandRepository
    {
        private readonly OnlineStoreDBContext _context;
        public BrandRepository(OnlineStoreDBContext context)
        {
            _context = context;
        }

        public Brand GetById(int id)
        {
            return _context.Brands.Find(id);
        }
        public IEnumerable<Brand> GetAll()
        {
            return _context.Brands.ToList();
        }
        public void Add(Brand brand)
        {
            _context.Brands.Add(brand);
            _context.SaveChanges();
        }
        public void Remove(Brand brand)
        {

            _context.Brands.Remove(brand);
            _context.SaveChanges();
        }
        public void Update(Brand brand)
        {
            _context.Entry(brand).State = EntityState.Modified;
            _context.SaveChanges();
        }
        public bool Exists(int id)
        {
            return _context.Brands.Any(b => b.BrandId == id);
        }
    }
}
