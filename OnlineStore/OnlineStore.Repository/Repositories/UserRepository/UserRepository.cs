using Microsoft.EntityFrameworkCore;
using Microsoft.Win32;
using OnlineStore.Repository.Entities;
using OnlineStore.Repository.Repositories.ProductRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Repository.Repositories.UserRepository
{
    public class UserRepository : IUserRepository
    {
        private readonly OnlineStoreDBContext _context;
        public UserRepository(OnlineStoreDBContext context)
        {
            _context = context;
        }

        public User GetById(int id)
        {
            return _context.Users.Find(id);
        }
        public User GetByEmail(string email)
        {
            return _context.Users.FirstOrDefault(x => x.Email == email);
        }
        public void Add(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
        }
        public void Update(User user)
        {
            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
