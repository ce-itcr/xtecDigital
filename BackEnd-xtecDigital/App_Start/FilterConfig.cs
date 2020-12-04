using System.Web;
using System.Web.Mvc;

namespace BackEnd_xtecDigital
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
