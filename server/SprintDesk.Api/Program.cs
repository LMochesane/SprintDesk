using Microsoft.EntityFrameworkCore;
using SprintDesk.Api.Data;
using SprintDesk.Api.Models; // Ensure your User model namespace is included

var builder = WebApplication.CreateBuilder(args);

// 1. Register the SQLite Database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=sprintdesk.db"));

// 2. Enable Controllers (so we can build TasksController & AuthController)
builder.Services.AddControllers();

// 3. Configure OpenAPI / Swagger for testing
builder.Services.AddOpenApi();

// 4. Configure CORS for both local development and your live GitHub Pages frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins(
                "http://localhost:5173",
                "https://lmochesane.github.io"
              )
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Automatically create the database, apply tables, and seed test users on startup
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();

    // Seed default demo accounts with full profile details if none exist in the database yet
    if (!db.Users.Any())
    {
        db.Users.AddRange(
            new User
            {
                Username = "Admin User",
                Email = "admin@sprintdesk.com",
                PasswordHash = "password123",
                Role = "Admin"
            },
            new User
            {
                Username = "Developer User",
                Email = "developer@sprintdesk.com",
                PasswordHash = "password123",
                Role = "Developer"
            }
        );
        db.SaveChanges();
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Note: Render handles SSL/HTTPS termination at its proxy layer, so avoid forcing
// HTTPS redirection inside the container if it causes redirect loops.
if (!app.Environment.IsProduction())
{
    app.UseHttpsRedirection();
}

// Apply the CORS policy before Authorization and Controllers
app.UseCors("AllowReactApp");

app.UseAuthorization();

// Map your API controllers
app.MapControllers();

app.MapGet("/", () => Results.Ok(new { message = "SprintDesk API is live", status = "healthy" }));

app.Run();