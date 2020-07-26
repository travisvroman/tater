
/**
 * Update a post by id.
 * Returns 1 on success, 0 on failure.
 */
CREATE PROCEDURE [dbo].[UpdatePost]
	@PostId VARCHAR(50),
	@Title NVARCHAR(255),
	@Content NTEXT,
	@Published BIT,
	@UpdatedAt DATETIME 
AS
BEGIN
	IF EXISTS(SELECT [Id] FROM [Posts] WHERE [Id] = @PostId )
		BEGIN
			UPDATE [Posts] SET 
				[Title] = @Title, 
				[Content] = @Content, 
				[Published] = @Published, 
				[UpdatedAt] = @UpdatedAt
			WHERE [Id] = @PostId 
			RETURN 1;
		END
	ELSE
		RETURN 0
END