using System.Threading.Tasks;
using backend_csharp.Business.ViewModels.Account;
using backend_csharp.Common.Constants;
using backend_csharp.Models.Account;

namespace backend_csharp.Business.Account
{
    public interface IUsersBI
    {
        Task<InsertUserResponse> InsertUserBI(InsertUserRequest reqMsg);
        Task<User> GetUserBI(GetUserRequest reqMsg);
        Task<User> UpdateUserInfoBI(UpdateUserRequest reqMsg);
        Task<User> UpdateUserLevelBI(UpdateUserLevelRequest reqMsg);
        Task<User> UpdateUserLangBI(UpdateUserLangRequest reqMsg);
        Task<User> DeleteUserBI(DeleteUserRequest reqMsg);
    }

    public class UsersBI : IUsersBI
    {
        private readonly AccountContext _context;

        public UsersBI(AccountContext context)
        {
            _context = context;
        }

        public async Task<InsertUserResponse> InsertUserBI(InsertUserRequest reqMsg)
        {
            // 原有的 InsertUserBI 邏輯
            var user = new User
            {
                UserFirstName = reqMsg.UserFirstName,
                UserLastName = reqMsg.UserLastName,
                Email = reqMsg.Email,
                Password = reqMsg.Password,
                UserImgUrl = reqMsg.UserImgUrl,
                UserLevelCode = reqMsg.UserLevelCode,
                LangRecordCode = reqMsg.LangRecordCode,
                CreateId = 1, // 假設為固定值，根據需求調整
                CreateTime = DateTime.Now
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new InsertUserResponse
            {
                UserId = user.UserId,
                UserFirstName = user.UserFirstName,
                UserLastName = user.UserLastName,
                Email = user.Email,
                UserImgUrl = user.UserImgUrl,
                UserLevelCode = user.UserLevelCode,
                LangRecordCode = user.LangRecordCode,
                CreateTime = user.CreateTime
            };
        }

        public async Task<User> GetUserBI(GetUserRequest reqMsg)
        {
            try
            {
                // 從資料庫查找 User，使用者 ID 來查詢
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.UserId == reqMsg.UserId && u.IsDeleted == CommonConstants.NotDeleted);

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

        public async Task<User> UpdateUserInfoBI(UpdateUserRequest reqMsg)
        {
            try
            {
                // 從資料庫查找 User，使用者 ID 來查詢
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.UserId == reqMsg.UserId && u.IsDeleted == CommonConstants.NotDeleted);

                // 如果找不到使用者，則返回 null
                if (user == null)
                {
                    return null;
                }

                // 更新使用者資料
                user.UserFirstName = reqMsg.UserFirstName ?? user.UserFirstName;
                user.UserLastName = reqMsg.UserLastName ?? user.UserLastName;
                user.Password = reqMsg.Password ?? user.Password;
                user.UserImgUrl = reqMsg.UserImgUrl ?? user.UserImgUrl;

                // 更新 UpdateTime 為當前時間
                user.UpdateId = reqMsg.UserId;
                user.UpdateTime = DateTime.Now;

                // 保存更新後的數據到資料庫
                await _context.SaveChangesAsync();

                // 回傳找到的使用者資料
                return user;
            }
            catch (Exception ex)
            {
                // 捕捉例外情況並拋出錯誤，讓控制器層處理
                throw new Exception("An error occurred while updating the user: " + ex.Message, ex);
            }
        }

        public async Task<User> UpdateUserLevelBI(UpdateUserLevelRequest reqMsg)
        {
            try
            {
                // 從資料庫查找 User，使用者 ID 來查詢
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.UserId == reqMsg.UserId && u.IsDeleted == CommonConstants.NotDeleted);

                // 如果找不到使用者，則返回 null
                if (user == null)
                {
                    return null;
                }

                // 更新使用者資料
                user.UserLevelCode = reqMsg.UserLevelCode;

                // 更新 UpdateTime 為當前時間
                user.UpdateId = reqMsg.UserId;
                user.UpdateTime = DateTime.Now;

                // 保存更新後的數據到資料庫
                await _context.SaveChangesAsync();

                // 回傳找到的使用者資料
                return user;
            }
            catch (Exception ex)
            {
                // 捕捉例外情況並拋出錯誤，讓控制器層處理
                throw new Exception("An error occurred while updating the user: " + ex.Message, ex);
            }
        }

        public async Task<User> UpdateUserLangBI(UpdateUserLangRequest reqMsg)
        {
            try
            {
                // 從資料庫查找 User，使用者 ID 來查詢
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.UserId == reqMsg.UserId && u.IsDeleted == CommonConstants.NotDeleted);

                // 如果找不到使用者，則返回 null
                if (user == null)
                {
                    return null;
                }

                // 更新使用者資料
                user.LangRecordCode = reqMsg.LangRecordCode;

                // 更新 UpdateTime 為當前時間
                user.UpdateId = reqMsg.UserId;
                user.UpdateTime = DateTime.Now;

                // 保存更新後的數據到資料庫
                await _context.SaveChangesAsync();

                // 回傳找到的使用者資料
                return user;
            }
            catch (Exception ex)
            {
                // 捕捉例外情況並拋出錯誤，讓控制器層處理
                throw new Exception("An error occurred while updating the user: " + ex.Message, ex);
            }
        }

        public async Task<User> DeleteUserBI(DeleteUserRequest reqMsg)
        {
            try
            {
                // 從資料庫查找 User，使用者 ID 來查詢
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.UserId == reqMsg.UserId && u.IsDeleted == CommonConstants.NotDeleted);

                // 如果找不到使用者，則返回 null
                if (user == null)
                {
                    return null;
                }

                // 標記使用者為已刪除
                user.IsDeleted = CommonConstants.Deleted;
                user.UpdateId = reqMsg.UserId;
                user.UpdateTime = DateTime.Now;

                // 保存更新後的數據到資料庫
                await _context.SaveChangesAsync();

                // 回傳更新後的使用者資料
                return user;
            }
            catch (Exception ex)
            {
                // 捕捉例外並拋出，以便在控制器中處理
                throw new Exception("An error occurred while deleting the user: " + ex.Message, ex);
            }
        }


    }
}
