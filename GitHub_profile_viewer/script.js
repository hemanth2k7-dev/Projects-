document.getElementById("user").addEventListener("keydown", function (event) {
  //Calls getuser when enter key is pressed
  if (event.key === "Enter") {
    getUser();
  }
});
async function getUser() {
    document.getElementById("profile-card").style.display="none";//To clear previous result
  document.getElementById("output").textContent = ""; //To clear the previous error message
  document.getElementById("repoList").innerHTML ="";
  const user = document.getElementById("user").value.trim();
  if (!user) {
    document.getElementById("output").textContent = "Please enter a Username";
    return;
  }
  try {
    const url = `https://api.github.com/users/${user}`;
    document.getElementById("output").textContent="Loading....";
    const [userRes,repoRes] = await Promise.all([fetch(url),fetch(`${url}/repos`)]);//return repos by user
    if (!userRes.ok) {
      throw new Error("User not found");
    }
    document.getElementById("profile-card").style.display="flex";//Get all elements with className and change value
    //Main profile part
    const data = await userRes.json().then(document.getElementById("output").textContent="");
    document.getElementById("profilepic").src = data.avatar_url;
    document.getElementById("name").textContent =
      `Name:${data.name || "No Name available"}`;
    document.getElementById("bio").textContent =
      `Bio:${data.bio || "No bio available"}`;
    document.getElementById("followers").textContent =
      `Followers:${data.followers}`;
    document.getElementById("following").textContent =
      `Following:${data.following}`;
    document.getElementById("repos").textContent =
      `Public Repos:${data.public_repos}`;

    //Profile repo part
    const repodata=await repoRes.json();
    repodata.forEach(repo => {
        if (repo.stargazers_count<=10) {
            const item=document.createElement("p");
        item.textContent=`Repo Name: ${repo.name}\nLanguage(mainly): ${repo.language||"No language available"}\n🌟${repo.stargazers_count}`;
        document.getElementById("repoList").appendChild(item);
        }
    });
  } catch (error) {
    document.getElementById("output").textContent = `Error: ${error.message}`;
    document.getElementById("profile-card").style.display="none";
  }
}
