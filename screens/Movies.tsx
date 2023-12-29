import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import { ActivityIndicator, Alert, Dimensions, FlatList } from "react-native";
import Swiper from "react-native-swiper";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import styled from "styled-components/native";
import { MovieResponse, moviesApi , Movie} from "../api";
import HList from "../components/HList";
import HMedia from "../components/HMedia";
import Loader from "../components/Loader";
import Slide from "../components/Slide";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
`;

const VSeparator = styled.View`
  width: 20px;
`;
const HSeparator = styled.View`
  height: 20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const queryClient = useQueryClient();
  const [loader, setLoader] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);
  const [uniqueUpcomingMovies, setUniqueUpcomingMovies] = useState<Movie[]>([]);

  const { isLoading: nowPlayingLoading, data: nowPlayingData } =
    useQuery<MovieResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying);

  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<MovieResponse>(
    ["movies", "upcoming"],
    moviesApi.upcoming,
    {
      getNextPageParam: (currentPage) => {
        const nextPage = currentPage.page + 1;
        return nextPage > currentPage.total_pages ? null : nextPage;
      },
    }
  );
  
  const { isLoading: trendingLoading, data: trendingData } = useQuery<MovieResponse>(["movies", "trending"], moviesApi.trending);

  useEffect(() => {
    if (upcomingData) {
      // Combine all fetched pages
      const combinedData = upcomingData.pages
        .map((page) => page.results)
        .flat();

      console.log( "combinedData : ", combinedData.length);

      // Filter out duplicates
      const newUniqueData = combinedData.filter(
        (movie) => !uniqueUpcomingMovies.some((m) => m.id === movie.id)
      );

      console.log("newUniqueData : ", newUniqueData.length)

      // Update state with new unique data
      setUniqueUpcomingMovies((prevMovies) => [...prevMovies, ...newUniqueData]);
    }
  }, [upcomingData]);



  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };
  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;

  const loadData = async () =>{
    setLoader(true);
    fetchNextPage();
    setLoader(false);
  }

  const loadMore = () => {
    if (hasNextPage && !loader) {
      loadData();
    }
  };

  return loading ? (
    <Loader />
  ) : upcomingData ? (
    <FlatList
      
      onEndReached={loadMore}
      onRefresh={onRefresh}
      refreshing={refreshing}
      initialNumToRender={5}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
              marginBottom: 40,
              width: "100%",
              height: SCREEN_HEIGHT / 4,
            }}
          >
            {nowPlayingData?.results.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path || ""}
                posterPath={movie.poster_path || ""}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
                fullData={movie}
              />
            ))}
          </Swiper>
          {trendingData ? (
            <HList title="Trending Movies" data={trendingData.results} />
          ) : null}

          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
      data={uniqueUpcomingMovies }
      keyExtractor={(item) => item.id + ""}
      ItemSeparatorComponent={HSeparator}
      renderItem={({ item }) => {
        return (
        <HMedia
          posterPath={item.poster_path || ""}
          originalTitle={item.original_title}
          overview={item.overview}
          releaseDate={item.release_date}
          fullData={item}
        />
      )}}
    />
  ) : null;
};

export default Movies;
