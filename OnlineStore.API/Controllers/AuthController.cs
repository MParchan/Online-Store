using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Win32;
using OnlineStore.API.ViewModels;
using OnlineStore.Repository.Entities;
using OnlineStore.Service.Services.AuthService;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace OnlineStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IAuthService _authService;
        private readonly IMapper _mapper;
        public AuthController(IConfiguration configuration, IAuthService authService, IMapper mapper)
        {
            _configuration = configuration;
            _authService = authService;
            _mapper = mapper;
        }

        [HttpPost("Register")]
        public ActionResult<User> Register(RegisterViewModel register)
        {
            var user = _authService.GetUserByEmail(register.Email);
            if (user != null)
            {
                return BadRequest("Email already in use.");
            }
            if (!register.Password.Equals(register.ConfirmPassword))
            {
                return BadRequest("Password and confirm password is not the same.");
            }
            return _mapper.Map<User>(_authService.UserRegistration(register.Email, register.Password, register.ConfirmPassword));
        }

        [HttpPost("Login")]
        public ActionResult<string> Login(LoginViewModel login)
        {
            var user = _authService.GetUserByEmail(login.Email);
            if (user == null)
            {
                return BadRequest("User not found.");
            }
            if(!_authService.VerifyPasswordHash(login.Password, user.PasswordHash, user.PasswordSalt))
            {
                return BadRequest("Wrong password");
            }
            var userWithRole = _authService.GetUserById(user.UserId);
            string role = userWithRole.Role.Name;
            string email = userWithRole.Email;
            string accessToken = _authService.CreateToken(userWithRole);
            var refreshToken = GenerateRefreshToken();
            SetRefreshToken(refreshToken, user.UserId);
            return Ok(new { accessToken, role, email });
        }

        [Authorize]
        [HttpPost("RefreshToken")]
        public ActionResult<string> RefreshToken(int userId)
        {
            var user = _authService.GetUserById(userId);
            if(user == null)
            {
                return BadRequest("User not exist");
            }
            var refreshToken = Request.Cookies["refreshToken"];
            if(!user.RefreshToken.Equals(refreshToken))
            {
                return Unauthorized("Invalid refresh token.");
            }
            else if(user.TokenExpires<DateTime.Now)
            {
                return Unauthorized("Token expired.");
            }
            string token = _authService.CreateToken(user);
            var newRefreshToken = GenerateRefreshToken();
            SetRefreshToken(newRefreshToken, userId);
            return Ok(token);
        }
       

        private static RefreshToken GenerateRefreshToken()
        {
            var refreshToken = new RefreshToken
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.Now.AddDays(1),
                Created = DateTime.Now
            };
            return refreshToken;
        }

        private void SetRefreshToken(RefreshToken newRefreshToken, int userId)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = newRefreshToken.Expires,
            };
            Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);
            _authService.SetRefreshTokenToUser(userId, newRefreshToken.Token, newRefreshToken.Created, newRefreshToken.Expires);
        }
    }
}
