using System.ComponentModel.DataAnnotations;

namespace ExpenseRecord
{

    public class ToDoListRequest
    {
        [Required]
        [StringLength(50)]
        public string Description { get; set; } = string.Empty;

        public string Type { get; set; } = string.Empty;

        public double Amount { get; set; } = new double();


    }

}
