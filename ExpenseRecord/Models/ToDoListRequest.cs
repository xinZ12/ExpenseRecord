using System.ComponentModel.DataAnnotations;

namespace ExpenseRecord
{

    public class ToDoListRequest
    {
        [Required]
        [StringLength(50)]
        public string Description { get; set; } = string.Empty;
        public bool Done { get; set; }


    }

}
