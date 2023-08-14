using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Infrastructure;
using Backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> logger;
        private readonly ApplicationDbContext dbContext;
        public UserController(ILogger<UserController> _logger, ApplicationDbContext _dbContext){
            logger = _logger;
            dbContext = _dbContext;
        }
        [HttpPost("create")]
        public async Task<ActionResult<User>> CreateUser(User user, CancellationToken cancellationToken){
            dbContext.Users.Add(user);
            await dbContext.SaveChangesAsync(cancellationToken);
            return Ok(user);
        }
        // first option
        // public async Task<ActionResult<User>> LoginUser(string username, string password) {
        //     User? user = await dbContext.Users.FirstOrDefaultAsync((u) => u.UserName == username);

        //     if(user == null) {
        //         return BadRequest("user not found !");
        //     }
        //     if(user.Password != password) {
        //         return BadRequest(" username or password wrong!");
        //     }
        //     return Ok(user);
        // }
        [HttpPost("login")]
        public async Task<ActionResult<User>> LoginUser(LoginRequest loginRequest) {
            User? user = await dbContext.Users.FirstOrDefaultAsync((u) => u.UserName == loginRequest.UserName);

            if(user == null) {
                return BadRequest("user not found!");
            }
            if(user.Password != loginRequest.Password) {
                return BadRequest(" username or password wrong!");
            }
            return Ok(user);
        }
    }
}