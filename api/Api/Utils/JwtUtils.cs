using Common;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Api.Utils
{
    public class JwtUtils
    {
        public static string JwtIssuer = "crm-api";
        public static string JwtAudience = "crm-api";

        public static string CreateToken(string username, string signingKey, string signingAlgorithm)
        {
            List<Claim> claims = new List<Claim> {
                new Claim("username", username),
                // TODO: Add relevant information
            };

            var key = Convert.FromBase64String(signingKey);
            JwtHeader header = new JwtHeader(new SigningCredentials(new SymmetricSecurityKey(key),
                signingAlgorithm));

            var expirationTime = DateTime.Now.Add(Config.JwtExpirationTime);
            var payload = new JwtPayload(JwtIssuer, JwtAudience, claims, DateTime.Now, expirationTime);

            JwtSecurityToken securityToken = new JwtSecurityToken(header, payload);

            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }

        public static ClaimsPrincipal ValidateToken(string token, string signingKey)
        {
            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();

            var key = Convert.FromBase64String(signingKey);

            TokenValidationParameters validationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                RequireSignedTokens = true,
                ValidateLifetime = true,
                ValidIssuer = JwtIssuer,
                ValidAudience = JwtAudience,
                IssuerSigningKey = new SymmetricSecurityKey(key)
            };


            try
            {
                SecurityToken unusedSecurityToken;
                return handler.ValidateToken(token, validationParameters, out unusedSecurityToken);
            }
            catch (SecurityTokenValidationException)
            {
                // TODO: Log the reason for the validation failure
                return null;
            }
            catch (ArgumentException)
            {
                // TODO: Log the reason for the argument exception. For example the invalid argument.
                return null;
            }
        }

    }
}