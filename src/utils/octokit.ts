import { Octokit } from "@octokit/rest";
import { labels } from "@static/constants";

export const getOctokitInstance = (auth?) => {
  return new Octokit({
    auth,
    userAgent: "manage-hf-topic v0.0.1",
    previews: ["mercy-preview"]
  });
};

export const uGetAllRepos = async (username, token?, page = 1) => {
  try {
    const octokit = getOctokitInstance(token);
    const data = await octokit.paginate(octokit.repos.listForUser, { username, page });
    return data;
  } catch (e) {
    console.error(e);
  }
  return [];
};

export const uGetUserInfo = async (username) => {
  try {
    const octokit = getOctokitInstance();
    const { data } = await octokit.users.getByUsername({ username });
    return data;
  } catch (e) {
    console.error(e);
  }
  return undefined;
};

export const uAddLabels = async (octokit: Octokit, owner, repo) => {
  try {
    await Promise.all(labels.map((label) => octokit.issues.createLabel({ owner, repo, ...label })));
  } catch (e) {
    console.debug(e);
  }
};

export const uAddTopic = async (repo, topic, token, addLabels) => {
  try {
    if (!repo.topics.includes(topic)) {
      const octokit = getOctokitInstance(token);
      const { data } = await octokit.repos.replaceAllTopics({
        owner: repo.owner.login,
        repo: repo.name,
        names: [...repo.topics, topic]
      });
      if (addLabels) {
        await uAddLabels(octokit, repo.owner.login, repo.name);
      }
      return { success: true, topics: data.names };
    }
    return { success: true, topics: repo.topics };
  } catch (e) {
    console.error(e);
    return { success: false, topics: repo.topics };
  }
};

export const uRemoveTopic = async (repo, topic, token) => {
  try {
    if (repo.topics.includes(topic)) {
      const octokit = getOctokitInstance(token);
      const { data } = await octokit.repos.replaceAllTopics({
        owner: repo.owner.login,
        repo: repo.name,
        names: repo.topics.filter((t) => t !== topic)
      });
      return { success: true, topics: data.names };
    }
    return { success: true, topics: repo.topics };
  } catch (e) {
    console.error(e);
    return { success: false, topics: repo.topics };
  }
};
