using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookShop.DAL.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedBookAndReviewTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "WritingDate",
                table: "Reviews",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "17 грудня 2024");

            migrationBuilder.AddColumn<string>(
                name: "CoverType",
                table: "Books",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "Тверда");

            migrationBuilder.AddColumn<int>(
                name: "PublicationYear",
                table: "Books",
                type: "int",
                nullable: false,
                defaultValue: 2024);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WritingDate",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "CoverType",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "PublicationYear",
                table: "Books");
        }
    }
}
