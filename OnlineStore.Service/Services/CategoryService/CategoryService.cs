using AutoMapper;
using OnlineStore.Repository.Entities;
using OnlineStore.Repository.Repositories.CategoryRepository;
using OnlineStore.Service.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Service.Services.CategoryService
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;
        public CategoryService(ICategoryRepository categoeyRepository, IMapper mapper)
        {
            _categoryRepository = categoeyRepository;
            _mapper = mapper;
        }

        public CategoryDto GetCategoryById(int id)
        {
            var results = _categoryRepository.GetById(id);
            return _mapper.Map<CategoryDto>(results);
        }
        public List<CategoryDto> GetCategories()
        {
            var results = _categoryRepository.GetAll().ToList();
            return _mapper.Map<List<CategoryDto>>(results);
        }
        public void AddCategory(CategoryDto category)
        {
            _categoryRepository.Add(_mapper.Map<Category>(category));
        }
        public void RemoveCategory(int id)
        {
            var results = _categoryRepository.GetById(id);
            _categoryRepository.Remove(_mapper.Map<Category>(results));
        }
        public void UpdateCategory(CategoryDto category)
        {
            _categoryRepository.Update(_mapper.Map<Category>(category));
        }
        public bool CategoryExists(int id)
        {
            return _categoryRepository.Exists(id);
        }
    }
}
