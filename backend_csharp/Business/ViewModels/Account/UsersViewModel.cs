﻿using backend_csharp.Models.Account;
using backend_csharp.Common.ApiResponse;

namespace backend_csharp.Business.ViewModels.Account
{
    public class InsertUserRequest
    {
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string UserImgUrl { get; set; }
        public int UserLevelCode { get; set; }
        public int LangRecordCode { get; set; }


    }
    public class InsertUserResponse
    {
        public int UserId { get; set; }
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        public string Email { get; set; }
        public string UserImgUrl { get; set; }
        public int UserLevelCode { get; set; }
        public int LangRecordCode { get; set; }
        public DateTime CreateTime { get; set; }
    }
    public class GetUserRequest
    {
        public int UserId { get; set; }
    }

    public class UpdateUserRequest
    {
        public int UserId { get; set; }
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        public string Password { get; set; }
        public string UserImgUrl { get; set; }
        public int UpdateId { get; set; }

        public DateTime UpdateTime { get; set; }

    }

    public class UpdateUserLevelRequest
    {
        public int UserId { get; set; }

        public int UserLevelCode { get; set; }

        public int UpdateId { get; set; }

        public DateTime UpdateTime { get; set; }

    }

    public class UpdateUserLangRequest
    {
        public int UserId { get; set; }

        public int LangRecordCode { get; set; }

        public int UpdateId { get; set; }

        public DateTime UpdateTime { get; set; }

    }

    public class DeleteUserRequest
    {
        public int UserId { get; set; }
    }

}