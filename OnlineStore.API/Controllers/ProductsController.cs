using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineStore.API.ViewModels;
using OnlineStore.Repository.Entities;
using OnlineStore.Service.DTOs;
using OnlineStore.Service.Services.BrandService;
using OnlineStore.Service.Services.CategoryService;
using OnlineStore.Service.Services.ProductService;

namespace OnlineStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IBrandService _brandService;
        private readonly ICategoryService _categoryService;
        private readonly IMapper _mapper;

        public ProductsController(IProductService productService, IBrandService brandService, ICategoryService categoryService, IMapper mapper)
        {
            _productService = productService;
            _brandService = brandService;
            _categoryService = categoryService;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<ProductViewModel>> GetProducts()
        {
            var results = _productService.GetProducts();
            return _mapper.Map<List<ProductViewModel>>(results);
        }

        [HttpGet("{id}")]
        public ActionResult<ProductViewModel> GetProduct(int id)
        {
            var product = _productService.GetProductById(id);

            if (product == null)
            {
                return NotFound();
            }

            return _mapper.Map<ProductViewModel>(product);
        }

        [HttpPut("{id}")]
        public IActionResult PutProduct(int id, ProductViewModel product)
        {
            if (id != product.ProductId)
            {
                return BadRequest("Wrong product id.");
            }
            if (!_brandService.BrandExists(product.BrandId))
            {
                return BadRequest("Category dont exist in db.");
            }
            if (!_categoryService.CategoryExists(product.CategoryId))
            {
                return BadRequest("Brand dont exist in db.");
            }
            try
            {
                _productService.UpdateProduct(_mapper.Map<ProductDto>(product));
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_productService.ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        [HttpPost]
        public ActionResult<ProductViewModel> PostProduct(ProductViewModel product)
        {
            if(!_brandService.BrandExists(product.BrandId))
            {
                return BadRequest("Brand dont exist in db.");
            }
            if (!_categoryService.CategoryExists(product.CategoryId))
            {
                return BadRequest("Category dont exist in db.");
            }
            _productService.AddProduct(_mapper.Map<ProductDto>(product));

            return CreatedAtAction("GetProduct", new { id = product.ProductId }, product);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var product = _productService.GetProductById(id);
            if (product == null)
            {
                return NotFound();
            }
            _productService.RemoveProduct(id);

            return NoContent();
        }
    }
}
