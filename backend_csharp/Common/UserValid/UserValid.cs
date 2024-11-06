using backend_csharp.Business.Account;
using backend_csharp.Business.ViewModels.Account;
using backend_csharp.Common.ApiResponse;
using backend_csharp.Common.Constants;
using backend_csharp.Models.Account;

namespace backend_csharp.Common.UserValid
{
    public class UserValid
    {
        private readonly AccountContext _context;

        // 構造函數名稱修正為類別名稱
        public UserValid(AccountContext context)
        {
            _context = context;
        }

        // 方法名稱更改，避免與類別名稱重複
        public async Task<User> ValidateUser(int userId)
        {
            try
            {
                // 從資料庫查找 User，使用者 ID 來查詢
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.UserId == userId && u.IsDeleted == CommonConstants.NotDeleted);

                // 如果找不到使用者，則返回 null
                if (user == null)
                {
                    return null;
                }

                // 回傳找到的使用者資料
                return user;
            }
            catch (Exception ex)
            {
                // 捕捉例外情況，並拋出以便控制器層處理
                throw new Exception("An error occurred while retrieving the user: " + ex.Message, ex);
            }
        }



    }
}
