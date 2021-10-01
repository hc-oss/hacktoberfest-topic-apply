import { uAddTopic, uGetAllRepos, uGetUserInfo, uRemoveTopic } from "@utils/octokit";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import useArray from "use-array";

interface OctokitContextProps {
  repos: any[];
  getAllRepos: () => void;

  userInfo?;

  username: string;
  setUsername: (username: string) => void;

  token: string;
  setToken: (token: string) => void;

  topic: string;
  addTopic: (repos: any[]) => Promise<void>;
  removeTopic: (repos: any[]) => Promise<void>;
  setTopic: (topic: string) => void;

  isLoadingRepo: boolean;

  addLabels: boolean;
  setAddLabels: (flag: boolean) => void;
}

interface OctokitProviderProps {
  children;
}

const OctokitContext = createContext<OctokitContextProps>({} as OctokitContextProps);

export const OctokitProvider = ({ children }: OctokitProviderProps) => {
  const { query } = useRouter();
  const [username, setUsername] = useState<string>();
  const [userInfo, setUserInfo] = useState<any>();
  const [isLoadingRepo, setIsLoadingRepo] = useState<boolean>();
  const [addLabels, setAddLabels] = useState<boolean>(true);
  const [token, setToken] = useState<string>();
  const [repos, { set, empty, setAt }] = useArray<any[]>([]);
  const [topic, setTopic] = useState<string>("hacktoberfest");

  useEffect(() => {
    if (query.username) {
      setUsername(query.username.toString());
      getAllRepos(query.username.toString());
    }
    if (query.token) {
      setToken(query.token.toString());
    }
    if (query.topic) {
      setTopic(query.topic.toString());
    }
  }, [query]);

  const getAllRepos = async (u?) => {
    if (username || u) {
      setIsLoadingRepo(true);
      empty();
      const arepos = await uGetAllRepos(username || u, token);
      const uinfo = await uGetUserInfo(username || u);
      set(arepos);
      setUserInfo(uinfo);
      setIsLoadingRepo(false);
    }
  };

  const updateRepoInList = (repo, { success, topics }) => {
    const repoIndex = repos.findIndex(({ id }) => id === repo.id);
    setAt(repoIndex, { ...repo, topics, error: !success });
  };

  const addTopic = async (selectedRepos) => {
    for (const repo of selectedRepos) {
      const data = await uAddTopic(repo, topic, token, addLabels);
      updateRepoInList(repo, data);
    }
  };

  const removeTopic = async (selectedRepos) => {
    for (const repo of selectedRepos) {
      const data = await uRemoveTopic(repo, topic, token);
      updateRepoInList(repo, data);
    }
  };

  return (
    <OctokitContext.Provider
      value={{
        repos,
        getAllRepos,

        username,
        setUsername,

        userInfo,

        token,
        setToken,

        topic,
        addTopic,
        removeTopic,
        setTopic,

        isLoadingRepo,

        addLabels,
        setAddLabels
      }}
    >
      {children}
    </OctokitContext.Provider>
  );
};

export default function useOctokit() {
  return useContext(OctokitContext);
}
