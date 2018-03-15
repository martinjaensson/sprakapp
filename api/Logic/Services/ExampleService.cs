using Logic.Database;
using Logic.Database.Entities;
using System.Collections.Generic;
using System.Data.Entity;
using System.Threading.Tasks;

namespace Logic.Services
{
    public class ExampleService
    {

        private DatabaseContext _context;

        public ExampleService(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<ICollection<Example>> List()
        {
            var res = await _context.Examples.ToListAsync();
            return res;
        }

        public bool Create()
        {
            //var testService = new TestService();
            //return testService.Create();
            return false;
        }

    }
}
