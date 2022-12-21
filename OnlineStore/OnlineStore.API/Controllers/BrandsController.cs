using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineStore.API.ViewModels;
using OnlineStore.Service.DTOs;
using OnlineStore.Service.Services.BrandService;
using OnlineStore.Service.Services.ProductService;

namespace OnlineStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandsController : ControllerBase
    {
        private readonly IBrandService _brandService;
        private readonly IMapper _mapper;

        public BrandsController(IBrandService brandService, IMapper mapper)
        {
            _brandService = brandService;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<BrandViewModel>> GetBrands()
        {
            var results = _brandService.GetBrands();
            return _mapper.Map<List<BrandViewModel>>(results);
        }

        [HttpGet("{id}")]
        public ActionResult<BrandViewModel> GetBrand(int id)
        {
            var brand = _brandService.GetBrandById(id);

            if (brand == null)
            {
                return NotFound();
            }

            return _mapper.Map<BrandViewModel>(brand);
        }

        [HttpPut("{id}")]
        public IActionResult PutBrand(int id, BrandViewModel brand)
        {
            if (id != brand.BrandId)
            {
                return BadRequest("Wrong brand id.");
            }
            try
            {
                _brandService.UpdateBrand(_mapper.Map<BrandDto>(brand));
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_brandService.BrandExists(id))
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
        public ActionResult<ProductViewModel> PostBrand(BrandViewModel brand)
        {
            _brandService.AddBrand(_mapper.Map<BrandDto>(brand));

            return CreatedAtAction("GetBrand", new { id = brand.BrandId }, brand);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteBrand(int id)
        {
            var brand = _brandService.GetBrandById(id);
            if (brand == null)
            {
                return NotFound();
            }
            _brandService.RemoveBrand(id);

            return NoContent();
        }
    }
}
