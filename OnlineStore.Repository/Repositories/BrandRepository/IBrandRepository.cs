using OnlineStore.Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Repository.Repositories.BrandRepository
{
    public interface IBrandRepository
    {
        public Brand GetById(int id);
        public IEnumerable<Brand> GetAll();
        public void Add(Brand brand);
        public void Remove(Brand brand);
        public void Update(Brand brand);
        public bool Exists(int id);
    }
}
