const Budget = ({ trip }) => {
    console.log("console from budget",trip);
    if (!trip || !trip.estBudget) {
      return <p>No budget details available.</p>;
    }
  
    return (
      <div>
        <p className="">Estimated Budget: <span className="font-semibold">₹{trip.estBudget}</span></p>
      </div>
    );
  };
  
  export default Budget;
  