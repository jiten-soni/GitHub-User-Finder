let searchBtn = document.querySelector(".search")
let usernameinp = document.querySelector(".usernameinp")
let card = document.querySelector(".card")


function getProfileData(username) {
    return fetch(`https://api.github.com/users/${username}`).then((raw) => {
        if (!raw.ok) throw new Error("User not found.");
        return raw.json();
    });
}

function getRepos(username) {
    return fetch(`https://api.github.com/users/${username}/repos?sort=updated`).then(raw => {
        if (!raw.ok) throw new Error("Failed to fetch repos...");
        return raw.json();
    });
}

function decorateProfileData(details) {
    let data = `<div class="flex items-center gap-6">
        <img src="${details.avatar_url}" alt="User Avatar"
            class="w-20 h-20 rounded-full border border-gray-700" />
        <div>
            <h2 class="text-xl font-semibold">${details.name}</h2>
            <p class="text-gray-400 text-sm">@${details.login}</p>
            <p class="text-gray-300 mt-2">${details.bio ? details.bio : "Sorry there is no bio..."}</p>
        </div>
    </div>

    <div class="mt-6 grid grid-cols-3 gap-4 text-center">
        <div>
            <p class="text-lg font-bold">${details.public_repos}</p>
            <p class="text-gray-400 text-sm">Public Repos</p>
        </div>
        <div>
            <p class="text-lg font-bold">${details.followers}</p>
            <p class="text-gray-400 text-sm">Followers</p>
        </div>
        <div>
            <p class="text-lg font-bold">${details.following}</p>
            <p class="text-gray-400 text-sm">Following</p>
        </div>
    </div>

    <div class="flex  justify-evenly mt-6 text-sm text-gray-400 space-y-1">
        <p class="flex gap-5"><strong>Location:</strong>${details.location}</p>
        <p class="flex gap-5"><strong>Company:</strong>${details.company ? details.company : "N/A"}</p>
        <p class="flex gap-5"><strong>Blog:</strong><a href="#" target="_blank" 
            class="text-blue-400  hover:underline">${details.blog}</a>
        </p>
    </div>`

    card.innerHTML = data;
}


searchBtn.addEventListener("click", function () {
    let username = usernameinp.value.trim();
    if (username.length > 0) {
        getProfileData(username).then((data) => {
            decorateProfileData(data)
        })
    } else {
        alert();
    }
})


