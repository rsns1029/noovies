import { NativeStackScreenProps } from "@react-navigation/native-stack";
import react from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { Dimensions } from "react-native";

const API_KEY = "ed54fa012e788fb5cefec31666ae71ef";

// const Btn = styled.TouchableOpacity`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
//   background-color: ${(props) => props.theme.mainBgColor};
// `;

// /* color: ${(props) => (props.selected ? "blue" : "red")}; */
// const Title = styled.Text`
//   color: ${(props) => props.theme.textColor};
// `;

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;
//ed54fa012e788fb5cefec31666ae71ef

const View = styled.View`
  flex: 1;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation: { navigate },
}) => {
  const getNowPlaying = () => {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR
    `);
  };

  return (
    <Container>
      <Swiper
        loop
        timeout={3.5}
        controlsEnabled={false}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
      >
        <View style={{ backgroundColor: "red" }}></View>
        <View style={{ backgroundColor: "blue" }}></View>
        <View style={{ backgroundColor: "red" }}></View>
        <View style={{ backgroundColor: "blue" }}></View>
      </Swiper>
    </Container>
  );
};
// <Btn onPress={() => navigate("Stack", { screen: "One" })}>
//   <Title>Movies</Title>
// </Btn>

export default Movies;

// const Movies = ({ navigation: { navigate } }) => (
//   <Btn onPress={() => navigate("Stack", { screen: "One" })}>
//     <Title selected={false}>Movies</Title>
//   </Btn>
// );
