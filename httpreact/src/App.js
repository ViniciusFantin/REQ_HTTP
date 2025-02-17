import "./App.css";
import { useState, useEffect } from "react";

// Custom Hook
import { useFetch } from "./hooks/useFetch";

const url = "http://localhost:3000/products";

function App() {
  const [products, setProducts] = useState([]);

  const { data: items, httpConfig, loading, error, itemId } = useFetch(url);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // resgatando dados
  //useEffect(() => {
  //async function fetchData() {
  //const res = await fetch(url);

  //const data = await res.json();

  //setProducts(data);
  //}
  //fetchData();
  //}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price,
    };

    //const res = await fetch(url, {
    //method: "POST",
    //headers: {
    //"Content-Type": "application/json",
    //},
    //body: JSON.stringify(product),
    //});

    //const addedProduct = await res.json();

    //setProducts((prevProduct) => [...prevProduct, addedProduct]);

    //refatorando post
    httpConfig(product, "POST");

    setName("");
    setPrice("");
  };

  const handleRemove = (id) => {
    httpConfig(id, "DELETE");
  };

  return (
    <div className="App">
      <h1 className="title">Lista de Produtos</h1>
      {loading && <p> Carregando Dados... </p>}
      {error && <p>\{error}</p>}
      {!loading && (
        <ul className="div">
          {items &&
            items.map((product) => (
              <li key={product.id} className="product-item">
                {product.name} - R${product.price}
                <button
                  className="button"
                  onClick={() => handleRemove(product.id)}
                >
                  Excluir
                </button>
              </li>
            ))}
        </ul>
      )}
      <div>
        <form onSubmit={handleSubmit}>
          <label className="text">
            Nome:
            <input
              type="text"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="text">
            Preço
            <input
              type="number"
              value={price}
              name="price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          {loading && <input type="submit" disabled value="Aguarde" />}
          {!loading && <input type="submit" value="Criar" />}
        </form>
      </div>
    </div>
  );
}

export default App;
