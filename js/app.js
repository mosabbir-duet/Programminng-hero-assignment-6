const loadAItools = (flag) => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => displayAiTools(data.data.tools,flag));
};

const displayAiTools = (tools,flag) => {
  console.log(tools);
  const aiToolsContainer = document.getElementById("ai-universe-tool");
  aiToolsContainer.innerHTML = "";
  if(flag && tools.length > 6){
    tools = tools.slice(0,6);
    document.getElementById('see-more').classList.remove('d-none');
  }
  else {
    document.getElementById('see-more').classList.add('d-none');
  }
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
                                <i class="fa-solid fa-arrow-right-long bg-danger text-danger p-2 rounded-circle bg-opacity-25" data-bs-toggle="modal" data-bs-target="#aiModal" onclick = "loadAiId('${tool.id}')"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
  });


  spinnersOff(false);

};

const loadAiId = id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url).then(res => res.json()).then(data => displayAiID(data.data));
}

const displayAiID = data => {
    console.log(data)
    const modalContainer = document.getElementById('row-modal');
    modalContainer.innerHTML = "";

    const toolDescription = document.createElement('h4');

    console.log(data.description);
    console.log(toolDescription);
    toolDescription.innerHTML = data.description;
    modalContainer.appendChild(toolDescription);
    const servicePrice = document.createElement('div');
    servicePrice.classList.add('d-md-flex' ,'justify-content-between', 'align-items-center');
    servicePrice.innerHTML = `
        ${data.pricing !== null? data.pricing.map(price => {
            return `
            <div class="text-center bg-light text-danger px-2 py-3 rounded-3 m-2">

            <h6 class = "h-100">${price.price !== null ?price.price:"Free of cost"} <br> <span>${price.plan}</span></h6> </div>`;
        }).join(""):  "No data available"}
                            
                          
    `;

    modalContainer.appendChild(servicePrice);

    const featureAndIntegration = document.createElement('div');
    featureAndIntegration.classList.add('d-md-flex' ,'justify-content-between', 'mt-3');
    // console.log(data.features)
    featureAndIntegration.innerHTML += `
    <div>
        <h5 class="card-title">Features</h5>
        <ul style = "padding-left:16px">
        ${Object.entries(data.features).map(([key,value]) => {
            // console.log(key);
            // console.log(".........");
            // console.log(value.feature_name);
            return `<li>${value.feature_name}</li>`
            // for(item in value) {
            //     console.log(item.feature_n);
            // }
            
        }).join("")}
        </ul>
    </div>

    <div>
        <h5 class="card-title">Integrations</h5>
        <ul style = "padding-left:16px">${data.integrations !== null ? data.integrations.map((integ) => {
        return `<li>${integ?integ:"No data found"}</li>`;
        }).join(""): "No data Found"}
        </ul>
    </div>
    `;
modalContainer.appendChild(featureAndIntegration);

}


const spinnersOff = status => {
    document.getElementById('spinners-div').classList.add('d-none');
}
