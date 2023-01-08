using AutoMapper;
using OnlineStore.Repository.Entities;
using OnlineStore.Repository.Repositories.BrandRepository;
using OnlineStore.Repository.Repositories.OrderRepository;
using OnlineStore.Repository.Repositories.UserRepository;
using OnlineStore.Service.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Service.Services.TransactionService
{
    public class TransactionService : ITransactionService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public TransactionService(IOrderRepository orderRepository, IUserRepository userRepository, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public OrderDto GetOrderById(int id)
        {
            var results = _orderRepository.GetById(id);
            return _mapper.Map<OrderDto>(results);
        }
        public List<OrderDto> GetOrders()
        {
            var results = _orderRepository.GetAll().ToList();
            return _mapper.Map<List<OrderDto>>(results);
        }
        public List<OrderDto> GetUserOrders(string email)
        {   
            int id = _userRepository.GetIdByEmail(email);
            var results = _orderRepository.GetAll().Where(o => o.UserId == id);
            return _mapper.Map<List<OrderDto>>(results);
        }
        public void AddOrder(OrderDto order, List<OrderProductDto> orderProducts)
        {
            _orderRepository.Add(_mapper.Map<Order>(order), _mapper.Map<List<OrderProduct>>(orderProducts));
        }
        public void RemoveOrder(int id)
        {
            var results = _orderRepository.GetById(id);
            _orderRepository.Remove(_mapper.Map<Order>(results));
        }
        public void UpdateOrder(OrderDto order)
        {
            _orderRepository.Update(_mapper.Map<Order>(order));
        }
        public bool OrderExists(int id)
        {
            return _orderRepository.Exists(id);
        }
        public bool UserExists(string email)
        {
            return _userRepository.Exists(email);
        }
    }
}
