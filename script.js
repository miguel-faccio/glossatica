// Lista de todas as tags com ícones e matérias com imagens
const allTags = {
    Álgebra: {
        icon: "assets/icons/math_icon.png",
        materials: [
            {
                title: "Equações Polinomiais",
                description: "Resolução de polinômios e suas raízes.",
                link: "equacoes-polinomiais.html",
                image: "images/equacoes-polinomiais.jpg"
            },
            {
                title: "Sistemas Lineares",
                description: "Soluções de sistemas de equações lineares.",
                link: "sistemas-lineares.html",
                image: "images/sistemas-lineares.jpg"
            },
            {
                title: "Funções e Gráficos",
                description: "Estudo das funções e suas representações gráficas.",
                link: "funcoes.html",
                image: "images/funcoes.jpg"
            }
        ]
    },
    Geometria: {
        icon: "assets/icons/geometry_icon.png",
        materials: [
            {
                title: "Geometria Euclidiana",
                description: "Propriedades de triângulos, círculos e mais.",
                link: "geometria-euclidiana.html",
                image: "images/geometria-euclidiana.jpg"
            },
            {
                title: "Geometria Analítica",
                description: "Estudo de pontos, retas e planos no espaço.",
                link: "geometria-analitica.html",
                image: "images/geometria-analitica.jpg"
            },
            {
                title: "Trigonometria",
                description: "Relações entre ângulos e lados dos triângulos.",
                link: "trigonometria.html",
                image: "images/trigonometria.jpg"
            }
        ]
    },
    Estatística: {
        icon: "assets/icons/statisc_icon.png",
        materials: [
            {
                title: "Distribuições de Probabilidade",
                description: "Normais, binomiais e outras distribuições.",
                link: "distribuicoes.html",
                image: "images/probabilidade.jpg"
            },
            {
                title: "Estatística Descritiva",
                description: "Média, mediana, moda e medidas de dispersão.",
                link: "estatistica.html",
                image: "images/estatistica.jpg"
            },
            {
                title: "Inferência Estatística",
                description: "Testes de hipóteses e estimativas.",
                link: "inferencia.html",
                image: "images/inferencia.jpg"
            }
        ]
    },
};

const selectedTags = new Set();

const tagsSuggestionsDiv = document.getElementById("tagsSuggestions");
const selectedTagsDiv = document.getElementById("selectedTags");
const resultsContainer = document.getElementById("resultsContainer");

// Inicializar tags e exibir todos os cards
function initializeTags() {
    Object.keys(allTags).forEach(tag => {
        const tagElement = document.createElement("div");
        tagElement.className = "tag";

        const icon = document.createElement("img");
        icon.src = allTags[tag].icon;
        icon.alt = tag;

        const text = document.createElement("span");
        text.textContent = tag;

        tagElement.appendChild(icon);
        tagElement.appendChild(text);
        tagElement.onclick = () => addTag(tag);
        tagsSuggestionsDiv.appendChild(tagElement);
    });

    // Exibir todos os cards inicialmente
    updateResults(true);
}
// Adicionar uma tag ao conjunto de tags selecionadas
function addTag(tag) {
    if (!selectedTags.has(tag)) {
        selectedTags.add(tag);

        const tagElement = document.createElement("div");
        tagElement.className = "tag";

        const tagContent = document.createElement("span");
        tagContent.textContent = tag;

        const removeButton = document.createElement("span");
        removeButton.textContent = "x";
        removeButton.className = "remove-tag";
        removeButton.onclick = () => removeTag(tagElement, tag);

        tagElement.appendChild(tagContent);
        tagElement.appendChild(removeButton);
        selectedTagsDiv.appendChild(tagElement);

        updateResults();
    }
}

// Remover uma tag selecionada
function removeTag(tagElement, tag) {
    selectedTags.delete(tag);
    selectedTagsDiv.removeChild(tagElement);
    updateResults();
}

// Atualizar os resultados da pesquisa
function updateResults(showAll = false) {
    resultsContainer.innerHTML = "";

    if (showAll) {
        Object.keys(allTags).forEach(tag => {
            const materials = allTags[tag].materials || [];
            materials.forEach(material => createCard(material, tag));
        });
    } else {
        selectedTags.forEach(tag => {
            const materials = allTags[tag].materials || [];
            materials.forEach(material => createCard(material, tag));
        });
    }
}


// Criar um card com as informações da matéria
function createCard(material, tag) {
    const card = document.createElement("div");
    card.className = "card";

    // Tag associada ao conteúdo
    const tagLabel = document.createElement("div");
    tagLabel.className = "card-tag";
    tagLabel.textContent = tag;

    const image = document.createElement("img");
    image.src = material.image;
    image.alt = material.title;

    const title = document.createElement("h3");
    title.textContent = material.title;

    const description = document.createElement("p");
    description.textContent = material.description;

    const button = document.createElement("button");
    button.textContent = "Acessar";
    button.onclick = () => window.location.href = material.link;

    card.appendChild(tagLabel); // Adicionar a tag associada
   // card.appendChild(image);
    card.appendChild(title);
    card.appendChild(description);
    // card.appendChild(button);

    resultsContainer.appendChild(card);
}

// Buscar algo digitado
function performSearch() {
    const query = document.getElementById("searchInput").value.trim().toLowerCase();
    resultsContainer.innerHTML = "";

    Object.keys(allTags).forEach(tag => {
        const materials = allTags[tag].materials || [];
        materials
            .filter(material => material.title.toLowerCase().includes(query) || material.description.toLowerCase().includes(query))
            .forEach(material => createCard(material, tag)); // Passar a tag associada
    });
}

// Inicializar as tags ao carregar a página
initializeTags();

// ---------------------------------------------------------------| Site

// Ativar o link baseado na seção visível
window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".simple-header nav ul li a");

    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 50; // Ajuste do offset
        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});

// Alterar o estilo do header ao scroll
window.addEventListener("scroll", () => {
    const header = document.querySelector(".simple-header");
    if (window.scrollY > 100) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// Função para o botão de "Voltar ao Topo"
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Exibir botão de "Voltar ao Topo" somente após o scroll
window.addEventListener("scroll", () => {
    const backToTopButton = document.getElementById("backToTop");
    if (window.scrollY > 300) {
        backToTopButton.classList.add("show");
    } else {
        backToTopButton.classList.remove("show");
    }
});

// Autocomplete para barra de pesquisa
function autocompleteSuggestions(query) {
    const tagsSuggestionsDiv = document.getElementById("tagsSuggestions");
    tagsSuggestionsDiv.innerHTML = "";

    if (query.trim() === "") return;

    Object.keys(allTags).forEach(tag => {
        if (tag.toLowerCase().includes(query.toLowerCase())) {
            const suggestion = document.createElement("div");
            suggestion.className = "tag";
            suggestion.textContent = tag;
            suggestion.onclick = () => addTag(tag);
            tagsSuggestionsDiv.appendChild(suggestion);
        }
    });
}
