
/**
 * Creates a new post with the given info.
 * Returns 1 on success, 0 on failure.
 */
CREATE PROCEDURE [dbo].[CreatePost]
	@PostId VARCHAR(50),
	@Title NVARCHAR(255),
	@Content NTEXT,
	@Published BIT,
	@CreatedAt DATETIME,
	@UpdatedAt DATETIME 
AS
BEGIN
	IF NOT EXISTS(SELECT [Id] FROM [Posts] WHERE [Id] = @PostId )
	BEGIN
		INSERT INTO [Posts] ([Id], [Title], [Content], [Published], [CreatedAt], [UpdatedAt])
			VALUES(@PostId, @Title, @Content, @Published, @CreatedAt, @UpdatedAt)
		RETURN 1
	END
	ELSE
	RETURN 0
END