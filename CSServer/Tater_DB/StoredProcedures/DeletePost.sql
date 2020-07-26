/**
 * Delete a post by id.
 * Returns 1 on success, 0 on failure.
 */
CREATE PROCEDURE [dbo].[DeletePost]
	@PostId VARCHAR(50)
AS
BEGIN
	IF EXISTS(SELECT [Id] FROM [Posts] WHERE [Id] = @PostId )
		BEGIN
			DELETE FROM [Posts]
			WHERE [Id] = @PostId 
			RETURN 1;
		END
	ELSE
		RETURN 0
END