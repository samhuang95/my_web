using System;
using System.Threading.Tasks;
using backend_csharp.Models.Content;
using backend_csharp.Common.Constants;
using backend_csharp.Business.ViewModels.Content;
using backend_csharp.Business.ViewModels.Account;
using backend_csharp.Common.UserValid;

namespace backend_csharp.Business.Content
{
    public class ArticleBI
    {
        private readonly ContentContext _context;

        public ArticleBI(ContentContext context)
        {
            _context = context;
        }

        public async Task<Article> InsertArticleBI(InsertArticleRequest reqMsg)
        {
            try
            {
                // 將 InsertArticleRequest 轉換成 Article 實體
                var article = new Article
                {
                    TitleCh = reqMsg.TitleCh,
                    TitleEn = reqMsg.TitleEn,
                    ArticleTagCode = reqMsg.ArticleTagCode,
                    StatueCode = reqMsg.StatueCode,
                    CoverUrl = reqMsg.CoverUrl,
                    SummaryCh = reqMsg.SummaryCh,
                    SummaryEn = reqMsg.SummaryEn,
                    ContentHtmlCh = reqMsg.ContentHtmlCh,
                    ContentHtmlEn = reqMsg.ContentHtmlEn,
                    ArticleLevelCode = reqMsg.ArticleLevelCode,
                    CreateId = reqMsg.UserId, // 假設是 1，根據實際需求調整
                    CreateTime = DateTime.Now
                };

                _context.Articles.Add(article); // 將使用者添加到資料庫
                await _context.SaveChangesAsync(); // 非同步保存變更

                return article;
            }
            catch (DbUpdateException dbEx)
            {
                // 資料庫更新失敗的例外處理
                throw new Exception("An error occurred while updating the database: " + dbEx.Message, dbEx);
            }
            catch (Exception ex)
            {
                // 一般例外處理
                throw new Exception("An error occurred while inserting article: " + ex.Message, ex);
            }
        }

        public async Task<Article> GetArticleBI(GetArticleRequest reqMsg)
        {
            try
            {
                // 從資料庫查找 Article，使用者 ID 來查詢
                var article = await _context.Articles
                    .FirstOrDefaultAsync(a => a.ArticleId == reqMsg.ArticleId && a.IsDeleted == CommonConstants.NotDeleted);

                // 如果找不到使用者，則返回 null
                if (article == null)
                {
                    return null;
                }

                // 回傳找到的使用者資料
                return article;
            }
            catch (Exception ex)
            {
                // 捕捉例外情況，並拋出以便控制器層處理
                throw new Exception("An error occurred while retrieving the article: " + ex.Message, ex);
            }
        }

        public async Task<List<Article>> GetArticleListBI(GetArticleListRequest reqMsg)
        {
            try
            {

                //// 創建 UserValid 的實例
                //var userValidator = new UserValid(_context);

                //// 呼叫 ValidateUser 方法
                //var userInfo = await userValidator.ValidateUser(reqMsg);

                //// 從資料庫查找 Article，使用者 ID 來查詢
                //var articles = await _context.Articles
                //    .Where(a => a.ArticleLevelCode >= userInfo.ArticleLevelCode && a.IsDeleted == CommonConstants.NotDeleted)
                //    .ToListAsync();

                // 如果找不到使用者，則返回 null
                //if (articles == null)
                //{
                //    return null;
                //}

                // 回傳找到的使用者資料
                return null;
            }
            catch (Exception ex)
            {
                // 捕捉例外情況，並拋出以便控制器層處理
                throw new Exception("An error occurred while retrieving the article list: " + ex.Message, ex);
            }
        }

        public async Task<Article> UpdateArticleBI(UpdateArticleRequest reqMsg)
        {
            try
            {
                // 從資料庫查找 Article，使用者 ID 來查詢
                var article = await _context.Articles
                    .FirstOrDefaultAsync(a => a.ArticleId == reqMsg.ArticleId && a.IsDeleted == CommonConstants.NotDeleted);

                // 如果找不到使用者，則返回 null
                if (article == null)
                {
                    return null;
                }

                // 更新使用者資料
                article.TitleCh = reqMsg.TitleCh ?? article.TitleCh;
                article.TitleEn = reqMsg.TitleEn ?? article.TitleEn;
                article.ArticleTagCode = reqMsg.ArticleTagCode;
                article.StatueCode = reqMsg.StatueCode;
                article.CoverUrl = reqMsg.CoverUrl ?? article.CoverUrl;
                article.SummaryCh = reqMsg.SummaryCh ?? article.SummaryCh;
                article.SummaryEn = reqMsg.SummaryEn ?? article.SummaryEn;
                article.ContentHtmlCh = reqMsg.ContentHtmlCh ?? article.ContentHtmlCh;
                article.ContentHtmlEn = reqMsg.ContentHtmlEn ?? article.ContentHtmlEn;
                article.ArticleLevelCode = reqMsg.ArticleLevelCode;


                // 更新 UpdateTime 為當前時間
                article.UpdateId = reqMsg.UserId;
                article.UpdateTime = DateTime.Now;

                // 保存更新後的數據到資料庫
                await _context.SaveChangesAsync();

                // 回傳找到的使用者資料
                return article;
            }
            catch (Exception ex)
            {
                // 捕捉例外情況並拋出錯誤，讓控制器層處理
                throw new Exception("An error occurred while updating the article: " + ex.Message, ex);
            }
        }

        public async Task<Article> DeleteArticleBI(DeleteArticleRequest reqMsg)
        {
            try
            {
                // 從資料庫查找 Article，Article ID 來查詢
                var article = await _context.Articles
                    .FirstOrDefaultAsync(a => a.ArticleId == reqMsg.ArticleId && a.IsDeleted == CommonConstants.NotDeleted);

                // 如果找不到使用者，則返回 null
                if (article == null)
                {
                    return null;
                }

                // 標記使用者為已刪除
                article.IsDeleted = CommonConstants.Deleted;
                article.UpdateId = reqMsg.UserId;
                article.UpdateTime = DateTime.Now;

                // 保存更新後的數據到資料庫
                await _context.SaveChangesAsync();

                // 回傳更新後的使用者資料
                return article;
            }
            catch (Exception ex)
            {
                // 捕捉例外並拋出，以便在控制器中處理
                throw new Exception("An error occurred while deleting the article: " + ex.Message, ex);
            }
        }


    }
}
