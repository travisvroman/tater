using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using TaterAPI.Data;

namespace TaterAPI {

    /// <summary>
    /// The startup object which bootstraps services and routing.
    /// </summary>
    public class Startup {

        /// <summary>
        /// Creates a new startup object.
        /// </summary>
        /// <param name="configuration"></param>
        public Startup( IConfiguration configuration ) {
            Configuration = configuration;
        }

        /// <summary>
        /// The configuration.
        /// </summary>
        public IConfiguration Configuration { get; }

        /// <summary>
        /// This method gets called by the runtime. Additional services may be injected here.
        /// </summary>
        /// <param name="services"></param>
        public void ConfigureServices( IServiceCollection services ) {

            // Allow Cross-Origin. Add service
            services.AddCors();

            // Add the post data provider.
            services.AddSingleton<IPostDataProvider, SQLPostDataProvider>();

            // NOTE: To test without a database, comment the above line and uncomment the below line.
            //services.AddSingleton<IPostDataProvider, InMemoryPostDataProvider>();            

            services.AddControllers();
        }

        /// <summary>
        /// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// </summary>
        /// <param name="app"></param>
        /// <param name="env"></param>
        public void Configure( IApplicationBuilder app, IWebHostEnvironment env ) {
            if( env.IsDevelopment() ) {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            // Use the CORS service. Note that in a production environment the driving configuration should be expanded
            // to allow greater control over this.
            string[] allowedCorsHosts = Configuration["AllowedCorsHosts"].Split( "|" );
            app.UseCors( options => { options.WithOrigins( allowedCorsHosts ).AllowAnyHeader().AllowAnyMethod(); } );

            app.UseAuthorization();

            app.UseEndpoints( endpoints => {
                endpoints.MapControllers();
            } );
        }
    }
}
