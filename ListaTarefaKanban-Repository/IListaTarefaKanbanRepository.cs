using System.Threading.Tasks;
using ListaTarefaKanban_Domain;

namespace ListaTarefaKanban_Repository
{
    public interface IListaTarefaKanbanRepository
    {
        //GERAL
         void Add<T>(T entity) where T : class;
         void Update<T>(T entity) where T : class;
         void Delete<T>(T entity) where T : class;
        Task<bool> SaveChangesAsync();

        //TAREFAS
        Task<Tarefa[]> GetAllTarefaAsync();
        Task<object> GetAllTarefaResponsavel(string responsavelNome);
        Task<Usuario[]> GetAllResponsavelAsync();
        Task<object> GetTarefaStatusAsync();
        
    }
}