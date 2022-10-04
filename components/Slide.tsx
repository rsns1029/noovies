import React from "react";
import styled from "styled-components/native";
import { StyleSheet, useColorScheme, View } from "react-native";
import { makeImgPath } from "../utils";
import { BlurView } from "expo-blur";
import Poster from "./Poster";

const BgImg = styled.Image``;

const Title = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
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
const Overview = styled.Text<{ isDark: boolean }>`
  color: ${(props) =>
    props.isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)"};
`;

const Votes = styled(Overview)`
  margin-top: 5px;
  font-size: 15px;
  color: ${(props) =>
    props.isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)"};
`;

interface SlideProps {
  backdrop_path: string;
  poster_path: string;
  original_title: string;
  overview: string;
  vote_average: number;
}

const Slide: React.FC<SlideProps> = ({
  backdrop_path,
  poster_path,
  original_title,
  overview,
  vote_average,
}) => {
  const isDark = useColorScheme() == "dark";

  return (
    <View style={{ flex: 1 }}>
      <BgImg
        style={StyleSheet.absoluteFill}
        source={{ uri: makeImgPath(backdrop_path) }}
      />
      <BlurView
        intensity={80}
        style={StyleSheet.absoluteFill}
        tint={isDark ? "dark" : "light"}
      >
        <Wrapper>
          <Poster path={poster_path} />
          <Column>
            <Title isDark={isDark}>{original_title}</Title>
            <Overview isDark={isDark}>
              {overview.length > 80 ? overview.slice(0, 80) + "..." : overview}
            </Overview>
            {vote_average > 0 ? (
              <Votes isDark={isDark}>⭐{vote_average}/10</Votes>
            ) : null}
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  );
};

export default Slide;
