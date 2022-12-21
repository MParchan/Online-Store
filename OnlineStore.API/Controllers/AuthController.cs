using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Win32;
using OnlineStore.API.JWT;
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
            if(!VerifyPasswordHash(login.Password, user.PasswordHash, user.PasswordSalt))
            {
                return BadRequest("Wrong password");
            }
            string accessToken = CreateToken(_mapper.Map<UserViewModel>(user));
            var refreshToken = GenerateRefreshToken();
            SetRefreshToken(refreshToken, user.UserId);
            return accessToken;
        }

        [HttpPost("RefreshToken")]
        public ActionResult<string> RefreshToken(int userId)
        {
            var user = _authService.GetUserById(userId);
            var refreshToken = Request.Cookies["refreshToken"];
            if(!user.RefreshToken.Equals(refreshToken))
            {
                return Unauthorized("Invalid refresh token.");
            }
            else if(user.TokenExpires<DateTime.Now)
            {
                return Unauthorized("Token expired.");
            }
            string token = CreateToken(_mapper.Map<UserViewModel>(user));
            var newRefreshToken = GenerateRefreshToken();
            SetRefreshToken(newRefreshToken, userId);
            return Ok(token);
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        private string CreateToken(UserViewModel user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email)
            };
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }

        private RefreshToken GenerateRefreshToken()
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
