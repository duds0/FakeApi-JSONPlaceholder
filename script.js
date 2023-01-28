async function readPosts() {
    let postArea = document.querySelector(".posts");
    postArea.innerHTML = "Carregando";

    let response = await fetch("https://jsonplaceholder.typicode.com/posts");
    let json = await response.json();

    if (json.length > 0) {
        postArea.innerHTML = "";

        for (let i in json) {
            let postHtml = `<div><h1>${json[i].title}</h1>${json[i].body}<hr/></div>`;
            postArea.innerHTML += postHtml;
        }
    } else { postArea.innerHTML = "Nenhum post para exibir" }
}

function newPost() {
    let title = document.querySelector("#titleField");
    let body = document.querySelector("#bodyField");
    let divP = document.querySelector(".posts");

    let novoPost = `<div><h1>${title.value}</h1>${body.value}<hr/></div>`;

    divP.innerHTML += novoPost

    title.value = "";
    body.value = "";
}

document.querySelector("#insertButton").addEventListener("click", () => {
    let title = document.querySelector("#titleField").value;
    let body = document.querySelector("#bodyField").value;

    if (title && body) {
        newPost();
    } else { alert("Preencha todos os campos!"); throw new Error("Preencha todos os campos") }
}
)

readPosts();