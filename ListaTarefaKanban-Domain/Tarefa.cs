using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ListaTarefaKanban_Domain
{
    public class Tarefa
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Titulo { get; set; }
        public DateTime? DataPrevInicio { get; set; }
        public DateTime? DataPrevTermino { get; set; }
        public DateTime? DataRealInicio { get; set; }
        public DateTime? DataRealTermino { get; set; }
        public double EsforcoPrev { get; set; }
        public double EsforcoReal { get; set; }
        public int Status { get; set; }
        public int Prioridade { get; set; }
        public Usuario Responsavel { get; set; }
        public int? UsuarioId { get; set; }
    }
}