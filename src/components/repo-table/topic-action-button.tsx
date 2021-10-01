import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import useOctokit from "@hooks/useOctokit";
import React, { useEffect, useState } from "react";

export default function TopicActionButton(repo) {
  const { topic, removeTopic, addTopic, token } = useOctokit();
  const [isLoading, setIsLoading] = useState<boolean>();

  useEffect(() => {
    setIsLoading(false);
  }, [repo]);

  const handleAddTopic = () => {
    setIsLoading(true);
    addTopic([repo]);
  };

  const handleRemoveTopic = () => {
    setIsLoading(true);
    removeTopic([repo]);
  };

  return repo.topics.includes(topic) ? (
    <Button
      isLoading={isLoading}
      colorScheme="red"
      size="xs"
      isDisabled={!token}
      onClick={handleRemoveTopic}
      leftIcon={<DeleteIcon />}
    >
      {topic}
    </Button>
  ) : (
    <Button
      isLoading={isLoading}
      colorScheme="green"
      size="xs"
      isDisabled={!token}
      onClick={handleAddTopic}
      leftIcon={<AddIcon />}
    >
      {topic}
    </Button>
  );
}
