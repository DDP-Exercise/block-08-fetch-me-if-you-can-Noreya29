"use strict";

/*******************************************************
 *  Posts
 *
 *  See: https://jsonplaceholder.typicode.com/posts
 *
 *  Your posts should have:
 *      -id
 *      -title
 *      -body
 *
 *  You can skip the userId, your users know their posts (see class.user.js)
 *
 *  posts should also have comments[] (see main.js).
 *
 *  When printing a post, don't forget to make a button that
 *  loads the comments for the post. Once they are loaded, print them.
 *  *******************************************************/

export default class Post {
    constructor({id, title, body}) {
        this.id = id;
        this.title = title;
        this.body = body;

        this.comments = [];
    }

    addComment(comment) {
        this.comments.push(comment);
    }

    render() {
        return `
        <div class="post" data-post-id="${this.id}">
        <h3>${this.title}</h3>
        <p>${this.body}</p>
        
        <button class="loadComments" data-post-id="${this.id}">
        Load comments
        </button>
        <div class="comments-container" data-comments-of="${this.id}" style="display:none;"></div>
        
        </div>`;
    }
}