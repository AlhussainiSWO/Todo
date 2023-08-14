using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class User
    {
        [Key]
        public Guid Id {get; set;}
        [Required]
        [Column(TypeName = "nvarchar(20)")]
        public string UserName {get; set;}

        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public string Password {get; set;}
        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public string Email {get; set;}
    }
}