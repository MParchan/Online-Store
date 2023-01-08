using OnlineStore.Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Repository.Repositories.OrderRepository
{
    public interface IOrderRepository
    {
        public Order GetById(int id);
        public IEnumerable<Order> GetAll();
        public void Add(Order order, List<OrderProduct> orderProducts);
        public void Remove(Order order);
        public void Update(Order order);
        public bool Exists(int id);
    }
}
