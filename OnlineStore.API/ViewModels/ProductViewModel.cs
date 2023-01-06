
namespace OnlineStore.API.ViewModels
{
    public class ProductViewModel
    {
        public int ProductId { get; set; }
        public int BrandId { get; set; }
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Cost { get; set; }
        public virtual BrandViewModel Brand { get; set; }
        public virtual CategoryViewModel Category { get; set; }
    }
}
