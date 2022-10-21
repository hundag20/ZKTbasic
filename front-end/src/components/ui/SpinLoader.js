import StyledDiv from "../styles/spinLoaderStyle.js";
const SpinLoader = () => {
  console.log("spinning");
  return (
    <StyledDiv>
      <div className="lds-spinner" style={{ alignSelf: "center" }}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </StyledDiv>
  );
};
export default SpinLoader;
