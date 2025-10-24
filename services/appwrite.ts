import {Client, ID, Query, TablesDB} from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!;

const client = new Client()
    .setEndpoint(`${process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT}`)
    .setProject(`${process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID}`)
    .setPlatform(`${process.env.EXPO_PUBLIC_APPWRITE_PLATFORM}`);

const dataBase = new TablesDB(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
        const result = await dataBase.listRows({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            queries: [
                Query.equal('searchTerm', query)
            ]
        });

        const existingMovie = result.rows[0];
        await dataBase.upsertRow({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            rowId: existingMovie ? existingMovie.$id : ID.unique(),
            data: existingMovie ?
                {
                    ...existingMovie,
                    count: existingMovie.count + 1
                } : {
                    searchTerm: query,
                    movie_id: movie.id,
                    movie_title: movie.title,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    count: 1
                }
        });
    } catch (error) {
        console.error("Error updating search count:", error);
        throw error;
    }
}

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
    try {
        const result = await dataBase.listRows({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            queries:
                [
                    Query.limit(5),
                    Query.orderDesc('count')
                ]
        });

        return result.rows as unknown as TrendingMovie[];

    } catch (error) {
        console.error("Error fetching trending movies:", error);
        return undefined;
    }
}