
namespace OnlineStore.API.ViewModels
{
    public class OrderViewModel
    {
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public string Status { get; set; }
        public DateTime Date { get; set; }
        public virtual ICollection<OrderProductViewModel> Products { get; set; }
        public virtual UserViewModel User { get; set; }
    }
}
