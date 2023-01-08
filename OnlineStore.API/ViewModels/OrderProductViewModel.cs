
namespace OnlineStore.API.ViewModels
{
    public class OrderProductViewModel
    {
        public int OrderProductId { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int Count { get; set; }
        public virtual ProductViewModel Product { get; set; }
    }
}
