using AutoMapper;
using OnlineStore.Repository.Entities;
using OnlineStore.Repository.Repositories.BrandRepository;
using OnlineStore.Repository.Repositories.ProductRepository;
using OnlineStore.Service.DTOs;
using OnlineStore.Service.Services.ProductService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Service.Services.BrandService
{
    public class BrandService : IBrandService
    {
        private readonly IBrandRepository _brandRepository;
        private readonly IMapper _mapper;
        public BrandService(IBrandRepository brandRepository, IMapper mapper)
        {
            _brandRepository = brandRepository;
            _mapper = mapper;
        }

        public BrandDto GetBrandById(int id)
        {
            var results = _brandRepository.GetById(id);
            return _mapper.Map<BrandDto>(results);
        }
        public List<BrandDto> GetBrands()
        {
            var results = _brandRepository.GetAll().ToList();
            return _mapper.Map<List<BrandDto>>(results);
        }
        public void AddBrand(BrandDto brand)
        {
            _brandRepository.Add(_mapper.Map<Brand>(brand));
        }
        public void RemoveBrand(int id)
        {
            var results = _brandRepository.GetById(id);
            _brandRepository.Remove(_mapper.Map<Brand>(results));
        }
        public void UpdateBrand(BrandDto brand)
        {
            _brandRepository.Update(_mapper.Map<Brand>(brand));
        }
        public bool BrandExists(int id)
        {
            return _brandRepository.Exists(id);
        }
    }
}
