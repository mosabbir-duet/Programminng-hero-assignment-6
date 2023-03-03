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
                    <img src="${tool.image}" class=" rounded-3" alt="..." style = "height:215px"/>
                    <div class="card-body">
                        <h5 class="card-title">Features</h5>
                        <ol>${tool.features.map((feature) => {
                        return `<li>${feature}</li>`;
                        }).join("")}
                        </ol>
                        <hr>
                        <div class = "d-flex justify-content-between align-items-center">
                            <div>
                            <h4 class="card-title">${tool.name}</h4>
                            <span><i class="fa-regular fa-calendar-days me-2 text-danger"></i>${tool.published_in}</span>
                            </div>

                            <div>
                                <span>
                                <i class="fa-solid fa-arrow-right-long bg-danger text-danger p-2 rounded-circle bg-opacity-25" ></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
  });
};



loadAItools();
