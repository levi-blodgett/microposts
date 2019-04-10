import { http } from './http';
import { ui } from './ui';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Get Posts
function getPosts() {
    // returns promise, so .then(), and .catch() for errors
    http.get('http://localhost:3000/posts')
        .then(data => ui.showPosts(data))
        .catch(err => console.log(err));
}

// Submit Post
function submitPost() {
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;

    const data = {
        // ES2015 syntax, if key and value are the same just type it like this
        title,
        body
    }

    // Create Post
    http.post('http://localhost:3000/posts', data)
    .then(data => {
        ui.showAlert('Post added', 'alert alert-success');
        ui.clearFields();
        getPosts();
    })
    .catch(err => console.log(err));
}

// How to run json server
// npm run json:server