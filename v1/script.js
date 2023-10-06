const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

//Selecting DOM elements
const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const factsList = document.querySelector(".facts-list");

//Create DOM elements: Render facts in list
factsList.innerHTML = "";

//Load data from Supabase by fetch(url,{object of options})
//header set request's headers. Res->response

loadFacts();

async function loadFacts() {
  const res = await fetch("https://xwowtryiygurjryyoffu.supabase.co/rest/v1/facts", {
  headers: {
    apikey:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3b3d0cnlpeWd1cmpyeXlvZmZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU0MDg1NDAsImV4cCI6MjAxMDk4NDU0MH0.YGwHe6JFq0_UKrq2Po81aG_W0eOFMgkN8MrSYXyLwzs",
    authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3b3d0cnlpeWd1cmpyeXlvZmZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU0MDg1NDAsImV4cCI6MjAxMDk4NDU0MH0.YGwHe6JFq0_UKrq2Po81aG_W0eOFMgkN8MrSYXyLwzs",
  },
  }
  );
  const data = await res.json();
  createFactsList(data);
} 
// fetch takes some time to arrive. wait for code to execute for result to arrive.
//await it will pause the execution of code while it is fetching



//factsList.insertAdjacentHTML("afterbegin","<li>Kapil</li>");
//afterbegin will place the item at top the list
//and beforeend will place at the end of the list


function createFactsList(dataArray) {
  //fact is whole object that wea are going through from intial Fact
  //and creating a new array from og one with differnt keys from that as list item

  const htmlArr = dataArray.map(
    (fact) => `<li class="fact">
        <p>
            ${fact.text}
            <a class="source"
            href="${fact.source}" target="_blank">(Source)</a> 
        </p>
        <span class="tag">#${fact.category}</span>
         </li>`
  );

  const html = htmlArr.join(""); //create string out of an array

  factsList.insertAdjacentHTML("afterbegin", html);
}

// type of event we want to listen to i.e. click.
//if the list of classes of fact form contains hidden class, remove hidden class
btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    btn.textContent = "Share a fact";
  }
});

