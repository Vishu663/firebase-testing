import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Test() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  const handleLogout = () => {
    navigate("/signin");
  };

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = "3ec9ab0866644790836f9f931c3ef1a2";
      const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="container-2">
        <h1>Top Business News</h1>
        <div className="news-list">
          {articles.map((article, index) => (
            <div key={index}>
              <h3>{article.title}</h3>
              <p>{article.publishedAt}</p>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
              <hr />
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
