using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Repository.Entities
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public string Status { get; set; }
        public DateTime Date { get;set; }
        public virtual ICollection<OrderProduct> Products { get; set; }
        public virtual User User { get; set; }
    }
}
