const escapeMovieObject = (unescapedObj) => {
    const escapedMovieObject = {};
    const escapedRatings = [];

    Object.entries(unescapedObj).forEach(([key, value]) => {
        if (typeof value === "string") {
            escapedMovieObject[key] = value.replace(/\'/g, String.raw`\'`);
        } else if (Array.isArray(value) ) {
            value.forEach(ratingObj => {
                escapedRatings.push({ Source: ratingObj.Source.replace(/\'/g, String.raw`\'`), Value: ratingObj.Value.replace(/\'/g, String.raw`\'`)})
            });
        } else {
            escapedMovieObject[key] = value;
        }
    });

    escapedMovieObject.Ratings = escapedRatings;
    
    return escapedMovieObject;
};

module.exports = escapeMovieObject;