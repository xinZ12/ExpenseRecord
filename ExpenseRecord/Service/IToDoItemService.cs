using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ExpenseRecord.Model;



namespace ExpenseRecord.Service
{
    public interface IToDoItemService
    {
        Task Create(ToDoItem newToDoItem);
        Task<List<ToDoItem>> Get();
        Task<ToDoItem?> Get(string id);
        Task<bool> Remove(string id);
        //Task Upsert(string id, ToDoItem updatedToDoItem);
    }


    
}
