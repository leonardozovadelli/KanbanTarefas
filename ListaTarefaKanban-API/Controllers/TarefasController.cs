using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ListaTarefaKanban_Domain;
using ListaTarefaKanban_Repository;
using ListaTarefaKanban_Resitory;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ListaTarefaKanban_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TarefasController : ControllerBase
    {
        private readonly IListaTarefaKanbanRepository _repo;

        public TarefasController(IListaTarefaKanbanRepository repo)
        {
            _repo = repo;
        }


        //GET Tarefas
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var results = await _repo.GetAllTarefaAsync();
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco Dados Falhou");
            }

        }

        // GET TAREFAS
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var results = await _repo.GetAllTarefaResponsavel(id);
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco Dados Falhou");
            }
        }

        // POST
        [HttpPost]
        public async Task<IActionResult> Post(Tarefa model)
        {
            try
            {
                _repo.Add(model);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/tarefas/{model.Id}", model);
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco Dados Falhou");
            }

            return BadRequest();
        }

        // PUT 
        [HttpPut("{TarefaId}")]
        public async Task<IActionResult> Put(int TarefaId, Tarefa model)
        {
            try
            {
                var evento = await _repo.GetAllTarefaResponsavel(TarefaId);

                if (evento == null) return NotFound();

                _repo.Update(model);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/tarefas/{model.Id}", model);
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco Dados Falhou");
            }

            return BadRequest();
        }

        // DELETE 
        [HttpDelete("{TarefaId}")]
        public async Task<IActionResult> Delete(int TarefaId)
        {
            try
            {
                var evento = await _repo.GetAllTarefaResponsavel(TarefaId);

                if (evento == null) return NotFound();

                _repo.Delete(evento);

                if (await _repo.SaveChangesAsync())
                {
                    return Ok();
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco Dados Falhou");
            }

            return BadRequest();
        }

    }

}