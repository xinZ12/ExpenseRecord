﻿using Microsoft.Extensions.Options;
using ExpenseRecord.Service;


namespace ExpenseRecord
{
    public class ToDoItemDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string CollectionName { get; set; } = null!;
    }


}
