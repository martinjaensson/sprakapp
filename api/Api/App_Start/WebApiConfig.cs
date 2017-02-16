using Newtonsoft.Json.Serialization;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Api
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Enable CORS (Cross-Origin Resource Sharing)
            // The purpose of this is to set the Access-Control-Allow-Origin header on responses making the client
            // allow requests which normally would violate the same-origin security policy.
            // TODO: Add only origins needed by the client. The code below allows all origins.
            var corSettings = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(corSettings);

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "ExApi",
                routeTemplate: "{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            // Web API filters
            //config.Filters.Add(new CrmValidationFilterAttribute());
            //config.Filters.Add(new CrmExceptionFilterAttribute());

            // JsonFormatter settings

            // Add text/html to the supported media types for the JSON Encoder.
            // The result of this is that clients sending this media type will get JSON instead of XML.
            // This setting is mainly useful for testing the API from a browser.
            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));

            // Serialize property names as Camel Case. This makes it possible to keep normal naming conventions both for C# and JavaScript.
            var settings = config.Formatters.JsonFormatter.SerializerSettings;
            settings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }
    }
}
