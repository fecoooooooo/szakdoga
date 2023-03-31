using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Registry_Backend.Migrations
{
    /// <inheritdoc />
    public partial class removeThatrelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropUniqueConstraint(
                name: "FK_SoftwareHistory_AspNetUsers",
                table: "DeviceHistory");

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
