import { NativeStackScreenProps } from "@react-navigation/native-stack";
import react, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { Dimensions } from "react-native";
import Slide from "../components/Slide";

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
  /* background-color: ${(props) =>
    props.theme.mainBgColor};  already configured at Tab.js*/
`;
//ed54fa012e788fb5cefec31666ae71ef

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  /* background-color: ${(props) => props.theme.mainBgColor}; */
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation: { navigate },
}) => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();
    setNowPlaying(results);
  };

  const getUpcoming = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();
    setUpcoming(results);
  };

  const getTrending = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/trending/movie/week?api_key=${API_KEY}`
      )
    ).json();
    setTrending(results);
  };

  const getData = async () => {
    await Promise.all([getNowPlaying(), getUpcoming(), getTrending()]);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator size="large" />
    </Loader>
  ) : (
    <Container>
      <Swiper
        loop
        autoplay
        horizontal
        autoplayTimeout={3.5}
        showsButtons={false}
        showsPagination={false}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
      >
        {nowPlaying.map((movie) => {
          return (
            <Slide
              key={movie.id}
              backdrop_path={movie.backdrop_path}
              poster_path={movie.poster_path}
              original_title={movie.original_title}
              overview={movie.overview}
              vote_average={movie.vote_average}
            />
          );
        })}
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
