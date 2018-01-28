using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Web;
using ClearSkiesFAQsolution.Models;
using System.Diagnostics;

namespace ClearSkiesFAQsolution
{
    public class SporsmalDB
    {
        SporsmalContext db = new SporsmalContext();

        //Hente alle "ofte stilte spørsmål" (forhåndslagrede spørsmål med svar, ifra bedrift)
        public List<generellespm> hentAlleGenerelleSporsmal()
        {
            try
            {
                using (var db = new SporsmalContext())
                {
                    List<GenerelleSpm> alleGenerelleSporsmal = db.GenerelleSporsmal.ToList();
                    List<generellespm> listGenSporsmal = new List<generellespm>();

                    foreach (var k in alleGenerelleSporsmal)
                    {
                        generellespm genSporsmal = new generellespm
                        {
                            spmId = k.SpmId, //Hentes ut for senere bruk/utvikling av løsning
                            sporsmal = k.Sporsmal,
                            svar = k.Svar
                        };
                        listGenSporsmal.Add(genSporsmal);
                    }
                    return listGenSporsmal;
                }
            }
            catch (Exception error)
            {
                List<generellespm> listSporsmal = new List<generellespm>();
                Debug.WriteLine(error);
                return listSporsmal;
            }
        }



        //Hente alle spørsmål ifra ALLE kunder som har sendt inn spørsmål
        public List<kundespm> hentAlleKundeSporsmal()
        {
            try
            {
                using (var db = new SporsmalContext())
                {
                    List<KundeSpm> alleKundeSporsmal = db.KundeSporsmal.ToList();
                    List<kundespm> listKunSporsmal = new List<kundespm>();

                    foreach (var k in alleKundeSporsmal)
                    {
                        kundespm kunSporsmal = new kundespm
                        {
                            kundeid = k.KundeId, //Hentes ut for senere bruk/utvikling av løsning
                            epost = k.Epost,
                            sporsmal = k.Sporsmal,
                            svar = k.Svar
                        };
                        listKunSporsmal.Add(kunSporsmal);
                    }
                    return listKunSporsmal;
                }
            }
            catch (Exception error)
            {
                List<kundespm> listKundeSporsmal = new List<kundespm>();
                Debug.WriteLine(error);
                return listKundeSporsmal;
            }
        }

        //Lagre et kundespørsmål til DB
        public bool lagreEtKundeSporsmal(kundespm innSporsmal)
        {
            var nyttSporsmal = new KundeSpm
            {
                Epost = innSporsmal.epost,
                Sporsmal = innSporsmal.sporsmal
            };
            try
            {
                db.KundeSporsmal.Add(nyttSporsmal);
                db.SaveChanges();
            }
            catch(Exception error)
            {
                return false;
            }
            return true;
        }
    }
}