using BookShop.BLL.Tools;
using BookShop.DAL;
using BookShop.DAL.Implementations;
using BookShop.DAL.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
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

builder.Services.AddTransient<JwtProvider>();

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();