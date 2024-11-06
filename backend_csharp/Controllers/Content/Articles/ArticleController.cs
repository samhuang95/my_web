using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using backend_csharp.Models.Content;
using backend_csharp.Common.Constants;
using backend_csharp.Business.Content;
using backend_csharp.Common.ApiResponse;
using backend_csharp.Business.ViewModels.Content;

namespace backend_csharp.Controllers.Content.Articles
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly ContentContext _context;

        public ArticleController(ContentContext context)
        {
            _context = context;
        }

        [HttpPost("InsertAricle")]
        public async Task<IActionResult> InsertAricle([FromBody] InsertArticleRequest reqMsg)
        {
            if (reqMsg == null)
            {
                var response = new ApiResponse<object>(ResponseStatusCode.BadRequest, "Article object is null", null);
                return BadRequest(response);
            }

            if (!ModelState.IsValid)
            {
                var response = new ApiResponse<object>(ResponseStatusCode.BadRequest, "Invalid model state", null);
                return BadRequest(response);
            }

            try
            {
                var articleBI = new ArticleBI(_context);
                Article result = await articleBI.InsertArticleBI(reqMsg);

                var apiResponse = new ApiResponse<Article>(ResponseStatusCode.PostSuccess, "InsertAricle successfully", result);
                return Ok(apiResponse);
            }
            catch (Exception ex)
            {
                // 捕捉一般例外，返回 Internal Server Error
                var response = new ApiResponse<object>(ResponseStatusCode.InternalServerError, $"An error occurred: {ex.Message}", null);
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }


        [HttpPost("GetArticle")]
        public async Task<IActionResult> GetArticle([FromBody] GetArticleRequest reqMsg)
        {
            if (reqMsg == null)
            {
                var response = new ApiResponse<object>(ResponseStatusCode.BadRequest, "Article object is null", null);
                return BadRequest(response);
            }

            if (!ModelState.IsValid)
            {
                var response = new ApiResponse<object>(ResponseStatusCode.BadRequest, "Invalid model state", null);
                return BadRequest(response);
            }

            try
            {
                var articleBI = new ArticleBI(_context);
                Article result = await articleBI.GetArticleBI(reqMsg);

                if (result == null)
                {
                    var response = new ApiResponse<object>(ResponseStatusCode.NotFound, "Article not found", null);
                    return NotFound(response);
                }

                var apiResponse = new ApiResponse<Article>(ResponseStatusCode.PostSuccess, "Get Article successfully", result);
                return Ok(apiResponse);
            }
            catch (Exception ex)
            {
                // 捕捉例外情況，返回 Internal Server Error
                var response = new ApiResponse<object>(ResponseStatusCode.InternalServerError, $"An error occurred: {ex.Message}", null);
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }

        [HttpPost("GetArticleList")]
        public async Task<IActionResult> GetArticleList([FromBody] GetArticleListRequest reqMsg)
        {
            if (reqMsg == null)
            {
                var response = new ApiResponse<object>(ResponseStatusCode.BadRequest, "Article Level Code object is null", null);
                return BadRequest(response);
            }

            if (!ModelState.IsValid)
            {
                var response = new ApiResponse<object>(ResponseStatusCode.BadRequest, "Invalid model state", null);
                return BadRequest(response);
            }

            try
            {
                var articleBI = new ArticleBI(_context);
                List<Article> result = await articleBI.GetArticleListBI(reqMsg);

                if (result == null)
                {
                    var response = new ApiResponse<object>(ResponseStatusCode.NotFound, "Article not found", null);
                    return NotFound(response);
                }

                var apiResponse = new ApiResponse<List<Article>>(ResponseStatusCode.PostSuccess, "Get Article list successfully", result);
                return Ok(apiResponse);
            }
            catch (Exception ex)
            {
                // 捕捉例外情況，返回 Internal Server Error
                var response = new ApiResponse<object>(ResponseStatusCode.InternalServerError, $"An error occurred: {ex.Message}", null);
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }



        [HttpPost("UpdateArticle")]
        public async Task<IActionResult> UpdateArticle([FromBody] UpdateArticleRequest reqMsg)
        {
            if (reqMsg == null)
            {
                var response = new ApiResponse<object>(ResponseStatusCode.BadRequest, "Article object is null", null);
                return BadRequest(response);
            }

            if (!ModelState.IsValid)
            {
                var response = new ApiResponse<object>(ResponseStatusCode.BadRequest, "Invalid model state", null);
                return BadRequest(response);
            }

            try
            {
                var articleBI = new ArticleBI(_context);
                Article result = await articleBI.UpdateArticleBI(reqMsg);

                // 如果找不到 Article，回傳 404 Not Found
                if (result == null)
                {
                    var response = new ApiResponse<object>(ResponseStatusCode.NotFound, "Article not found", null);
                    return NotFound(response);
                }

                var apiResponse = new ApiResponse<Article>(ResponseStatusCode.PostSuccess, "Update Article successfully", result);
                return Ok(apiResponse);
            }
            catch (Exception ex)
            {
                // 捕捉例外情況，返回 Internal Server Error
                var response = new ApiResponse<object>(ResponseStatusCode.InternalServerError, $"An error occurred: {ex.Message}", null);
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }


        [HttpPost("DeleteArticle")]
        public async Task<IActionResult> DeleteArticle([FromBody] DeleteArticleRequest reqMsg)
        {
            if (reqMsg == null)
            {
                var response = new ApiResponse<object>(ResponseStatusCode.BadRequest, "Article object is null", null);
                return BadRequest(response);
            }

            if (!ModelState.IsValid)
            {
                var response = new ApiResponse<object>(ResponseStatusCode.BadRequest, "Invalid model state", null);
                return BadRequest(response);
            }

            try
            {
                var articleBI = new ArticleBI(_context);
                Article result = await articleBI.DeleteArticleBI(reqMsg);

                // 如果找不到 Article，返回 404 Not Found
                if (result == null)
                {
                    var response = new ApiResponse<object>(ResponseStatusCode.NotFound, "Article not found", null);
                    return NotFound(response);
                }

                var apiResponse = new ApiResponse<Article>(ResponseStatusCode.PostSuccess, "Delete Article successfully", result);
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
