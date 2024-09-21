using Grocery.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Grocery.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly SymmetricSecurityKey _key;
        private readonly GroceryDbContext _con;
        public TokenController(IConfiguration configuration, GroceryDbContext con)
        {
            _key = new SymmetricSecurityKey(UTF8Encoding.UTF8.GetBytes(configuration["Key"]!));
            _con = con;
        }
        [HttpPost]
        public async Task< IActionResult>  GenerateToken(User user)
        {
            string token = string.Empty;

            if (ValidateUser(user.Email, user.Password))
            {
                var claims = new List<Claim>
                  {
                    new Claim(JwtRegisteredClaimNames.Name,user.Name),
                      new Claim(JwtRegisteredClaimNames.Email,user.Email),
                      new Claim(ClaimTypes.Role,user.Role)

                  };
                var cred = new SigningCredentials(_key, SecurityAlgorithms.HmacSha256);
                var tokenDescription = new SecurityTokenDescriptor
                {
                    SigningCredentials = cred,
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.Now.AddMinutes(20)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var createToken = tokenHandler.CreateToken(tokenDescription);
                token = tokenHandler.WriteToken(createToken);
                return Ok(new {token = token});
            }
            else
            {
                return Unauthorized();
            }
        }
        private bool ValidateUser(string email, string password)
        {
            var users = _con.Users.ToList();
            var user = users.FirstOrDefault(u => u.Email == email && u.Password == password);
            if (user != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
