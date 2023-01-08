using OnlineStore.Service.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Service.Services.TransactionService
{
    public interface ITransactionService
    {
        public OrderDto GetOrderById(int id);
        public List<OrderDto> GetOrders();
        public List<OrderDto> GetUserOrders(string email);
        public void AddOrder(OrderDto order, List<OrderProductDto> orderProducts);
        public void RemoveOrder(int id);
        public void UpdateOrder(OrderDto order);
        public bool OrderExists(int id);
        public bool UserExists(string email);
    }
}
