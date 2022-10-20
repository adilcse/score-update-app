import { createRef, useEffect, useState } from "react";
import styled from "styled-components";
import AnimateBubbles from "./animationHelper/AnimateBubble";
import Row from "./components/Row";
import userData from './userData.json'
import { getUpdatedUsers } from "./util";
const Container = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
background: #f0f2f0;
align-items: center;
text-align: center;
max-width: 800px;
margin-left: 5px;
margin-right: 5px;
margin-top: 10px;
border-radius: 10px;
padding-left: 10px;
padding-right: 10px;
& > :first-child {
  border-radius: 10px 10px 0 0;
}
& > :last-child {
  border-radius: 0 0 10px 10px;
}
`
function App() {
  const [users, setUsers] = useState(userData);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setUsers(oldUsers => getUpdatedUsers(oldUsers).sort((a,b) => b.score - a.score))
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <Container>
      <AnimateBubbles>
      {users.map(((user, i) => <Row
      ref={createRef()}
      key={user.userID}
      user={user}
      position={i+1}/>))}
      </AnimateBubbles>
    </Container>
  );
}

export default App;
