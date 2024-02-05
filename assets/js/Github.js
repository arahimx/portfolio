const accessToken = 'YOUR_GITHUB_ACCESS_TOKEN';
const username = 'arahimx';
const projectsContainer = document.querySelector('.project-list');

async function fetchProjects() {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`, {
      // headers: {
      //   Authorization: `token ${accessToken}`,
      // },
    });

    if (response.ok) {
      const projects = await response.json();
      projectsContainer.innerHTML = '';

      projects.forEach(async (project) => {
        const projectItem = document.createElement('div');
        projectItem.classList.add('project-item', 'active');

        projectItem.innerHTML = `
          <ol class="timeline-list">
            <li class="timeline-item">
              <h4 class="h4 timeline-item-title">${project.name}</h4>
              <span>${project.language || 'Uncategorized'}</span>
              <a href="https://github.com/arahimx/${project.name}" class="contact-title" target="_blank">
              ${project.name} &nbsp; <ion-icon name="open-outline"></ion-icon>
              </a>
            </li>
            <div class="commit-list" style="display: block;">
          </ol>
        `;

        projectsContainer.appendChild(projectItem);

        // Call the fetchCommits function to retrieve and display commits
        fetchCommits(project.name, projectItem.querySelector('.commit-list'));
      });
    } else {
      console.error('Failed to fetch projects from GitHub API');
    }
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
}

async function fetchCommits(repoName, commitList) {
  try {
    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}/commits`, {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    if (response.ok) {
      const commits = await response.json();
      commitList.innerHTML = '';

      commits.forEach((commit) => {
        const commitItem = document.createElement('div');
        commitItem.innerHTML = `<p>${commit.commit.author.name}: ${commit.commit.message}</p>`;
        commitList.appendChild(commitItem);
      });

      commitList.style.display = 'block';
    } else {
      console.error('Failed to fetch commits for', repoName);
    }
  } catch (error) {
    console.error('Error fetching commits:', error);
  }
}

fetchProjects();
