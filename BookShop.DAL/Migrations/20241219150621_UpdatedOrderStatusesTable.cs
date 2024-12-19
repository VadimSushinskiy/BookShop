using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookShop.DAL.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedOrderStatusesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DeliveryType",
                table: "OrderStatuses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "Нова Пошта");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "OrderStatuses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "admin@gmail.com");

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "OrderStatuses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "+380974863665");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeliveryType",
                table: "OrderStatuses");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "OrderStatuses");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "OrderStatuses");
        }
    }
}
