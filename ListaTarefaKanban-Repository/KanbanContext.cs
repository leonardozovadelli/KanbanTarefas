using ListaTarefaKanban_Domain;
using Microsoft.EntityFrameworkCore;

namespace ListaTarefaKanban_Resitory
{
    public class KanbanContext : DbContext
    {
        public KanbanContext(DbContextOptions<KanbanContext> options) : base (options) {}

        public DbSet<Tarefa> Tarefas { get; set; }
        public DbSet<Usuario> Usuarios {get;set;}
    }
}