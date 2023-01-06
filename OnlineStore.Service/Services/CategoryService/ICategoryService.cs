using OnlineStore.Service.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Service.Services.CategoryService
{
    public interface ICategoryService
    {
        public CategoryDto GetCategoryById(int id);
        public List<CategoryDto> GetCategories();
        public void AddCategory(CategoryDto category);
        public void RemoveCategory(int id);
        public void UpdateCategory(CategoryDto category);
        public bool CategoryExists(int id);
    }
}
