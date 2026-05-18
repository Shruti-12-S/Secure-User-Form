const form = document.getElementById("userForm");
const message = document.getElementById("message");
const usersDiv = document.getElementById("users");

/* =========================
   SUBMIT FORM
========================= */

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const comment = document.getElementById("comment").value;

  try {
    const response = await fetch("/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        comment,
      }),
    });

    const data = await response.json();

    if (data.success) {
      message.innerHTML = `
        <p class="success">${data.message}</p>
      `;

      form.reset();

      fetchUsers();
    } else {
      message.innerHTML = `
        <p class="error">${data.message}</p>
      `;
    }
  } catch (err) {
    message.innerHTML = `
      <p class="error">Something went wrong</p>
    `;
  }
});

/* =========================
   FETCH USERS
========================= */

async function fetchUsers() {
  const response = await fetch("/users");

  const users = await response.json();

  usersDiv.innerHTML = "";

  users.forEach((user) => {

    /* =========================
       SAFE RENDERING
       Prevent DOM XSS
    ========================= */

    const card = document.createElement("div");
    card.className = "card";

    const username = document.createElement("h3");
    username.textContent = user.username;

    const comment = document.createElement("p");
    comment.textContent = user.comment;

    card.appendChild(username);
    card.appendChild(comment);

    usersDiv.appendChild(card);
  });
}

fetchUsers();