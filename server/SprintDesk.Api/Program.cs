using Microsoft.EntityFrameworkCore;
using SprintDesk.Api.Data;

var builder = WebApplication.CreateBuilder(args);

// 1. Register the SQLite Database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=sprintdesk.db"));

// 2. Enable Controllers (so we can build TasksController)
builder.Services.AddControllers();

// 3. Configure OpenAPI / Swagger for testing
builder.Services.AddOpenApi();

// 4. Configure CORS so your React frontend can communicate with this API
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // Default Vite port
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// Apply the CORS policy before Authorization and Controllers
app.UseCors("AllowReactApp");

app.UseAuthorization();

// Map your API controllers
app.MapControllers();

app.Run();