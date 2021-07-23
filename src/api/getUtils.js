export const getPosts = () => {

    return fetch(`https://jsonplaceholder.typicode.com/posts`)
        .then(response => {
            return response;
        }).catch(error => {
            console.log(error)
        });

}

export const getPhotos = () => {
    return fetch(`https://jsonplaceholder.typicode.com/photos`)
        .then(response => {
            return response;
        }).catch(error => {
            console.log(error)
        });
}

export const getSpecificSearch = (value) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${value}`)
        .then(response => {
            return response;
        }).catch(error => {
            console.log(error)
        });
}