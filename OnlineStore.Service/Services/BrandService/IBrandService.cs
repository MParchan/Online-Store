using OnlineStore.Service.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Service.Services.BrandService
{
    public interface IBrandService
    {
        public BrandDto GetBrandById(int id);
        public List<BrandDto> GetBrands();
        public void AddBrand(BrandDto brand);
        public void RemoveBrand(int id);
        public void UpdateBrand(BrandDto brand);
        public bool BrandExists(int id);
    }
}
