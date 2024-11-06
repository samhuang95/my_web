using System;
using System.Collections.Generic;

namespace backend_csharp.Models.Content;

public partial class Article
{
    public int ArticleId { get; set; }

    public string TitleCh { get; set; } = null!;

    public string TitleEn { get; set; } = null!;

    public int ArticleTagCode { get; set; }

    public int StatueCode { get; set; }

    public string CoverUrl { get; set; } = null!;

    public string SummaryCh { get; set; } = null!;

    public string SummaryEn { get; set; } = null!;

    public string ContentHtmlCh { get; set; } = null!;

    public string ContentHtmlEn { get; set; } = null!;

    public int ArticleLevelCode { get; set; }

    public int IsDeleted { get; set; }

    public int CreateId { get; set; }

    public DateTime CreateTime { get; set; }

    public int? UpdateId { get; set; }

    public DateTime? UpdateTime { get; set; }
}
