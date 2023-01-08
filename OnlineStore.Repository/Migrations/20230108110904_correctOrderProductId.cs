using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineStore.Repository.Migrations
{
    public partial class correctOrderProductId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "OrderProductsId",
                table: "OrderProducts",
                newName: "OrderProductId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "OrderProductId",
                table: "OrderProducts",
                newName: "OrderProductsId");
        }
    }
}
