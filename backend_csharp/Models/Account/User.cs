using System;
using System.Collections.Generic;

namespace backend_csharp.Models.Account;

public partial class User
{
    public int UserId { get; set; }

    public string UserFirstName { get; set; } = null!;

    public string UserLastName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string UserImgUrl { get; set; } = null!;

    public int UserLevelCode { get; set; }

    public int LangRecordCode { get; set; }

    public int IsDeleted { get; set; }

    public int CreateId { get; set; }

    public DateTime CreateTime { get; set; }

    public int? UpdateId { get; set; }

    public DateTime? UpdateTime { get; set; }
}
