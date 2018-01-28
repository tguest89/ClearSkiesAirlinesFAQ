using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Script.Serialization;
using System.Net.Http.Formatting;
using System.Data.Common;
using ClearSkiesFAQsolution.Models;

namespace ClearSkiesFAQsolution.Controllers
{
    public class SporsmalController : ApiController
    {
        SporsmalDB sporsmalDb = new SporsmalDB();

        //Endret WebApiConfig.cs til å følge denne strukturen: routeTemplate: "api/{controller}/{action}"


        //GET api/SporsmalController/GenerelleSpm
        [HttpGet]
        public HttpResponseMessage getGenerelleSpm()
        {
            List<generellespm> alleGenerelleSpm = sporsmalDb.hentAlleGenerelleSporsmal();

            var Json = new JavaScriptSerializer();
            string JsonStr = Json.Serialize(alleGenerelleSpm);

            return new HttpResponseMessage()
            {
                
                Content = new StringContent(JsonStr, Encoding.UTF8, "application/json"),
                StatusCode = HttpStatusCode.OK 

            };

        }

        //GET api/SporsmalController/KundeSpm
        [HttpGet]
        public HttpResponseMessage getKundeSpm()
        {
            List<kundespm> alleKundeSpm = sporsmalDb.hentAlleKundeSporsmal();

            var Json = new JavaScriptSerializer();
            string JsonStr = Json.Serialize(alleKundeSpm);

            return new HttpResponseMessage()
            {

                Content = new StringContent(JsonStr, Encoding.UTF8, "application/json"),
                StatusCode = HttpStatusCode.OK

            };
        }

        //POST api/SporsmalController/KundeSpm
        [HttpPost]
        public HttpResponseMessage KundeSpm([FromBody]kundespm innSporsmal)
        {
            
            if (ModelState.IsValid)
            {
                bool ok = sporsmalDb.lagreEtKundeSporsmal(innSporsmal);

                if (ok)
                {
                    return new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.OK
                    };
                }
            }
            return new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.BadRequest,
                Content = new StringContent("Feil oppstod! Kunne ikke lagre spørsmål til databasen.")
            };
        }
    }
}
