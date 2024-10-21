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

            try
            {
                var usersBI = new UsersBI(_context);
                InsertUserResponse result = await usersBI.InsertUserBI(reqMsg);

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
                var usersBI = new UsersBI(_context);
                User result = await usersBI.GetUserBI(reqMsg);

                if (result == null)
                {
                    var response = new ApiResponse<object>(ResponseStatusCode.NotFound, "User not found", null);
                    return NotFound(response);
                }

                var apiResponse = new ApiResponse<User>(ResponseStatusCode.PostSuccess, "GetUser successfully", result);
                return Ok(apiResponse);
            }
            catch (Exception ex)
            {
                // 捕捉例外情況，返回 Internal Server Error
                var response = new ApiResponse<object>(ResponseStatusCode.InternalServerError, $"An error occurred: {ex.Message}", null);
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }

        [HttpPost("UpdateUser")]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserRequest reqMsg)
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
                var usersBI = new UsersBI(_context);
                User result = await usersBI.UpdateUserBI(reqMsg);

                // 如果找不到 User，回傳 404 Not Found
                if (result == null)
                {
                    var response = new ApiResponse<object>(ResponseStatusCode.NotFound, "User not found", null);
                    return NotFound(response);
                }

                var apiResponse = new ApiResponse<User>(ResponseStatusCode.PostSuccess, "UpdateUser successfully", result);
                return Ok(apiResponse);
            }
            catch (Exception ex)
            {
                // 捕捉例外情況，返回 Internal Server Error
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
                var usersBI = new UsersBI(_context);
                User result = await usersBI.DeleteUserBI(reqMsg);

                // 如果找不到 User，返回 404 Not Found
                if (result == null)
                {
                    var response = new ApiResponse<object>(ResponseStatusCode.NotFound, "User not found", null);
                    return NotFound(response);
                }

                var apiResponse = new ApiResponse<User>(ResponseStatusCode.PostSuccess, "DeleteUser successfully", result);
                return Ok(apiResponse);
            }
            catch (Exception ex)
            {
                // 捕捉例外情況，返回 Internal Server Error
                var response = new ApiResponse<object>(ResponseStatusCode.InternalServerError, $"An error occurred: {ex.Message}", null);
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }

    }
}
