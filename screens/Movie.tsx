import { NativeStackScreenProps } from "@react-navigation/native-stack";
import react from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

/* color: ${(props) => (props.selected ? "blue" : "red")}; */
const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation: { navigate },
}) => (
  <Btn onPress={() => navigate("Stack", { screen: "One" })}>
    <Title selected={false}>Movies</Title>
  </Btn>
);

export default Movies;

// const Movies = ({ navigation: { navigate } }) => (
//   <Btn onPress={() => navigate("Stack", { screen: "One" })}>
//     <Title selected={false}>Movies</Title>
//   </Btn>
// );
