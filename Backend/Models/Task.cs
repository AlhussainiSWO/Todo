using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class Task
    {
        [Key]
        public Guid Id { get; set;}
        [Required]
        public Guid UserId { get; set;}
        [Required]
        public string Title {get; set;}
        public string? Description { get; set;}
        public bool IsDone { get; set;} = false;
        public DateTime CreatedDate { get; set;} = DateTime.Now;
        public DateTime? CompletedDate { get; set;}


    }
}