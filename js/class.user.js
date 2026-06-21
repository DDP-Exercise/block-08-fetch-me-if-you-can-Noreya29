"use strict";

/*******************************************************
 *  Users
 *
 *  See: https://jsonplaceholder.typicode.com/users
 *
 *  Your users should have:
 *      -id
 *      -name
 *      -username
 *      -email
 *      -website
 *
 *  You can skip address, phone and company.
 *
 *  users should also have posts[] (see main.js).
 *
 *  When printing a user, don't forget to make
 *      - href="mailto:.." for the email and
 *      - href=".." target="_blank" for the website.
 *  *******************************************************/

export default class User {
    constructor({id, name, username, email, website}) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.website = website;

        this.posts = [];
    }

    addPost(post) {
        this.posts.push(post);
    }

    render() {
        return `
        <div class="user" data-user-id="${this.id}">
        <h2>${this.name}</h2>
        <p><strong>Username:</strong> ${this.username}</p>
        <p><a href="mailto:${this.email}">${this.email}</a></p>
        <p><a href="https://${this.website}" target="_blank">${this.website}</a></p>
        
        <button class="showingPosts" data-user-id="${this.id}">
        Show posts
        </button>
        
        <div class="posts-container" data-posts-of="1" style="display:none;"></div>
        </div>`;
    }
}