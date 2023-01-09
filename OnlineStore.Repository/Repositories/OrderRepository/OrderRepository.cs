using Microsoft.EntityFrameworkCore;
using OnlineStore.Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Repository.Repositories.OrderRepository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly OnlineStoreDBContext _context;
        public OrderRepository(OnlineStoreDBContext context)
        {
            _context = context;
        }

        public Order GetById(int id)
        {
            return _context.Orders.Include(o => o.Products).ThenInclude(p => p.Product).Include(o => o.User).FirstOrDefault(o => o.OrderId == id);
        }
        public IEnumerable<Order> GetAll()
        {
            return _context.Orders.Include(o => o.Products).ThenInclude(p => p.Product).Include(o => o.User).ToList();
                
        }
        public void Add(Order order, List<OrderProduct> orderProducts)
        {
            _context.Orders.Add(order);
            _context.SaveChanges();
            int orderId = order.OrderId;
            foreach (var product in orderProducts)
            {
                product.OrderId = orderId;
                product.Product = _context.Products.Find(product.ProductId);
                _context.OrderProducts.Add(product);
                _context.SaveChanges();
            }
        }
        public void Remove(Order order)
        {

            _context.Orders.Remove(order);
            _context.SaveChanges();
        }
        public void Update(Order order)
        {
            _context.Entry(order).State = EntityState.Modified;
            _context.SaveChanges();
        }
        public bool Exists(int id)
        {
            return _context.Orders.Any(b => b.OrderId == id);
        }
    }
}
