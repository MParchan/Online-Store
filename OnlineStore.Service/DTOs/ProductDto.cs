
namespace OnlineStore.Service.DTOs
{
    public class ProductDto
    {
        public int ProductId { get; set; }
        public int BrandId { get; set; }
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Cost { get; set; }
        public virtual BrandDto Brand { get; set; }
        public virtual CategoryDto Category { get; set; }
    }
}
