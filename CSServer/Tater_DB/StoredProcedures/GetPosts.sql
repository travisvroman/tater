/**
 * Obtain a listing of posts by title. If no title is passed (""), 
 * all posts are returned.
 */

CREATE PROCEDURE [dbo].[GetPosts]
	@Title NVARCHAR(255)
AS
BEGIN
	IF( @Title != N'' )
		SELECT [Id], [Title], [Published], [CreatedAt], [UpdatedAt] FROM [Posts] WHERE [Title] LIKE @Title ORDER BY [CreatedAt]
	ELSE
		SELECT [Id], [Title], [Published], [CreatedAt], [UpdatedAt] FROM [Posts] ORDER BY [CreatedAt]
END
RETURN