using AutoMapper;
using OnlineStore.Repository.Entities;
using OnlineStore.Service.DTOs;

namespace OnlineStore.API.ViewModels
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Product, ProductDto>().ReverseMap();
            CreateMap<ProductViewModel, ProductDto>().ReverseMap();

            CreateMap<Brand, BrandDto>().ReverseMap();
            CreateMap<BrandViewModel, BrandDto>().ReverseMap();

            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<UserViewModel, UserDto>().ReverseMap();

            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<CategoryViewModel, CategoryDto>().ReverseMap();

            CreateMap<Role, RoleDto>().ReverseMap();
            CreateMap<RoleViewModel, RoleDto>().ReverseMap();

            CreateMap<Order, OrderDto>().ReverseMap();
            CreateMap<OrderViewModel, OrderDto>().ReverseMap();

            CreateMap<OrderProduct, OrderProductDto>().ReverseMap();
            CreateMap<OrderProductViewModel, OrderProductDto>().ReverseMap();
        }
    }
}
