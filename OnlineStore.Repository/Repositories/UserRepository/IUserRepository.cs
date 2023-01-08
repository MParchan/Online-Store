using OnlineStore.Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Repository.Repositories.UserRepository
{
    public interface IUserRepository
    {
        public User GetById(int id);
        public User GetByEmail(string email);
        public int GetIdByEmail(string email);
        public void Add(User user);
        public void Update(User user);
        public bool Exists(string email);
    }
}
