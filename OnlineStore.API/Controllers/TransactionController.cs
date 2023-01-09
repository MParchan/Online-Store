using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineStore.API.ViewModels;
using OnlineStore.Service.DTOs;
using OnlineStore.Service.Services.AuthService;
using OnlineStore.Service.Services.TransactionService;

namespace OnlineStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;
        private readonly IAuthService _authService;
        private readonly IMapper _mapper;

        public TransactionController(ITransactionService transactionService, IAuthService authService, IMapper mapper)
        {
            _transactionService = transactionService;
            _authService = authService;
            _mapper = mapper;
        }

        [HttpPost]
        public IActionResult Transaction(string email, List<OrderProductViewModel> orderProducts)
        {
            if(orderProducts == null)
            {
                return BadRequest("Error.");
            }
            if (!_transactionService.UserExists(email))
            {
                return BadRequest("User does not exist");
            }
            int userId = _authService.GetUserIdByEmail(email);
            OrderViewModel order = new()
            {
                UserId = userId,
                Status = "New",
                Date = DateTime.Now,
            };
            _transactionService.AddOrder(_mapper.Map<OrderDto>(order), _mapper.Map<List<OrderProductDto>>(orderProducts));
            return Ok("Thank you for your purchase! Check the order status in My orders.");
        }
        
        [HttpGet("UserOrders")]
        [Authorize]
        public ActionResult<IEnumerable<OrderViewModel>> GetUserOrders(string email)
        {
            if(!_transactionService.UserExists(email))
            {
                return BadRequest("User does not exist");
            }
            var results = _transactionService.GetUserOrders(email);
            return _mapper.Map<List<OrderViewModel>>(results);
        }

        [HttpGet("Orders")]
        [Authorize(Roles = "Admin")]
        public ActionResult<IEnumerable<OrderViewModel>> GetOrders()
        {
            var results = _transactionService.GetOrders();
            return _mapper.Map<List<OrderViewModel>>(results);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult PutOrder(int id, OrderViewModel order)
        {
            if (id != order.OrderId)
            {
                return BadRequest("Wrong order id.");
            }
            try
            {
                _transactionService.UpdateOrder(_mapper.Map<OrderDto>(order));
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_transactionService.OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }
    }
}
