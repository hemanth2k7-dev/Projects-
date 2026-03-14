# GitHub Profile Viewer

A clean, minimal web app to search and view GitHub user profiles — built with vanilla HTML, CSS, and JavaScript using the GitHub REST API.

---

## Features

- Search any GitHub user by username
- Displays profile picture, name, and bio
- Shows follower, following, and public repo counts
- Lists public repositories (filtered to repos with ≤10 stars) with language and star count
- Enter key support for fast searching
- Error handling for invalid or empty usernames
- Smooth card animation on load

---

## Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Structure  | HTML5                   |
| Styling    | CSS3 (custom properties, flexbox, animations) |
| Logic      | Vanilla JavaScript (Async/Await, Fetch API) |
| Data       | GitHub REST API v3       |
| Font       | DM Sans (Google Fonts)  |

---

## API Used

**GitHub REST API**

```
GET https://api.github.com/users/{username}
GET https://api.github.com/users/{username}/repos
```

No authentication required. Public data only.

---

## Project Structure

```
github-profile-viewer/
├── index.html   → App layout and structure
├── style.css    → Dark theme styling with GitHub-inspired red accent
└── script.js    → API calls, DOM manipulation, error handling
```

---

## How to Run

No build tools or dependencies needed.

1. Clone or download the repository
2. Open `index.html` in any browser

```bash
git clone https://github.com/your-username/github-profile-viewer.git
cd github-profile-viewer
open index.html
```

---

## How It Works

1. User types a GitHub username and clicks **Search** (or presses **Enter**)
2. `getUser()` fires two `fetch()` calls in parallel:
   - One to `/users/{username}` for profile data
   - One to `/users/{username}/repos` for repository list
3. Profile data is rendered into the DOM
4. Repos with **10 or fewer stars** are displayed in a scrollable list
5. Errors (user not found, empty input) are shown inline

---

## Known Limitations

- GitHub API has a rate limit of **60 requests/hour** for unauthenticated requests
- Only shows repos with ≤10 stars (by design, to highlight smaller/personal projects)
- Repos are not sorted — displayed in default API order
- No pagination support for users with many repositories

---

## Possible Improvements

- [ ] Add GitHub token support to increase API rate limit
- [ ] Sort repos by stars or last updated date
- [ ] Make the star filter configurable
- [ ] Add a link to each repo on GitHub
- [ ] Add loading skeleton instead of plain "Loading..." text
- [ ] Support pagination for repo lists

---

## Author

Built by **Hemanth Kumar** as a JavaScript practice project.  
Focused on: Fetch API, Async/Await, DOM manipulation, error handling.