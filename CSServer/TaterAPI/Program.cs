using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace TaterAPI {

    /// <summary>
    /// The main static class of the application which houses the entry point.
    /// </summary>
    public class Program {

        /// <summary>
        /// The entry point into the application.
        /// </summary>
        /// <param name="args">Command-line arguments.</param>
        public static void Main( string[] args ) {
            CreateHostBuilder( args ).Build().Run();
        }

        /// <summary>
        /// Creates the web hosts and starts them.
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        public static IHostBuilder CreateHostBuilder( string[] args ) =>
            Host.CreateDefaultBuilder( args )
            .ConfigureLogging( logging => {
                logging.ClearProviders();
                logging.AddConsole();
            } )
                .ConfigureWebHostDefaults( webBuilder => {
                    webBuilder.UseStartup<Startup>();
                } );
    }
}
