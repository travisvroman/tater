/*

module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            title: String,
            description: String,
            published: Boolean
        },
        {
            timestamps: true
        }
    );

    schema.method( "toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    } );

    const post = mongoose.model( "post", schema );
    return post;
}*/


export class Post {
    public title: string;
    public description: string;
    public published: boolean;

    public constructor( title: string, description: string, published: boolean ) {
        this.title = title;
        this.description = description;
        this.published = published;
    }
}