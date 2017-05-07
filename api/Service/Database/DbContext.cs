using System;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Security.Principal;

namespace Service.Database
{
    public class DbContext : System.Data.Entity.DbContext
    {
        public DbContext(IIdentity authenticatedUser)
        {
            _authenticatedUser = authenticatedUser;

            // Log all database access.
            // TODO: Put this as configuration setting and use a logging fwk instead of standard out.
            Database.Log = Console.Write;
        }

        private readonly IIdentity _authenticatedUser;

        private const string DatabaseSchema = "dbo";

        // Work-around to ensure that the provider DLL is included.
        // This is needed to ensure that the provider DLL is included for other projects referencing this assembly.
        public bool InstanceExists => System.Data.Entity.SqlServer.SqlProviderServices.Instance != null;


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            // Configure code conventions
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Conventions.Add(new DateTime2Convention());
            modelBuilder.HasDefaultSchema(DatabaseSchema);

            // Build the model by adding all classes implementing EntityTypeConfiguration<T>
            modelBuilder.Configurations.AddFromAssembly(GetType().Assembly);
        }


        /// <summary>
        /// Ensures that all DateTime properties are mapped to DateTime2 (instead of the default mapping to datetime).
        /// </summary>
        public class DateTime2Convention : Convention
        {
            public DateTime2Convention()
            {
                Properties<DateTime>().Configure(c => c.HasColumnType("datetime2"));
            }
        }
    }
}