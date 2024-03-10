import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import PageHeader from "../Components/PageHeader";
const genAI = new GoogleGenerativeAI("YOUR_API_KEY");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const GOOGLE_API_KEY = "AIzaSyANwaMYJWvS90eqqBb_yJ3Hij4DLYvol4Q";

const Review = () => {
  const [search, setSearch] = useState("");
  const [aiResponse, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(undefined);
  const [inputText, setInputText] = useState("");

  // Generative AI Call to fetch dishes

  async function aiRun() {
    const prompt = `random meals related to ${search} category with images and prices`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setResponse(text);
  }
  async function aiRun() {
    setLoading(true);

    setLoading(false);
  }

  // button event trigger to consume gemini Api

  const handleClick = () => {
    aiRun();
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <>
      <PageHeader title="Search for review and Suggestions" curPage="Review" />

      <>
        <div>
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
            Generative Review Support
          </h1>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <input
              style={{ width: "800px", border: "2px solid black" }}
              placeholder="Search product using Generative AI"
              onChange={(e) => handleChangeSearch(e)}
            />
            <button
              style={{
                marginLeft: "20px",
                width: "80px",
                backgroundColor: "black",
                color: "white",
              }}
              onClick={() => handleClick()}
            >
              Search
            </button>
          </div>

          {loading == true && search != "" ? (
            <p style={{ margin: "30px 0" }}>Loading ...</p>
          ) : (
            <div style={{ margin: "30px 0" }}>
              <p>{aiResponse}</p>
            </div>
          )}
        </div>
      </>
    </>
  );
};

export default Review;
