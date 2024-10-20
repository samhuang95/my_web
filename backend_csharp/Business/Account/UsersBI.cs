using System;
using System.Threading.Tasks;
using backend_csharp.Models.Account;
using backend_csharp.Common.Constants;
using backend_csharp.Business.ViewModels.Account;

namespace backend_csharp.Business.Account
{
    public class UsersBI
    {
        private readonly AccountContext _context;

        public UsersBI(AccountContext context)
        {
            _context = context;
        }

        public async Task<InsertUserResponse> InsertUserBI(InsertUserRequest reqMsg)
        {
            // 將 InsertUserRequest 轉換成 User 實體
            var user = new User
            {
                UserFirstName = reqMsg.UserFirstName,
                UserLastName = reqMsg.UserLastName,
                Email = reqMsg.Email,
                Password = reqMsg.Password,
                CreateId = 1, // 假設是 1，根據實際需求調整
                CreateTime = DateTime.Now
            };

            _context.Users.Add(user); // 將使用者添加到資料庫
            await _context.SaveChangesAsync(); // 非同步保存變更

            // 回傳 InsertUserResponse
            var response = new InsertUserResponse
            {
                UserId = user.UserId,
                UserFirstName = user.UserFirstName,
                UserLastName = user.UserLastName,
                Email = user.Email,
                CreateTime = user.CreateTime
            };

            return response;
        }
        public async Task<User> GetUserBI(GetUserRequest reqMsg)
        {
            // 從資料庫查找 User，使用者 ID 來查詢
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.UserId == reqMsg.UserId && u.IsDeleted == CommonConstants.NotDeleted);

            // 如果找不到使用者，則返回 null 或拋出錯誤
            if (user == null)
            {
                // 根據需求，你可以決定是否拋出例外或返回 null
                return null;
            }

            // 回傳找到的使用者資料
            return user;
        }

    }
}
