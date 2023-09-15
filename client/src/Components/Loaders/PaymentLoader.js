import "./PaymentLoader.css";
const PaymentLoader = ({ text }) => {
  return (
    <div class="modal">
      <div class="payment-loader">
        <div class="pad">
          <div class="chip"></div>
          <div class="line line1"></div>
          <div class="line line2"></div>
        </div>
        <div class="loader-text">{text}</div>
      </div>
    </div>
  );
};

export default PaymentLoader;
