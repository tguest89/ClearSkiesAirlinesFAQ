using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;

namespace ClearSkiesFAQsolution.Models
{
    public class GenerelleSpm
    {
        [Key]
        public int SpmId { get; set; }
        public string Sporsmal { get; set; }
        public string Svar { get; set; }
    }

    public class KundeSpm
    {
        [Key]
        public int KundeId { get; set; }
        public string Epost { get; set; }
        public string Sporsmal { get; set; }
        public string Svar { get; set; }
    }



    public class SporsmalContext : DbContext
    {
        public SporsmalContext() : base("name=SporsmalDb")
        {
            Database.CreateIfNotExists();
            //Database.SetInitializer(new DBInit());
        }

        public DbSet<KundeSpm> KundeSporsmal { get; set; }
        public DbSet<GenerelleSpm> GenerelleSporsmal { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }

}