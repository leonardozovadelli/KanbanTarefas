using System.Linq;
using System.Threading.Tasks;
using ListaTarefaKanban_Domain;
using ListaTarefaKanban_Resitory;
using Microsoft.EntityFrameworkCore;

namespace ListaTarefaKanban_Repository
{
    public class ListaTarefaKanbanRepository : IListaTarefaKanbanRepository
    {
        private readonly KanbanContext _context;

        public ListaTarefaKanbanRepository(KanbanContext context)
        {
            _context = context;
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
        public void Add<T>(T entity) where T : class
        {
             _context.Add(entity);
        }
        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }
        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        //TAREFAS
        public async Task<Tarefa[]> GetAllTarefaAsync()
        {
            IQueryable<Tarefa> query = _context.Tarefas
            .Include(c => c.Responsavel);

            query = query.OrderBy(c => c.Responsavel.Id);

            return await query.ToArrayAsync();

        }

        //TAREFAS por status
        public async Task<Tarefa[]> GetTarefaStatusAsync(int status)
        {
            IQueryable<Tarefa> query = _context.Tarefas
            .Include(r => r.Responsavel);
            
            query = query.Where(d => d.Status == status)
            .OrderByDescending(t => t.Prioridade);

            return await query.ToArrayAsync();

        }

        public async Task<Tarefa[]> GetAllTarefaResponsavel(string responsavelNome)
        {
            IQueryable<Tarefa> query = _context.Tarefas
            .Include(c => c.Responsavel);

            query = query.OrderBy(c => c.Prioridade)
                        .Where(c => c.Responsavel.Nome.IndexOf(responsavelNome) == -1) ;

            return await query.ToArrayAsync();
        }

        //Usuario
        public async Task<Usuario[]> GetAllResponsavelAsync()
        {
            IQueryable<Usuario> query = _context.Usuarios
            .Distinct();

            query = query.OrderBy(c => c.Nome);

            return await query.ToArrayAsync();
        }
    }
}