// Function to filter blog posts
function filterBlogs() {
    const searchInput = document.getElementById("search").value.toLowerCase();
    const posts = document.querySelectorAll(".post");

    posts.forEach(post => {
        const title = post.querySelector("h2").innerText.toLowerCase();
        if (title.includes(searchInput)) {
            post.style.display = "block";
        } else {
            post.style.display = "none";
        }
    });
}

// Handle Form Submission on Create Blog Page
document.getElementById("createBlogForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const title = document.getElementById("new-title").value;
    const content = document.getElementById("new-content").value;
    const category = document.getElementById("new-category").value;

    // Create a new blog post element
    const newPost = document.createElement("div");
    newPost.classList.add("post");
    newPost.innerHTML = `<h2><a href="javascript:void(0);">${title}</a></h2><p>${content}</p><p><em>Category: ${category}</em></p>`;

    // Append to blog list - Save temporarily in local storage for later use
    let blogPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    blogPosts.push({title, content, category});
    localStorage.setItem("blogPosts", JSON.stringify(blogPosts));

    alert('Blog post created successfully!');
    document.getElementById("createBlogForm").reset(); // Clear the form
});

// Handle Comment Submission
document.getElementById("comment-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const comment = document.getElementById("comment").value;
    const commentsDiv = document.getElementById("comments");

    const newComment = document.createElement("p");
    newComment.innerText = comment;
    commentsDiv.appendChild(newComment);
    
    document.getElementById("comment-form").reset(); // Clear the comment input
});

// Fetch and display existing blog posts from local storage on blog-list.html
window.onload = function() {
    const savedPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    const blogContainer = document.getElementById("blog-posts");

    savedPosts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `<h2><a href="javascript:void(0);">${post.title}</a></h2><p>${post.content}</p><p><em>Category: ${post.category}</em></p>`;
        blogContainer.appendChild(postElement);
    });
}