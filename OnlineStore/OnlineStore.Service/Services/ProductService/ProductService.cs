using AutoMapper;
using OnlineStore.Repository.Entities;
using OnlineStore.Repository.Repositories.ProductRepository;
using OnlineStore.Service.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Service.Services.ProductService
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        public ProductService(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public ProductDto GetProductById(int id)
        {
            var results = _productRepository.GetById(id);
            return _mapper.Map<ProductDto>(results);
        }
        public List<ProductDto> GetProducts()
        {
            var results = _productRepository.GetAll().ToList();
            return _mapper.Map<List<ProductDto>>(results);
        }
        public void AddProduct(ProductDto product)
        {
            _productRepository.Add(_mapper.Map<Product>(product));
        }
        public void RemoveProduct(int id)
        {
            var results = _productRepository.GetById(id);
            _productRepository.Remove(_mapper.Map<Product>(results));
        }
        public void UpdateProduct(ProductDto product)
        {
            _productRepository.Update(_mapper.Map<Product>(product));
        }
        public bool ProductExists(int id)
        {
            return _productRepository.Exists(id);
        }
    }
}
