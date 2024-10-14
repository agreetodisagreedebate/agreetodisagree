document.querySelector('.publish-button').addEventListener('click', function () {
    const commentInput = document.querySelector('.comment-input');
    const commentText = commentInput.value.trim();
    
    if (commentText) {
        addComment(commentText);
        commentInput.value = ''; // Clear the input field after publishing
    }
});

function addComment(text) {
    const commentList = document.querySelector('.comments-list');
    const comment = document.createElement('div');
    comment.className = 'comment';
    comment.innerHTML = `
        <p>${text}</p>
        <span class="comment-like">👍 Like</span>
    `;
    commentList.appendChild(comment);
}

// Use event delegation for handling like button interactions
document.querySelector('.comments-list').addEventListener('click', function(event) {
    if (event.target.classList.contains('comment-like')) {
        showLikeOptions(event);
    }
});

function showLikeOptions(event) {
    const likeOptions = document.getElementById('like-options');
    const rect = event.target.getBoundingClientRect();
    
    likeOptions.style.display = 'block';
    likeOptions.style.left = rect.left + 'px';
    likeOptions.style.top = (rect.bottom + window.scrollY) + 'px';

    function hideLikeOptions(e) {
        if (!likeOptions.contains(e.target) && e.target !== event.target) {
            likeOptions.style.display = 'none';
            document.removeEventListener('click', hideLikeOptions);
        }
    }

    document.addEventListener('click', hideLikeOptions);
}

document.getElementById('like-options').addEventListener('click', function(event) {
    if (event.target.classList.contains('emoji')) {
        const likeButton = document.querySelector('.comment-like:hover');
        if (likeButton) {
            likeButton.textContent = event.target.textContent + ' Like';
        }
        this.style.display = 'none';
    }
});