using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Registry_Backend.Migrations
{
    /// <inheritdoc />
    public partial class removeRelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeviceHistory_AspNetUsers_AspNetUserId",
                table: "DeviceHistory");

            migrationBuilder.DropForeignKey(
                name: "FK_SoftwareHistory_AspNetUsers",
                table: "SoftwareHistory");

            migrationBuilder.DropIndex(
                name: "IX_SoftwareHistory_UserId",
                table: "SoftwareHistory");

            migrationBuilder.DropIndex(
                name: "IX_DeviceHistory_AspNetUserId",
                table: "DeviceHistory");

            migrationBuilder.DropColumn(
                name: "AspNetUserId",
                table: "DeviceHistory");

            migrationBuilder.CreateTable(
                name: "ApplicationLog",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false),
                    MachineName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Logged = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Level = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Logger = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    Callsite = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Exception = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationLog", x => x.Id);
                });

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeviceHistory_AspNetUsers",
                table: "DeviceHistory");

            migrationBuilder.DropTable(
                name: "ApplicationLog");

            migrationBuilder.DropIndex(
                name: "IX_DeviceHistory_UserId",
                table: "DeviceHistory");

            migrationBuilder.AddColumn<string>(
                name: "AspNetUserId",
                table: "DeviceHistory",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SoftwareHistory_UserId",
                table: "SoftwareHistory",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_DeviceHistory_AspNetUserId",
                table: "DeviceHistory",
                column: "AspNetUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_DeviceHistory_AspNetUsers_AspNetUserId",
                table: "DeviceHistory",
                column: "AspNetUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SoftwareHistory_AspNetUsers",
                table: "SoftwareHistory",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
