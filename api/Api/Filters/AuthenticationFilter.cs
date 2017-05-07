using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Principal;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Filters;
using Api.Utils;
using Common;

namespace Api.Filters
{
    public class AuthenticationFilter : Attribute, IAuthenticationFilter
    {
        private readonly string _signingKey;

        public AuthenticationFilter()
        {
            _signingKey = Config.JwtSigningKey;
        }

        public bool AllowMultiple => false;

        public Task AuthenticateAsync(HttpAuthenticationContext context, CancellationToken cancellationToken)
        {
            // 1. Look for credentials in the request.
            HttpRequestMessage request = context.Request;
            AuthenticationHeaderValue authorization = request.Headers.Authorization;

            // 2. If there are no credentials, do nothing.
            if (authorization == null)
            {
                return Task.CompletedTask;
            }

            // 3. If there are credentials but the filter does not recognize the 
            //    authentication scheme, do nothing.
            if (authorization.Scheme != "Bearer")
            {
                return Task.CompletedTask;
            }

            // 4. If there are credentials that the filter understands, try to validate them.
            // 5. If the credentials are bad, set the error result.
            if (string.IsNullOrEmpty(authorization.Parameter))
            {
                //context.ErrorResult = new JwtAuthenticationFilterFailureResult("Missing credentials", request);
                return Task.CompletedTask;
            }

            IPrincipal principal = JwtUtils.ValidateToken(authorization.Parameter, _signingKey);
            if (principal == null)
            {
                //context.ErrorResult = new JwtAuthenticationFilterFailureResult("Invalid JWT token", request);
            }

            // 6. If the credentials are valid, set principal.
            else
            {
                context.Principal = principal;
            }

            return Task.CompletedTask;
        }

        public Task ChallengeAsync(HttpAuthenticationChallengeContext context, CancellationToken cancellationToken)
        {
            var challenge = new AuthenticationHeaderValue("Bearer");
            //context.Result = new JwtAuthenticationFilterAddChallengeOnUnauthorizedResult(challenge, context.Result);
            return Task.FromResult(0);
        }
    }
}