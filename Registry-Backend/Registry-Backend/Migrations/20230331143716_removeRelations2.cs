using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Registry_Backend.Migrations
{
    /// <inheritdoc />
    public partial class removeRelations2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_DeviceHistory_UserId",
                table: "DeviceHistory",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_DeviceHistory_AspNetUsers",
                table: "DeviceHistory",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
