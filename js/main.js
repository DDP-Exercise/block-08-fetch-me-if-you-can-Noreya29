"use strict";

/*******************************************************
 *    Asynchronotrigger - 100p
 *
 *    This is your last assignment. Finish this to proof that
 *    you are a grown up now, who doesn't need to be held by
 *    the hand.
 *
 *    Create a users-class. Fetch the users, create Instances.
 *    - https://jsonplaceholder.typicode.com/users
 *
 *    Create a posts-class. Fetch the posts. create Instances.
 *    Assign them to the users (see userId in the posts).
 *    - https://jsonplaceholder.typicode.com/posts
 *
 *    Print the shit. Beautifully:
 *    List the 10 users. On click, expand them with their posts.
 *    Each Post should also have a Button to "load comments".
 *    Yes, you are correct. This is the perfect usecase for
 *    event-delegation! You can get the comments to a post from either
 *    - https://jsonplaceholder.typicode.com/posts/1/comments
 *    or
 *    - https://jsonplaceholder.typicode.com/comments?postId=1
 *    where "1" stands for the posts ID of course.
 *
 *    I believe in...
 *    Noreya - 2026-06-21
 *  *******************************************************/

import User from "./class.user.js";
import Post from "./class.post.js";

const app = document.querySelector("#app");

//loading users
async function loadUsers() {
    const fetchUsers = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await fetchUsers.json();
    return data.map(user => new User(user));
}

//loading posts & assign user
async function loadPosts() {
    const loadPosts = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await loadPosts.json();

    data.forEach(p => {
        const post = new Post(p);
        const user = users.find(u => u.id === p.userId);
        user.addPost(post);
    })
}

//rendering users
function renderUsers(users) {
    app.innerHTML = "";
    users.forEach(user => {
        app.innerHTML += user.render();
    });
}

//event delegation
app.addEventListener("click", async (event) => {
    //showing user posts
    if (event.target.classList.contains("showingPosts")) {
        const userId = event.target.dataset.userId;
        const container = document.querySelector(`[data-posts-of="${userId}"]`);

        container.style.display = container.style.display === "none" ? "block" : "none";

        //rendering posts
        const userObj = users.find(u => u.id == userId);
        container.innerHTML = userObj.posts.map(p => p.render()).join("");
    }

    //loading comments
    if (event.target.classList.contains("loadComments")) {
        const postId = event.target.dataset.postId;
        const container = document.querySelector(`[data-comments-of="${postId}"]`);

        //only loading if it is empty
        if (container.innerHTML === "") {
            const loadingComments = await fetch("https://jsonplaceholder.typicode.com/comments?postId=1");
            const comments = await loadingComments.json();

            container.innerHTML = comments.map(comment => `<p><strong>${comment.email}</strong>: ${comment.body}</p>`).join("");
        }

        container.style.display = container.style.display === "none" ? "block" : "none";
    }
});

let users = [];

async function init() {
    users = await loadUsers();
    await loadPosts(users);
    renderUsers(users);
}

init();