using backend_csharp.Models.Content;
using backend_csharp.Common.ApiResponse;

namespace backend_csharp.Business.ViewModels.Content
{
    public class InsertArticleRequest
    {
        public int UserId { get; set; }
        public string TitleCh { get; set; }
        public string TitleEn { get; set; }
        public int ArticleTagCode { get; set; }
        public int StatueCode { get; set; }
        public string CoverUrl { get; set; }
        public string SummaryCh { get; set; }
        public string SummaryEn { get; set; }
        public string ContentHtmlCh { get; set; }
        public string ContentHtmlEn { get; set; }
        public int ArticleLevelCode { get; set; }


    }

    public class GetArticleRequest
    {
        public int ArticleId { get; set; }
    }

    public class GetArticleListRequest
    {
        public int UserId { get; set; }
    }

    public class UpdateArticleRequest
    {
        public int UserId { get; set; }
        public int ArticleId { get; set; }
        public string TitleCh { get; set; }
        public string TitleEn { get; set; }
        public int ArticleTagCode { get; set; }
        public int StatueCode { get; set; }
        public string CoverUrl { get; set; }
        public string SummaryCh { get; set; }
        public string SummaryEn { get; set; }
        public string ContentHtmlCh { get; set; }
        public string ContentHtmlEn { get; set; }
        public int ArticleLevelCode { get; set; }

        public int UpdateId { get; set; }
        public DateTime UpdateTime { get; set; }

    }

    public class DeleteArticleRequest
    {
        public int UserId { get; set; }
        public int ArticleId { get; set; }
    }

}
