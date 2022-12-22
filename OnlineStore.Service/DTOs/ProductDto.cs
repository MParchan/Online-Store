
namespace OnlineStore.Service.DTOs
{
    public class ProductDto
    {
        public int ProductId { get; set; }
        public int BrandId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Cost { get; set; }
        public BrandDto Brand { get; set; }
    }
}
