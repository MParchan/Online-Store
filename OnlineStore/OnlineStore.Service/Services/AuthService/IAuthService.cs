using OnlineStore.Service.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Service.Services.AuthService
{
    public interface IAuthService
    {
        public UserDto GetUserByEmail(string email);
        public UserDto GetUserById(int id);
        public UserDto UserRegistration(string email, string password, string passwordConfirm);
        public void SetRefreshTokenToUser(int userId, string token, DateTime created, DateTime expires);
    }
}
