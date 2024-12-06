using BookShop.Shared.DTO;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BookShop.BLL.Tools
{
    public class JwtProvider
    {
        public JwtProvider(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private readonly IConfiguration _configuration;

        public string GenerateToken(UserDTO user)
        {
            var options = _configuration.GetSection("JwtOptions");
            Claim[] claims = [new Claim(ClaimsIdentity.DefaultNameClaimType, user.Name), new Claim(ClaimsIdentity.DefaultRoleClaimType, user.Role)];

            JwtSecurityToken token = new JwtSecurityToken(
                claims: claims,
                signingCredentials: new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(options["SecretKey"]!)),
                    SecurityAlgorithms.HmacSha256
                    ),
                expires: DateTime.UtcNow.AddHours(double.Parse(options["ExpiresHours"]!))
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
