using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Infrastructure;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly ILogger<UserController> logger;
        private readonly ApplicationDbContext dbContext;
        public TaskController(ILogger<UserController> _logger, ApplicationDbContext _dbContext){
            logger = _logger;
            dbContext = _dbContext;
        }
        [HttpPost("create")]
        public async Task<ActionResult<Models.Task>> CreateTask(Models.Task task, CancellationToken cancellationToken){
            User? user = dbContext.Users.Find(task.UserId);
            if(user == null) {
                return BadRequest("something went wrong!");
            }
            dbContext.Tasks.Add(task);
            await dbContext.SaveChangesAsync(cancellationToken);
            return Ok(task);
        }
        [HttpPost("complete")]
        public async Task<ActionResult<Models.Task>> CompleteTask(Guid taskId, CancellationToken cancellationToken){
            Models.Task? task = dbContext.Tasks.Find(taskId);
            if(task == null) {
                return BadRequest("Task not found!");
            }
            task.IsDone = true;
            await dbContext.SaveChangesAsync(cancellationToken);
            return Ok(task);
        }
        [HttpPost("update")]
        public async Task<ActionResult<Models.Task>> UpdateTask(Models.Task task, CancellationToken cancellationToken){
            dbContext.Tasks.Update(task);
            await dbContext.SaveChangesAsync(cancellationToken);
            return Ok(task);
        }
        [HttpPost("delete")]
        public async Task<ActionResult<Models.Task>> DeleteTask(Guid taskId, CancellationToken cancellationToken){
            Models.Task? task = dbContext.Tasks.Find(taskId);
            if(task == null) {
                return BadRequest("somthing went wrong!");
            }
            dbContext.Tasks.Remove(task);
            await dbContext.SaveChangesAsync(cancellationToken);
            return Ok(task);
        }
    }
}