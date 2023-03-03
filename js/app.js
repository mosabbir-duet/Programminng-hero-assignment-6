const loadAItools = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => displayAiTools(data.data.tools));
};

const displayAiTools = (tools) => {
  console.log(tools);
  const aiToolsContainer = document.getElementById("ai-universe-tool");
  aiToolsContainer.innerHTML = "";
  tools.forEach((tool) => {
    aiToolsContainer.innerHTML += `
            <div class="col">
                <div class="card h-100 p-3">
                    <img src="${tool.image}" class="card-img-top rounded-3" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">Features</h5>
                        <ol>${tool.features.map((feature) => {
                        return `<li>${feature}</li>`;
                        }).join("")}
                        </ol>
                    </div>
                </div>
            </div>
        `;
  });
};



loadAItools();
