export const search = (item,movies) => {
    
    try {

        if(!item) {
            return[];
        };

        const searchTerms = item.toLowerCase().trim().split(/\s+/);
        const  movieTitles = movies.filter((movie) => {
            const movieTitle = movie.title.toLowerCase().trim().split(/\s+/);
            return searchTerms.some(term => movieTitle.includes(term));
        });
        return movieTitles;
        
    } catch (error) {
        console.error(error);
        return [];
    }
}