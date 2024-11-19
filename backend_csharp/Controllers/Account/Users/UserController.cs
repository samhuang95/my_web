using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using backend_csharp.Common.ApiResponse;
using backend_csharp.Common.Constants;
using backend_csharp.Business.Account;
using backend_csharp.Business.ViewModels.Account;
using backend_csharp.Models.Account;

namespace backend_csharp.Controllers.Account.Users
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUsersBI _usersBI;

        // 透過建構函數注入 IUsersBI
        public UserController(IUsersBI usersBI)
        {
            _usersBI = usersBI;
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

            try
            {
                // 呼叫 UsersBI 的 InsertUser 方法
                InsertUserResponse result = await _usersBI.InsertUserBI(reqMsg);

                var apiResponse = new ApiResponse<InsertUserResponse>(ResponseStatusCode.PostSuccess, "InsertUser successfully", result);
                return Ok(apiResponse);
            }
            catch (Exception ex)
            {
                // 捕捉一般例外，返回 Internal Server Error
                var response = new ApiResponse<object>(ResponseStatusCode.InternalServerError, $"An error occurred: {ex.Message}", null);
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
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

            try
            {
                // 呼叫 UsersBI 的 InsertUser 方法
                User result = await _usersBI.GetUserBI(reqMsg);

                var apiResponse = new ApiResponse<User>(ResponseStatusCode.PostSuccess, "GetUser successfully", result);
                return Ok(apiResponse);
            }
            catch (Exception ex)
            {
                // 捕捉一般例外，返回 Internal Server Error
                var response = new ApiResponse<object>(ResponseStatusCode.InternalServerError, $"An error occurred: {ex.Message}", null);
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }

        [HttpPost("UpdateUserInfo")]
        public async Task<IActionResult> UpdateUserInfo([FromBody] UpdateUserRequest reqMsg)
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

            try
            {
                // 呼叫 UsersBI 的 InsertUser 方法
                User result = await _usersBI.UpdateUserInfoBI(reqMsg);

                var apiResponse = new ApiResponse<User>(ResponseStatusCode.PostSuccess, "UpdateUserInfo successfully", result);
                return Ok(apiResponse);
            }
            catch (Exception ex)
            {
                // 捕捉一般例外，返回 Internal Server Error
                var response = new ApiResponse<object>(ResponseStatusCode.InternalServerError, $"An error occurred: {ex.Message}", null);
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }

        [HttpPost("UpdateUserLevel")]
        public async Task<IActionResult> UpdateUserLevel([FromBody] UpdateUserLevelRequest reqMsg)
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

            try
            {
                // 呼叫 UsersBI 的 InsertUser 方法
                User result = await _usersBI.UpdateUserLevelBI(reqMsg);

                var apiResponse = new ApiResponse<User>(ResponseStatusCode.PostSuccess, "UpdateUserLevel successfully", result);
                return Ok(apiResponse);
            }
            catch (Exception ex)
            {
                // 捕捉一般例外，返回 Internal Server Error
                var response = new ApiResponse<object>(ResponseStatusCode.InternalServerError, $"An error occurred: {ex.Message}", null);
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }

        [HttpPost("UpdateUserLang")]
        public async Task<IActionResult> UpdateUserLang([FromBody] UpdateUserLangRequest reqMsg)
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

            try
            {
                // 呼叫 UsersBI 的 InsertUser 方法
                User result = await _usersBI.UpdateUserLangBI(reqMsg);

                var apiResponse = new ApiResponse<User>(ResponseStatusCode.PostSuccess, "UpdateUserLang successfully", result);
                return Ok(apiResponse);
            }
            catch (Exception ex)
            {
                // 捕捉一般例外，返回 Internal Server Error
                var response = new ApiResponse<object>(ResponseStatusCode.InternalServerError, $"An error occurred: {ex.Message}", null);
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }

        [HttpPost("DeleteUser")]
        public async Task<IActionResult> DeleteUser([FromBody] DeleteUserRequest reqMsg)
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

            try
            {
                // 呼叫 UsersBI 的 InsertUser 方法
                User result = await _usersBI.DeleteUserBI(reqMsg);

                var apiResponse = new ApiResponse<User>(ResponseStatusCode.PostSuccess, "DeleteUser successfully", result);
                return Ok(apiResponse);
            }
            catch (Exception ex)
            {
                // 捕捉一般例外，返回 Internal Server Error
                var response = new ApiResponse<object>(ResponseStatusCode.InternalServerError, $"An error occurred: {ex.Message}", null);
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }



    }
}
