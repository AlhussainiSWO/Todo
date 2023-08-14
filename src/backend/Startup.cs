using Microsoft.AspNetCore.Components.Web;
using Microsoft.OpenApi.Models;

namespace Backend
{
    public class Startup
    {
        public IConfiguration Configuration
        {
            get;
        }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigins",
                    builder =>
                    {
                        builder.WithOrigins("https://localhost:4200")
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });
            services.AddControllers().AddNewtonsoftJson();
            services.AddSwaggerGen((service) => service.SwaggerDoc("v1", new OpenApiInfo { Title = "MyFirstApi", Version = "v1" }));
        }

        public void Configure(WebApplication app)
        {
            //!ONLY FOR DEVELOPMENT
            app.UseCors("AllowSpecificOrigins");

            app.UseSwagger();
            app.UseSwaggerUI((app) => app.SwaggerEndpoint("/swagger/v1/swagger.json", "MyFirstSwaggerApi"));
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints((e) => { e.MapControllers(); e.MapFallbackToFile("/index.html"); });
            app.Run();
        }
    }
}