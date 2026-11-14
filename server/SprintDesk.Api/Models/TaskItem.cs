namespace SprintDesk.Api.Models
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Status { get; set; } = "submitted"; // submitted, inprogress, completed, reviewed
        public string Priority { get; set; } = "Medium";
        public string AssignedTo { get; set; } = string.Empty;
    }
}