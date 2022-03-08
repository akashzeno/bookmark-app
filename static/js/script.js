const modal = document.querySelector('#modal');
const modalShow = document.querySelector('#show-modal');
const modalClose = document.querySelector('#close-modal');
const bookmarkForm = document.querySelector('#bookmark-form');
const websiteNameElement = document.querySelector('#website-name');
const websiteUrlElement = document.querySelector('#website-url');
const bookmarksContainer = document.querySelector('#bookmarks-container');
const UrlRegex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;


// Show Modal, Focus on Input
function showModal() {
    modal.classList.add('show-modal');
    websiteNameElement.focus();
}

// Create Bookmark and Update Local Storage
function createBookmark(event) {
    event.preventDefault();
    const websiteName = websiteNameElement.value;
    const websiteUrl = "https://" + websiteUrlElement.value;

    if (websiteName && websiteUrl.match(UrlRegex)) {
        const favicon = `https://www.google.com/s2/favicons?domain=${websiteUrl}`;

        const bookmark = `<div class="item">
                <span class="fas fa-times delete-bookmark close-icon-bookmark" title="Delete Bookmark"></span>
                    <div class="name">
                        <img src=${favicon} alt="Favicon">
                        <a href=${websiteUrl} target="_blank">${websiteName}</a>
                    </div>
                </div>`
        bookmarksContainer.innerHTML += bookmark;
        localStorage.setItem('bookmarks', bookmarksContainer.innerHTML);
        modal.classList.remove('show-modal');
    }
    else {
        alert('Please enter a valid URL');
    }
}

// Delete Bookmark and Update Local Storage
function deleteBookmark(event) {
    if (event.target.classList.contains('delete-bookmark')) {
        event.target.parentElement.remove();
        localStorage.setItem('bookmarks', bookmarksContainer.innerHTML);
    }
}

// Modal Event Listeners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', (event)=>{event.target === modal ? modal.classList.remove("show-modal") : false;})
window.addEventListener('click', deleteBookmark)

// Event Listener for Bookmark Form
bookmarkForm.addEventListener('submit', createBookmark);
// Getting Bookmarks from Local Storage on window load
bookmarksContainer.innerHTML = localStorage.getItem('bookmarks');
