import styled from "styled-components/native";

export const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Header = styled.Text`
  color: #000;
  font-size: 26px;
`;

export const CardContainer = styled.View`
  width: 90%;
  max-width: 260px;
  height: auto;
  margin: 20px;
`;

export const xCard = styled.View`
  position: relative;
  background-color: #fff;
  width: 100%;
  max-width: 260px;
  height: 300px;
  shadow-color: black;
  shadow-opacity: 0.2;
  shadow-radius: 20px;
  border-radius: 20px;
  resize-mode: cover;
`;

export const CardImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 20px;
`;

export const CardTitle = styled.Text`
  position: absolute;
  bottom: 0;
  margin: 10px;
  color: #fff;
`;

export const InfoText = styled.Text`
  height: 28px;
  justify-content: center;
  display: flex;
  z-index: -100;
`;

export const ProfileInfo = styled.View`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 20px;
`;

export const NameAndAge = styled.Text`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
