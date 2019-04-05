## LISTA TAREFAS KANBAN
## Tarefas Gerais:
##Montar API { POST / PUT } - OK | 05/04
##Pesquisar sobre o Drag and Drop - 50% | 05/04
##	Drag and Drop
##	https://www.devmedia.com.br/novidades-do-angular-7/40194
##Fazer comunicação { ANGULAR -> API } - 0%
##Front End - 0%
<!-- 
Entidade:

{ Tarefas }
- Titulo
- Responsavel { id / nome} - DOMINIO FECHASO 
- Data prev. ini
- Data prev. fim
- Data real ini
- Data real fim
- esforço previsto
- esforço real
- status { 0 - TODO / 1 - InProgress / 2 - Done }
- prioridade { 0 - Baixa / 1 - Medio / 2 - Alta }

filtro: responsavel

Corpo: Todo / In progress / Done

- Drop das tarefas transitando do Todo / In progress / Done { TIPO TRELLO }
dotnet ef --startup-project ..\ListaTarefaKanban-API\ListaTarefaKanban-API.csproj migrations IdTabelaTarefa


	Exemplo de POST
	{
        "titulo": "Inicio dos teste",
        "dataPrevInicio": "2019-05-04T00:00:00",
        "dataPrevTermino": "2019-08-04T00:00:00",
        "dataRealInicio": "2019-05-04T00:00:00",
        "dataRealTermino": "2019-08-04T00:00:00",
        "esforcoPrev": 15,
        "esforcoReal": 14,
        "status": 2,
        "prioridade": 1,
        "usuarioId": 2
    }
	
	Exemplo de PUT
	{
        "id": 3,
        "titulo": "Terceiro dos teste",
        "dataPrevInicio": "2019-05-04T00:00:00",
        "dataPrevTermino": "2019-08-04T00:00:00",
        "dataRealInicio": "2019-05-04T00:00:00",
        "dataRealTermino": "2019-08-04T00:00:00",
        "esforcoPrev": 15,
        "esforcoReal": 14,
        "status": 2,
        "prioridade": 1,
        "responsavel": {
            "id": 1,
            "nome": "Leonardo"
        },
        "usuarioId": 1
    } -->