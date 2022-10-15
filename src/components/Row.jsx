import { forwardRef } from "react";
import styled from "styled-components";
import { randomColor } from "../util";
const DEFAULT_IMAGE= "./default-logo.png"
const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: white;
`;

const RowContainer = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: ${props =>  props.position===1? '#FFD700':
    props.position===2? '#C0C0C0':
    props.position===3? '#b08d57':
   props.position % 2 ? '#f2f2f2' : '#e9e9e9'};
  align-self: center;
  overflow: hidden;
  padding: 5px 10px;
  border-bottom: 1px solid #d1d1cf;
`;

const Stack = styled.div`
  display: flex;
  flex-direction: row;
`;
const NameStack = styled.p`
  margin-left: 15px;
  font-size: 18px;
  font-weight: 500;
`;
const Position = styled.p`
  color: white;
  background: ${() => randomColor()}
  height: 23px;
  width: 23px;
  line-height: 23px;
  border-radius: 15px;
  margin-right: 10px
`;
const Score = styled.p`
font-size: 18px;
color: ${props =>  props.position===1? 'red':
props.position===2? 'purple':
props.position===3? 'blue':
'tomato'}`
const Row = forwardRef(({ image, name, score, position }, ref) => {
  return (
    <RowContainer position={position} ref={ref}>
      <Stack>
        <Stack>
        <Position value={position}>{position}</Position>
          <Image src={image || DEFAULT_IMAGE} width="50" height="50" alt={name} />
        </Stack>
        <NameStack>{name}</NameStack>
      </Stack>
      <Stack>
        <Score position={position}>{score}pt</Score>
      </Stack>
    </RowContainer>
  );
});

export default Row;
