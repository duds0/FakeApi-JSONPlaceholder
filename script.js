// https://jsonplaceholder.typicode.com/posts

async function readPosts() {
    let postArea = document.querySelector(".posts");
    postArea.innerHTML = "Carregando";

    let response = await fetch("https://jsonplaceholder.typicode.com/posts");
    let json = await response.json();

    if (json.length > 0) {
        postArea.innerHTML = "";

        for (let i in json) {
            let postHtml = `<div><h1>${json[i].title}</h1>${json[i].body}<hr/></div>`; 4
            postArea.innerHTML += postHtml;
        }
    } else { postArea.innerHTML = "Nenhum post para exibir" }
}

const startTime = performance.now();
async function addNewPost(title, body) {
    await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                body,
                title,
                userID: 7
            })
        }
    ).then(response => {
        const endTime = performance.now();
        const responseTime = endTime - startTime;
        console.log(`Tempo de resposta: ${responseTime}ms`);
    });

    readPosts();
};

document.querySelector("#insertButton").addEventListener("click", () => {
    let title = document.querySelector("#titleField").value;
    let body = document.querySelector("#bodyField").value;

    setTimeout(function myNewPost() {
        let title = document.querySelector("#titleField");
        let body = document.querySelector("#bodyField");
        let divP = document.querySelector(".posts");

        let novoPost = `<div><h1>${title.value}</h1>${body.value}<hr/></div>`;

        divP.innerHTML += novoPost;

        title.value = "";
        body.value = "";
    }, 2000);

    if (title && body) {
        addNewPost(title, body);
    } else { alert("Preencha todos os campos!"); throw new Error("Preencha todos os campos") }
}
);

readPosts();