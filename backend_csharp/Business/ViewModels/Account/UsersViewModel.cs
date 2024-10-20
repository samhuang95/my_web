using backend_csharp.Models.Account;
using backend_csharp.Common.ApiResponse;

namespace backend_csharp.Business.ViewModels.Account
{
    public class InsertUserRequest
    {
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
    public class InsertUserResponse
    {
        public int UserId { get; set; }
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        public string Email { get; set; }
        public DateTime CreateTime { get; set; }
    }
    public class GetUserRequest
    {
        public int UserId { get; set; }
    }

}
