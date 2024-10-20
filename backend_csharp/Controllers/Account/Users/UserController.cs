using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using backend_csharp.Models.Account;
using backend_csharp.Common.Constants;
using backend_csharp.Business.Account;
using backend_csharp.Common.ApiResponse;
using backend_csharp.Business.ViewModels.Account;

namespace backend_csharp.Controllers.Account.Users
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AccountContext _context;

        public UserController(AccountContext context)
        {
            _context = context;
        }

        [HttpPost("InsertUser")]
        public async Task<IActionResult> InsertUser([FromBody] InsertUserRequest reqMsg)
        {
            if (reqMsg == null)
            {
                var response = new ApiResponse<object>(ResponseStatusCode.BadRequest, "User object is null", null);
                return BadRequest(response); 
            }

            if (!ModelState.IsValid)
            {
                var response = new ApiResponse<object>(ResponseStatusCode.BadRequest, "Invalid model state", null);
                return BadRequest(response);
            }
            var usersBI = new UsersBI(_context);

            InsertUserResponse result = await usersBI.InsertUserBI(reqMsg);

            var apiResponse = new ApiResponse<InsertUserResponse>(ResponseStatusCode.PostSuccess, "InsertUser successfully", result);
            return Ok(apiResponse);
        }

        [HttpPost("GetUser")]
        public async Task<IActionResult> GetUser([FromBody] GetUserRequest reqMsg)
        {
            if (reqMsg == null)
            {
                var response = new ApiResponse<object>(ResponseStatusCode.BadRequest, "User object is null", null);
                return BadRequest(response);
            }

            if (!ModelState.IsValid)
            {
                var response = new ApiResponse<object>(ResponseStatusCode.BadRequest, "Invalid model state", null);
                return BadRequest(response);
            }
            var usersBI = new UsersBI(_context);

            User result = await usersBI.GetUserBI(reqMsg);

            var apiResponse = new ApiResponse<User>(ResponseStatusCode.PostSuccess, "GetUser successfully", result);
            return Ok(apiResponse);
        }
    }
}
