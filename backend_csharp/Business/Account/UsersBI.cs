using System.Threading.Tasks;
using backend_csharp.Business.ViewModels.Account;
using backend_csharp.Models.Account;

namespace backend_csharp.Business.Account
{
    public interface IUsersBI
    {
        Task<InsertUserResponse> InsertUserBI(InsertUserRequest reqMsg);
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
    }
}
