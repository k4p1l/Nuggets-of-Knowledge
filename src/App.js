import { useEffect, useState } from "react";
import supabase from "./supabase";
import "./style.css";

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

// eslint-disable-next-line no-unused-vars
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

function App() {
  //define state variable
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");
  //when data get loaded we set the state to true and means data is loaded

  useEffect(function () {
    async function getFacts() {
      setisLoading(true);

    let query =supabase.from("facts").select("*")  
      if (currentCategory !== "all")
      query=query.eq("category",currentCategory)
    
      const { data: facts, error } = await query
        .order("votesInteresting", { ascending: false })
        .limit(1000);

      if (!error) setFacts(facts);
      //if there is no error then load the facts ,otherwise alert the user. Called as error handling.
      else alert("There was an problem getting the data");
      setisLoading(false);
    }
    getFacts();
  }, [currentCategory]);//dependency array.whenever this state changes it will reload the website with the data
  //that we require acc to the category.entire function will get execute again.

  // we want the data to get loaded only once when the website starts
  //and not when a state variable changes
  return (
    <>
      <div className="container">
        <Header showForm={showForm} setShowForm={setShowForm} />{" "}
        {/* use state variable */}
        {showForm ? (
          <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
        ) : null}
        <main className="main">
          <CategoryFilter setCurrentCategory={setCurrentCategory} />
          {isLoading ? <Loader /> : <FactsList facts={facts} setFacts={setFacts} />}
        </main>
      </div>
    </>
  );
}

//--------------------------------------------App Finished---------------------------------------------//

function Loader() {
  return <p className="message">Loading just a sec mate...</p>;
}

function Header({ showForm, setShowForm }) {
  return (
    <header className="header">
      <div className="logo">
        <img src="pics/png 7.png" alt="Today I Learned Logo" />
        <h1>Nuggets of Knowledge</h1>
      </div>
      {/*update state variable  */}
      <button
        className="btn btn-share btn-open"
        onClick={() => setShowForm((show) => !show)}
      >
        {showForm ? "Close" : "Share a fact"}
      </button>
    </header>
  );
}

function CategoryFilter({setCurrentCategory}) {
  return (
    <aside>
      <ul>
        <li>
          <button className="btn btn-all" onClick={()=>setCurrentCategory("all")}>All</button>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat.name}>
            <button className="btn btn-category" onClick={()=>setCurrentCategory(cat.name)}>{cat.name}</button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("http://example.com");
  const [category, setCategory] = useState("");
  const textlength = text.length;

  async function handleSubmit(e) {
    //1.Prevent the browser reload
    e.preventDefault();
    //2.Check if data is valid , if so create new fact.
    if (text && isValidHttpUrl(source) && category && textlength <= 300) {
      //  3.Create new fact object
      //   const newFact = {
      // id:Math.round(Math.random()*100000000),
      // text,
      // source,
      // category,
      // votesInteresting: 24,
      // votesMindblowing: 9,
      // votesFalse: 4,
      // createdIn: new Date().getFullYear(),
      //   };

      //3.Upload fact to supabase and receive the new fact object

      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text, source, category }])
        .select();
      //by default all votes are 0 and createdIn is automatically created by supabase

      //4.Add the new fact to the UI. aa the fact to state
      if(!error) setFacts((facts) => [newFact[0], ...facts]);
      //5.Reset the input field
      setText("");
      setCategory("");
      setSource("http://example.com");

      //6.Close the form
      setShowForm(false);
    }
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a fact that you learned mate"
        value={text}
        onChange={(e) => setText(e.target.value)}
        // e is an event object. e.target is the current element
      />
      <span>{300 - textlength}</span>
      <input
        value={source}
        type="text"
        placeholder="Trustworthy source"
        onChange={(e) => setSource(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choose Category</option>
        {/* We want people not be able to choose it so no value */}
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>

      <button className="btn btn-large">Post</button>
    </form>
  );
}

function FactsList({ facts,setFacts }) {
  //temporary variable
  if (facts.length === 0) {
    return <p className="message">No facts for this category yet!
    Create the first one 😎</p>
  }

  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} setFacts={ setFacts} />
        ))}
      </ul>
    </section>
  );
}

//props fact
function Fact({ fact, setFacts }) {
  
  const [isUpdating, setIsupdating] = useState(false);

  async function handleVote(columnName) {
    const { data: updatedfact, error } = await supabase.from('facts')
      .update({ [columnName]: fact[columnName] + 1 }).eq("id", fact.id)
      .select();
    setIsupdating(true);
    
    if (!error)
      setFacts((facts) =>
        facts.map((f) => (f.id === fact.id ? updatedfact[0] : f)));
    
  }
  return (
    <li key={fact.id} className="fact">
      <p>
        {fact.text}
        <a
          className="source"
          href={fact.source}
          target="_blank"
          rel="noreferrer"
        >
          (Source)
        </a>
      </p>
      <span className="tag">#{fact.category}</span>
      <div className="vote-buttons">
        <button onClick={() => handleVote("votesInteresting")}
          disabled={isUpdating}>
          👍 <strong>{fact.votesInteresting}</strong>
        </button>
        <button onClick={() => handleVote("votesMindblowing")}
          disabled={isUpdating}>
          🤯 <strong>{fact.votesMindblowing}</strong>
        </button>
        <button onClick={() => handleVote("votesFalse")}
          disabled={isUpdating}>
          ⛔️ <strong>{fact.votesFalse}</strong>
        </button>
      </div>
    </li>
  );
}
export default App;
