export interface WatchListDto{
    id: number
    contentId: number,
    userId: number,
    title: string,
    description: string,
    imDbRating: number,
    genre: string,
    posterPath: string,
    watched : boolean,
}