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
        }
    }
}
