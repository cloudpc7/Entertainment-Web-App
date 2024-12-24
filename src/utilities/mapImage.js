export const mapImage = (arr) => {
    return arr.map((item) => {
        if (!item.url) {
            console.warn('Missing URL for item:', item); // Log the missing URL
            return {
                ...item,
                image: null, // or some default image
            };
        }

        try {
            return {
                ...item,
                image: require(`../app/assets/images/${item.url}`) // Make sure the path is correct
            };
        } catch (error) {
            console.error('Error loading image for item:', item, error);
            return {
                ...item,
                image: null,
            };
        }
    });
};