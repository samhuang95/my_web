using backend_csharp.Models.Account;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;
using backend_csharp.Models.Content;
using backend_csharp.Extensions;
using backend_csharp.Business.Account;

var builder = WebApplication.CreateBuilder(args);

// Ū�� .env �ɮ�
Env.Load();
builder.Configuration.AddEnvironmentVariables();

// Add services to the container.
builder.Services.AddControllersWithViews();

// ���U UsersBI �M�䤶��
builder.Services.AddScoped<IUsersBI, UsersBI>();

// ���o�����ܼ�
var dbServer = Environment.GetEnvironmentVariable("DB_SERVER");
var dbUser = Environment.GetEnvironmentVariable("DB_USER");
var dbPassword = Environment.GetEnvironmentVariable("DB_PASSWORD");

// ���o�s���r��A�ô��������ܼ�
var accountConnectionString = builder.Configuration.GetConnectionString("AccountDBConnection")
    .Replace("${DB_SERVER}", dbServer)
    .Replace("${DB_USER}", dbUser)
    .Replace("${DB_PASSWORD}", dbPassword);

var contentConnectionString = builder.Configuration.GetConnectionString("ContentDBConnection")
    .Replace("${DB_SERVER}", dbServer)
    .Replace("${DB_USER}", dbUser)
    .Replace("${DB_PASSWORD}", dbPassword);

// ���U AccountContext
builder.Services.AddDbContext<AccountContext>(options =>
{
    options.UseMySql(accountConnectionString, ServerVersion.AutoDetect(accountConnectionString));
});

// ���U ContentContext
builder.Services.AddDbContext<ContentContext>(options =>
{
    options.UseMySql(contentConnectionString, ServerVersion.AutoDetect(contentConnectionString));
});

// �ϥ��X�i��k���U�Ҧ��A��
builder.Services.RegisterApplicationServices();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
