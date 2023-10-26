using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;



namespace ExpenseRecord.Model
{
  
    [BsonIgnoreExtraElements]
    public class ToDoItem
    {
        [BsonId]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Description { get; set; } = string.Empty;
        public bool Done { get; set; }


        [BsonRepresentation(BsonType.String)]
        public DateTimeOffset CreatedTime { get; set; } = DateTimeOffset.UtcNow;
    }
}
