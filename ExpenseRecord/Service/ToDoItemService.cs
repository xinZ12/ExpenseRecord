using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;
using ExpenseRecord.Model;
using ExpenseRecord;



namespace ExpenseRecord.Service
{
    
    public class ToDoItemService : IToDoItemService
    {
        private readonly IMongoCollection<ToDoItem> _ToDoItemsCollection;

        public ToDoItemService(
            IOptions<ToDoItemDatabaseSettings> ToDoItemStoreDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                //ToDoItemStoreDatabaseSettings.Value.ConnectionString);
                "mongodb://localhost:27017");

            var mongoDatabase = mongoClient.GetDatabase(
                "ExpenseRecord");
            //ToDoItemStoreDatabaseSettings.Value.DatabaseName);

            _ToDoItemsCollection = mongoDatabase.GetCollection<ToDoItem>(
                "ExpenseRecord");
            //ToDoItemStoreDatabaseSettings.Value.CollectionName);
        }

        public async Task Create(ToDoItem newItem)
        {
            _ToDoItemsCollection.InsertOne(newItem);

        }

        public async Task<List<ToDoItem>> Get()
        {
            var toDoItems = await _ToDoItemsCollection.Find(_ => true).ToListAsync();
            return toDoItems;
        }

        
        public async Task<ToDoItem?> Get(string id)
        {
            var toDoItem = await _ToDoItemsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
            return toDoItem;
        }
        
        
     

        // If no such Id, return 404
        public async Task<bool> Remove(string id)
        {
            var toDoItem = await _ToDoItemsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
            if (toDoItem == null)
            {
                return false;
            }
            await _ToDoItemsCollection.DeleteOneAsync(doc => doc.Id == id);         
            return true;
        }
        

        //public async Task Upsert(string id, ToDoItem updatedItem)
        //{
            // CreatedTime can't be changed
        //    var toDoItem = await _ToDoItemsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        //    updatedItem.CreatedTime = toDoItem.CreatedTime;

        //    await _ToDoItemsCollection.ReplaceOneAsync(x => x.Id == id, updatedItem);
        //}
        
    }   

}
