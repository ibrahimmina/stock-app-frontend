import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Stock = (props) => (
  <tr>
    <td>{props.stock.index}</td>
    <td>{props.stock.country}</td>
    <td>{props.stock.industry}</td>
    <td>{props.stock.product}</td>
    <td>{props.stock.BUY_DECISION}</td>
    <td>{props.stock.rating}</td>
    {/* 
    <td>
      <Link className="btn btn-link" to={`/edit/${props.stock._id}`}>
        Edit
      </Link>{" "}
      |
      <button
        className="btn btn-link"
        onClick={() => {
          props.deleteStock(props.stock._id);
        }}
      >
        Delete
      </button>
    </td>
    */}
  </tr>
);

export default function StockList() {
  const [stocks, setStocks] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getStocks() {
      const response = await fetch(
        `https://stock-app-backend-final.glitch.me/stock`
      );

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const stocks = await response.json();
      setStocks(stocks);
    }

    getStocks();

    return;
  }, [stocks.length]);

  // This method will delete a record
  async function deleteStock(id) {
    await fetch(`https://stock-app-backend-final.glitch.me/stock/${id}`, {
      method: "DELETE",
    });

    const newStocks = stocks.filter((el) => el._id !== id);
    setStocks(newStocks);
  }

  // This method will map out the records on the table
  function stockList() {
    return stocks.map((stock) => {
      return (
        <Stock
          stock={stock}
          deleteStock={() => deleteStock(stock._id)}
          key={stock._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3>Stock List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>index</th>
            <th>Country</th>
            <th>Industry</th>
            <th>Product</th>
            <th>Buy Decision</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>{stockList()}</tbody>
      </table>
    </div>
  );
}
