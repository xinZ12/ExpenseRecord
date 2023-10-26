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

        public string Type { get; set; } = string.Empty;

        public double Amount { get; set; } = double.MaxValue;

        [BsonRepresentation(BsonType.String)]
        public DateTimeOffset CreatedTime { get; set; } = DateTimeOffset.UtcNow;
    }
}
