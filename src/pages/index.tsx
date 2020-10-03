import HomePageComponent from "@components/pages/home";
import { OctokitProvider } from "@hooks/useOctokit";
import React from "react";
import GithubCorner from "react-github-corner";

export default function HomePage() {
  return (
    <OctokitProvider>
      <HomePageComponent />
      <GithubCorner href="https://github.com/harshzalavadiya/hacktoberfest-topic-apply" />
    </OctokitProvider>
  );
}
