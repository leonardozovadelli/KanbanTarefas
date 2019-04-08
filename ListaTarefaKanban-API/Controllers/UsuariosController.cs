using System.Threading.Tasks;
using ListaTarefaKanban_Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ListaTarefaKanban_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly IListaTarefaKanbanRepository _repo;

        public UsuariosController(IListaTarefaKanbanRepository repo)
        {
           _repo = repo;
        }

        // GET USUARIOS
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var results = await _repo.GetAllResponsavelAsync();
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco Dados Falhou");
            }

        }
    }
}