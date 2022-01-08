import "../css/orders.css";

const MyOrderList = ({orders}) => {

    if (orders === "loading") return (
      <div className="container">
          <div className="col-10 mx-auto my-2 text-center text-title">
            <h1 className="text-capitalize font-weight-bold title my-4" data-cy="loading">Loading...</h1>
          </div>
      </div>
      )

  return (
    <>
      <div className="container-table">
        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-1">Nr.</div>
            <div className="col col-2">Order Date</div>
            <div className="col col-3">Amount</div>
            <div className="col col-4">Price</div>
          </li>
          {orders !== "loading" &&
            orders.order.map((o, index) => (
              <li className="container-order-items" key={o.id}>
                <div className="col col-1" data-label="Nr">
                  {index + 1}
                </div>
                <div className="col col-2" data-label="Date">
                  {o.date.slice(0, 10)}
                </div>
                <div className="col col-3" data-label="Amount">
                  {o.paintings.length}
                </div>
                <div
                  className="col col-4"
                  data-label="Price"
                >{`€ ${o.total}`}</div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default MyOrderList;
