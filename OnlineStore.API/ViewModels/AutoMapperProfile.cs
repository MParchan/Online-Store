using AutoMapper;
using OnlineStore.Repository.Entities;
using OnlineStore.Service.DTOs;

namespace OnlineStore.API.ViewModels
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Product, ProductDto>();
            CreateMap<ProductDto, Product>();
            CreateMap<ProductViewModel, ProductDto>();
            CreateMap<ProductDto, ProductViewModel>();

            CreateMap<Brand, BrandDto>();
            CreateMap<BrandDto, Brand>();
            CreateMap<BrandViewModel, BrandDto>();
            CreateMap<BrandDto, BrandViewModel>();

            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
            CreateMap<UserViewModel, UserDto>();
            CreateMap<UserDto, UserViewModel>();

            CreateMap<Category, CategoryDto>();
            CreateMap<CategoryDto, Category>();
            CreateMap<CategoryViewModel, CategoryDto>();
            CreateMap<CategoryDto, CategoryViewModel>();
        }
    }
}
