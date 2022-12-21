using AutoMapper;
using OnlineStore.Repository.Entities;
using OnlineStore.Repository.Repositories.UserRepository;
using OnlineStore.Service.DTOs;
using System.Security.Cryptography;
using System.Text;

namespace OnlineStore.Service.Services.AuthService
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public AuthService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public UserDto GetUserByEmail(string email)
        {
            var user = _userRepository.GetByEmail(email);
            return _mapper.Map<UserDto>(user);
        }

        public UserDto GetUserById(int id)
        {
            var user = _userRepository.GetById(id);
            return _mapper.Map<UserDto>(user);
        }

        public UserDto UserRegistration(string email, string password, string passwordConfirm)
        {
            CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);
            var user = new UserDto();
            user.Email = email;
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            _userRepository.Add(_mapper.Map<User>(user));
            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }

        public void SetRefreshTokenToUser(int userId, string token, DateTime created, DateTime expires)
        {
            var user = _userRepository.GetById(userId);
            user.RefreshToken = token;
            user.TokenCreated = created;
            user.TokenExpires = expires;
            _userRepository.Update(_mapper.Map<User>(user));
        }

       
    }
}
