/**
 * Obtain a post by id.
 */
CREATE PROCEDURE [dbo].[GetPostById]
	@PostId VARCHAR(50)
AS
BEGIN
	SELECT [Title], [Content], [Published], [CreatedAt], [UpdatedAt] FROM [Posts] WHERE [Id] = @PostId 
END
RETURN