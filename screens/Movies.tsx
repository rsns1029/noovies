import { NativeStackScreenProps } from "@react-navigation/native-stack";
import react, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { Dimensions } from "react-native";
import Slide from "../components/Slide";
import Poster from "../components/Poster";

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

const ListTitle = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-left: 20px;
`;

const TrendingScroll = styled.ScrollView`
  margin-top: 20px;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 10px;
`;

const Votes = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
`;

const Movie = styled.View`
  margin-right: 20px;
  align-items: center;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
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
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
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
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      )
    ).json();
    setTrending(results);
  };

  const getData = async () => {
    await Promise.all([getNowPlaying(), getUpcoming(), getTrending()]);
    setLoading(false);
  };

  const HMovie = styled.View`
    padding: 0px 30px;
    margin-bottom: 30px;
    flex-direction: row;
  `;

  const HColumn = styled.View`
    margin-left: 15px;
    width: 80%;
  `;

  const Overview = styled.Text`
    color: white;
    opacity: 80;
    width: 80%;
  `;
  const Release = styled.Text`
    color: white;
    font-size: 12px;
    margin-top: 10px;
    margin-bottom: 10px;
  `;

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
        containerStyle={{
          width: "100%",
          height: SCREEN_HEIGHT / 4,
          marginBottom: 40,
        }}
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
      <ListContainer>
        <ListTitle>Trending Movies</ListTitle>
        <TrendingScroll
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 20 }}
        >
          {trending.map((movie) => (
            <Movie key={movie.id}>
              <Poster path={movie.poster_path} />
              <Title>
                {movie.original_title.slice(0, 13)}
                {movie.original_title.length > 13 ? "..." : null}
              </Title>
              <Votes>
                {movie.vote_average > 0
                  ? `⭐ ${movie.vote_average} / 10`
                  : `Comming soon`}
              </Votes>
            </Movie>
          ))}
        </TrendingScroll>
      </ListContainer>
      <ListContainer>
        <ComingSoonTitle>Comming Soon</ComingSoonTitle>
        {upcoming.map((movie) => (
          <HMovie key={movie.id}>
            <Poster path={movie.poster_path} />
            <HColumn>
              <Title>{movie.original_title}</Title>
              <Release>
                {new Date(movie.release_date).toLocaleDateString("ko", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </Release>
              <Overview>
                {movie.overview != "" && movie.overview.length > 120
                  ? `${movie.overview.slice(0, 120)}...`
                  : movie.overview}
              </Overview>
            </HColumn>
          </HMovie>
        ))}
      </ListContainer>
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
