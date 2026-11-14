using Microsoft.EntityFrameworkCore;
using SprintDesk.Api.Models;

namespace SprintDesk.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<TaskItem> Tasks => Set<TaskItem>();
        public DbSet<User> Users { get; set; }
    }
}