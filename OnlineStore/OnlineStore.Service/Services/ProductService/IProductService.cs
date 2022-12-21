using OnlineStore.Service.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Service.Services.ProductService
{
    public interface IProductService
    {
        public ProductDto GetProductById(int id);
        public List<ProductDto> GetProducts();
        public void AddProduct(ProductDto product);
        public void RemoveProduct(int id);
        public void UpdateProduct(ProductDto product);
        public bool ProductExists(int id);
    }
}
