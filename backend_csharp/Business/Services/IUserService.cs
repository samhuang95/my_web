namespace backend_csharp.Business.Services
{
    public interface IUserService
    {
        Task<bool> ValidateUserAsync(int userId);
    }
}
