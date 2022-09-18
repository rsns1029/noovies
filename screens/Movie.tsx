import { NativeStackScreenProps } from "@react-navigation/native-stack";
import react, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { Dimensions } from "react-native";
import { makeImgPath } from "../utils";
import { BlurView } from "expo-blur";

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

const View = styled.View`
  flex: 1;
`;

const Poster = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;

const BgImg = styled.Image``;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  /* background-color: ${(props) => props.theme.mainBgColor}; */
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: white;
`;

const Overview = styled.Text`
  color: rgba(255, 255, 255, 0.6);
`;

const Votes = styled(Overview)`
  margin-top: 5px;
  font-size: 15px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation: { navigate },
}) => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const isDark = useColorScheme() == "dark";

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();
    setNowPlaying(results);
    setLoading(false);
  };

  useEffect(() => {
    getNowPlaying();
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
            <View key={movie.id}>
              <BgImg
                style={StyleSheet.absoluteFill}
                source={{ uri: makeImgPath(movie.backdrop_path) }}
              />
              <BlurView
                intensity={80}
                style={StyleSheet.absoluteFill}
                tint={isDark ? "dark" : "light"}
              >
                <Wrapper>
                  <Poster source={{ uri: makeImgPath(movie.poster_path) }} />
                  <Column>
                    <Title>{movie.original_title}</Title>
                    <Overview>
                      {movie.overview.length > 80
                        ? movie.overview.slice(0, 80) + "..."
                        : movie.overview}
                    </Overview>
                    {movie.vote_average > 0 ? (
                      <Votes>⭐{movie.vote_average}/10</Votes>
                    ) : null}
                  </Column>
                </Wrapper>
              </BlurView>
            </View>
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
