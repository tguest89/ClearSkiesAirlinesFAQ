using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ClearSkiesFAQsolution.Models
{
    public class kundespm
    {
        public int kundeid { get; set; }
        [Required]
        [RegularExpression(@"^[a-zæøåA-ZÆØÅ0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$")]
        public string epost { get; set; }
        public string sporsmal { get; set; }
        public string svar { get; set; }
    }
}