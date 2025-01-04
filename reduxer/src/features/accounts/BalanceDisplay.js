import { useSelector } from "react-redux";

function formatCurrency(value) {
    return new Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
    }).format(value);
}

function BalanceDisplay() {
    const balance = useSelector((state) => state.account.balance);

    return <div className="balance">{formatCurrency(balance)}</div>;
}

export default BalanceDisplay;
// export default connect(mapStateToProps)(BalanceDisplay);
// balance display gets balance prop;
// function mapStateToProps(state) {
//   return {
//       balance: state.account.balance,
//   };
// }
