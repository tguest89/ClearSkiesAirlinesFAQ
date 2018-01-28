using System;
using System.Data.Entity;
using System.Web;

namespace ClearSkiesFAQsolution.Models
{
    public class DBInit : DropCreateDatabaseAlways<SporsmalContext>
    {
        protected override void Seed(SporsmalContext context)
        {
            var generellespm1 = new GenerelleSpm
            {
                Sporsmal = "Hva er klokka hos deg nå?",
                Svar = "Den er det samme som hos deg!"
            };

            var generellespm2 = new GenerelleSpm
            {
                Sporsmal = "Går det an å bestille flere billetter samtidig?",
                Svar = "Ja det er mulig, følg denne veiledningen: Eksempel..."
            };

            var generellespm3 = new GenerelleSpm
            {
                Sporsmal = "Kan jeg betale reisen min med giro?",
                Svar = "Nei dessverre, vi benytter oss kun av nett og kortbetaling. Mvh ClearSkies Airlines"
            };

            var generellespm4 = new GenerelleSpm
            {
                Sporsmal = "Hvilke kredittkort kan jeg betale med?",
                Svar = "American Express, VISA, etc. Mvh ClearSkies Airlines"
            };

            var generellespm5 = new GenerelleSpm
            {
                Sporsmal = "Er det mulig å sette opp flere kontaktpersoner på reisen?",
                Svar = "Pr dagsdato så er det kun mulig å registrere en kontaktperson pr reise. Mvh ClearSkies Airlines"
            };

            var kundespm1 = new KundeSpm
            {
                Epost = "roger.kanin@gmail.com",
                Sporsmal = "Sete Nr mitt er A19, er sete A nærmest vindu eller gangen i flyet?",
                Svar = "'A' er starten på raden, og er derfor et vindu-sete. Mvh ClearSkies Airlines"
            };

            var kundespm2 = new KundeSpm
            {
                Epost = "snurre.sprett@gmail.com",
                Sporsmal = "Er det mulig å få vegetar mat på flyet? Gullerot f.eks?",
                Svar = "Det skal vi kunne ordne, Mvh ClearSkies Airlines"
            };

            var kundespm3 = new KundeSpm
            {
                Epost = "tom.jerry@gmail.com",
                Sporsmal = "Jeg lurte på om det er mulig å sette opp skumle feller for Jerry, på flyet?",
                Svar = "'Skumle' feller blir relativt. Så lenge det ikke går utover sikkerheten til de andre passasjerene."
            };
            
            
            context.GenerelleSporsmal.Add(generellespm1);
            context.GenerelleSporsmal.Add(generellespm2);
            context.GenerelleSporsmal.Add(generellespm3);
            context.GenerelleSporsmal.Add(generellespm4);
            context.GenerelleSporsmal.Add(generellespm5);
            context.KundeSporsmal.Add(kundespm1);
            context.KundeSporsmal.Add(kundespm2);
            context.KundeSporsmal.Add(kundespm3);

            base.Seed(context);
        }
    }
}
