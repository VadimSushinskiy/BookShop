using BookShop.BLL.Tools.Implementations;
using BookShop.BLL.Tools.Interfaces;
using BookShop.DAL;
using BookShop.DAL.Implementations;
using BookShop.DAL.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthorization();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("JwtOptions")["SecretKey"]!))
        };

        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                context.Token = context.Request.Cookies["token"];

                return Task.CompletedTask;
            }
        };
    });

builder.Services.AddScoped<SqlServerContext>();
builder.Services.AddTransient<IBookDAL, BookDAL>();
builder.Services.AddTransient<ICartDAL, CartDAL>();
builder.Services.AddTransient<IOrderDAL, OrderDAL>();
builder.Services.AddTransient<IOrderStatusDAL, OrderStatusDAL>();
builder.Services.AddTransient<IReviewDAL, ReviewDAL>();
builder.Services.AddTransient<IUserDAL, UserDAL>();
builder.Services.AddTransient<IAuthorDAL, AuthorDAL>();
builder.Services.AddTransient<IPublishingDAL, PublishingDAL>();

builder.Services.AddTransient<IJwtProvider, JwtProvider>();
builder.Services.AddTransient<IPasswordHasher, PasswordHasher>();
builder.Services.AddTransient<IFileHelper, FileHelper>();

builder.Services.AddCors(option =>
{
    option.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:3000");
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
        policy.AllowCredentials();
    });
});

builder.Services.AddControllers();

var app = builder.Build();

app.UseStaticFiles();

app.UseCors();

app.UseHttpsRedirection();

app.UseCookiePolicy(new CookiePolicyOptions
{
    MinimumSameSitePolicy = SameSiteMode.None,
    Secure = CookieSecurePolicy.Always
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();