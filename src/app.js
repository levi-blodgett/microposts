// Only upload the index, assets, and build files to the server in a real production environment

import { http } from './http';
import { ui } from './ui';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);

// Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

// Listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);

// Get Posts
function getPosts() {
    // returns promise, so .then(), and .catch() for errors
    http.get('http://localhost:3000/posts')
        .then(data => ui.showPosts(data))
        .catch(err => console.log(err));
}

// Submit Post
function submitPost() {
    const id = document.querySelector('#id').value;
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;

    const data = {
        // ES2015 syntax, if key and value are the same just type it like this
        title,
        body
    }

    // Validate inputs
    if (title === '' || body === '') {
        ui.showAlert('Please fill in all fields', 'alert alert-danger');
    } else {
        // Check for ID
        if (id === '') {
            // Create Post
            http.post('http://localhost:3000/posts', data)
            .then(data => {
                ui.showAlert('Post added', 'alert alert-success');
                ui.clearFields();
                getPosts();
            })
            .catch(err => console.log(err));
        } else {
            // Update Post
            http.put(`http://localhost:3000/posts/${id}`, data)
            .then(data => {
                ui.showAlert('Post updated', 'alert alert-success');
                ui.changeFormState('add');
                getPosts();
            })
            .catch(err => console.log(err));
        }
    
        
    }
}

// Delete Post
function deletePost(e) {
    e.preventDefault();
    
    if (e.target.parentElement.classList.contains('delete')) {
        const id = e.target.parentElement.dataset.id;

        if (confirm('Are you sure?')) {
            http.delete(`http://localhost:3000/posts/${id}`)
                .then(data => {
                    ui.showAlert('Post Removed', 'alert alert-success');
                    getPosts();
                })
                .catch(err => console.log(err));
        }
    }
}

// Enable Edit State
function enableEdit(e) {
    e.preventDefault();
    if (e.target.parentElement.classList.contains('edit')) {
        const id = e.target.parentElement.dataset.id;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const body = e.target.parentElement.previousElementSibling.textContent;

        const data = {
            id,
            title,
            body
        }

        // Fill form with current post
        ui.fillForm(data);
    }
}

// Cancel Edit State
function cancelEdit(e) {
    if (e.target.classList.contains('post-cancel')) {
        ui.changeFormState('add');
    }

    e.preventDefault();
}

// How to run json server
// npm run json:server