using backend_csharp.Models.Account;
using Microsoft.EntityFrameworkCore;
using backend_csharp.Common.Constants;

namespace backend_csharp.Business.Services
{
    public class UserService : IUserService
    {
        private readonly AccountContext _context;

        public UserService(AccountContext context)
        {
            _context = context;
        }

        public async Task<bool> ValidateUserAsync(int userId)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.UserId == userId && u.IsDeleted == CommonConstants.NotDeleted);

            return user != null;
        }
    }
}
