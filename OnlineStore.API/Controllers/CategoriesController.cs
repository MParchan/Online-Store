using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineStore.API.ViewModels;
using OnlineStore.Service.DTOs;
using OnlineStore.Service.Services.CategoryService;

namespace OnlineStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly IMapper _mapper;

        public CategoriesController(ICategoryService categoryService, IMapper mapper)
        {
            _categoryService = categoryService;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<CategoryViewModel>> GetCategories()
        {
            var results = _categoryService.GetCategories();
            return _mapper.Map<List<CategoryViewModel>>(results);
        }

        [HttpGet("{id}")]
        public ActionResult<CategoryViewModel> GetCategory(int id)
        {
            var category = _categoryService.GetCategoryById(id);

            if (category == null)
            {
                return NotFound();
            }

            return _mapper.Map<CategoryViewModel>(category);
        }

        [HttpPut("{id}")]
        public IActionResult PutCategory(int id, CategoryViewModel category)
        {
            if (id != category.CategoryId)
            {
                return BadRequest("Wrong category id.");
            }
            try
            {
                _categoryService.UpdateCategory(_mapper.Map<CategoryDto>(category));
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_categoryService.CategoryExists(id))
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
        public ActionResult<ProductViewModel> PostCategory(CategoryViewModel category)
        {
            _categoryService.AddCategory(_mapper.Map<CategoryDto>(category));

            return CreatedAtAction("GetCategory", new { id = category.CategoryId }, category);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCategory(int id)
        {
            var category = _categoryService.GetCategoryById(id);
            if (category == null)
            {
                return NotFound();
            }
            _categoryService.RemoveCategory(id);

            return NoContent();
        }
    }
}
