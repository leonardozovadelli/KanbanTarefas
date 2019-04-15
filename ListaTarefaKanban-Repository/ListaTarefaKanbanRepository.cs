using System.Collections.Generic;
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

        //AllTAREFAS
        public async Task<Tarefa[]> GetAllTarefaAsync()
        {
            IQueryable<Tarefa> query = _context.Tarefas
            .Include(c => c.Responsavel);

            query = query.OrderBy(c => c.Responsavel.Id);

            return await query.ToArrayAsync();

        }

        //TAREFAS por status
        public async Task<object> GetTarefaStatusAsync()
        {
            IQueryable<Tarefa> query = _context.Tarefas
            .Include(r => r.Responsavel);

            query = query
            .OrderByDescending(t => t.Prioridade);

            List<Tarefa> todo = new List<Tarefa>();
            List<Tarefa> inpro = new List<Tarefa>();
            List<Tarefa> done = new List<Tarefa>();

            foreach (Tarefa tar in query)
            {
                switch (tar.Status)
                {
                    case 0: todo.Add(tar); break;
                    case 1: inpro.Add(tar); break;
                    case 2: done.Add(tar); break;
                }
            }

            return new
            {
                todo,
                inpro,
                done
            };

        }

        //TAREFAS p/ Responsavel
        public async Task<object> GetAllTarefaResponsavel(string responsavelNome)
        {
            IQueryable<Tarefa> query = _context.Tarefas
            .Include(c => c.Responsavel)
            .Where(c => c.Responsavel.Nome.IndexOf(responsavelNome) != -1);

            query = query.OrderBy(c => c.Prioridade);

            List<Tarefa> todo = new List<Tarefa>();
            List<Tarefa> inpro = new List<Tarefa>();
            List<Tarefa> done = new List<Tarefa>();

            foreach (Tarefa tar in query)
            {
                switch (tar.Status)
                {
                    case 0: todo.Add(tar); break;
                    case 1: inpro.Add(tar); break;
                    case 2: done.Add(tar); break;
                }
            }

            return new
            {
                todo,
                inpro,
                done
            };
        }

        //AllUsuario
        public async Task<Usuario[]> GetAllResponsavelAsync()
        {
            IQueryable<Usuario> query = _context.Usuarios
            .Distinct();

            query = query.OrderBy(c => c.Nome);

            return await query.ToArrayAsync();
        }
    }
}