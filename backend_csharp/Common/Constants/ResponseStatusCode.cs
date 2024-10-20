namespace backend_csharp.Common.Constants
{
    public static class ResponseStatusCode
    {
        // 成功的狀態碼
        public const int PostSuccess = 201; // 資源已成功建立
        public const int Ok = 200;           // 請求成功
        public const int NoContent = 204;    // 請求成功但無內容返回

        // 客戶端錯誤的狀態碼
        public const int BadRequest = 400;   // 錯誤的請求
        public const int Unauthorized = 401;  // 未經授權
        public const int Forbidden = 403;     // 禁止訪問
        public const int NotFound = 404;      // 找不到資源

        // 伺服器錯誤的狀態碼
        public const int InternalServerError = 500; // 內部伺服器錯誤
        public const int NotImplemented = 501;       // 尚未實現
    }
}
