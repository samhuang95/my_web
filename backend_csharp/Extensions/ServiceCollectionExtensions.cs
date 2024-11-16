using backend_csharp.Business.Services;
using Microsoft.Extensions.DependencyInjection;

namespace backend_csharp.Extensions
{
    public static class ServiceCollectionExtensions
    {
        /// <summary>
        /// 註冊應用所需的服務
        /// </summary>
        public static IServiceCollection RegisterApplicationServices(this IServiceCollection services)
        {
            // 註冊介面與實現
            services.AddScoped<IUserService, UserService>();

            // 其他服務可以在這裡註冊
            // services.AddScoped<IAnotherService, AnotherService>();

            return services;
        }
    }
}
