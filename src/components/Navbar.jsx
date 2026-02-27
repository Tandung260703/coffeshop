import "./Navbar.css";
import Cart from "./Cart/Cart.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useContext } from "react";
import { varContext } from "../App.jsx";
function Navbar(props) {
  const [input, setInput] = useState("");
  const { dataCoffe, results, setResults, setStorage } = useContext(varContext);
  const inputRef = useRef(null);
  const { infoPD } = props;
  // console.log(dataCoffe)
  const navigate = useNavigate();

  const solveFind = (string) => {
    const query = string.trim().toLowerCase();

    if (!query) {
      setResults([]);
      return;
    }

    // 1. Lọc theo ký tự đầu (case-insensitive)
    const result = dataCoffe.filter((item) =>
      item.name.toLowerCase().startsWith(query)
    );

    // 2. Loại bỏ tên trùng (giữ bản đầu tiên)
    const uniqueResult = Array.from(
      new Map(result.map((item) => [item.name.toLowerCase(), item])).values()
    );

    setResults(uniqueResult);
  };
  const checkInfoPd = (inFo) => {
    if (infoPD.length > 1) {
      infoPD.length = 0;
    }
    infoPD.push(inFo);
  };
  const cleanInput = () => {
    if (input.length > 0) {
      setInput("");
      setResults([]); // xóa kết quả bằng state
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <ul className="containerNav">
        <li className="options noHover">
          <Link to="/back">Logo</Link>
        </li>
        <li className="options noHover">
          <input
            ref={inputRef}
            value={input}
            id="inputFind"
            className="searchEngine"
            type="text"
            placeholder="Search"
            onChange={(e) => {
              solveFind(e.target.value);
              setInput(e.target.value);
            }}
          ></input>
          {results.length > 0 ? (
            <ul className="listFind" id="listFind">
              {results.map((item) => (
                <li className="itemFind" key={item.name}>
                  <Link to={"/product-info"}>
                    <div
                      onClick={() => {
                        checkInfoPd(item);
                        cleanInput();
                      }}
                    >
                      {item.name}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            input && (
              <ul className="listFind">
                <li className="itemFind">No results found</li>
              </ul>
            )
          )}
        </li>
        <li className="options noHover">
          <Link to={"/productList-find"}>
            <button
              onClick={() => {
                setStorage([...results]);
              }}
            >
              Find
            </button>
          </Link>
        </li>
        <li className="options noHover" id="nav">
          <Cart />
        </li>
        <li className="options">icon</li>
        <li className="options">icon</li>
        <li className="options loginBtn noHover">
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
          <p
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign up
          </p>
        </li>
      </ul>
    </>
  );
}

export default Navbar;
