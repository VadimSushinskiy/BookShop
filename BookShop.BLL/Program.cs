using BookShop.DAL;
using BookShop.DAL.Implementations;
using BookShop.DAL.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<SqlServerContext>();
builder.Services.AddTransient<IBookDAL, BookDAL>();
builder.Services.AddTransient<ICartDAL, CartDAL>();
builder.Services.AddTransient<IOrderDAL, OrderDAL>();
builder.Services.AddTransient<IOrderStatusDAL, OrderStatusDAL>();
builder.Services.AddTransient<IReviewDAL, ReviewDAL>();
builder.Services.AddTransient<IUserDAL, UserDAL>();

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
