using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Service.DTOs
{
    public class OrderDto
    {
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public string Status { get; set; }
        public DateTime Date { get; set; }
        public virtual ICollection<OrderProductDto> Products { get; set; }
        public virtual UserDto User { get; set; }
    }
}
