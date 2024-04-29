using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ContosoUniversityBackend.Migrations
{
    /// <inheritdoc />
    public partial class changeCourseAssignment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Id",
                table: "CourseAssignments");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "CourseAssignments",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
