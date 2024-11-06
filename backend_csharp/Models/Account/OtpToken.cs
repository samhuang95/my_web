using System;
using System.Collections.Generic;

namespace backend_csharp.Models.Account;

public partial class OtpToken
{
    public int OtpId { get; set; }

    public int UserId { get; set; }

    public string OtpCode { get; set; } = null!;

    public int IsDeleted { get; set; }

    public int CreateId { get; set; }

    public DateTime CreateTime { get; set; }

    public int? UpdateId { get; set; }

    public DateTime? UpdateTime { get; set; }
}
