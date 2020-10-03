import { Box, Button, ButtonGroup, Flex, Input, Skeleton, useToast } from "@chakra-ui/core";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import useOctokit from "@hooks/useOctokit";
import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";

import TopicActionButton from "./topic-action-button";
import UserInfo from "./user-info";

export default function RepoTable() {
  const [filterText, setFilterText] = useState("");
  const [selectedRows, setSelectedRepos] = useState([]);
  const { repos, isLoadingRepo, topic, addTopic, removeTopic, token } = useOctokit();
  const [isAddLoading, setIsAddLoading] = useState<boolean>();
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>();
  const toast = useToast();

  const subHeaderComponentMemo = useMemo(() => {
    return <Input name="search" type="search" onChange={(e) => setFilterText(e.target.value)} />;
  }, [filterText]);

  const filteredRepos = repos.filter(
    (repo) => repo.name && repo.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleOnAddTopicSelected = async () => {
    if (selectedRows.length === 0) {
      toast({ description: "No repositories selected" });
      return;
    }
    setIsAddLoading(true);
    await addTopic(selectedRows);
    setIsAddLoading(false);
  };

  const handleOnRemoveTopicSelected = async () => {
    if (selectedRows.length === 0) {
      toast({ description: "No repositories selected" });
      return;
    }
    setIsDeleteLoading(true);
    await removeTopic(selectedRows);
    setIsDeleteLoading(false);
  };

  const repoTableColumns = [
    {
      name: "Name",
      selector: "name",
      sortable: true
    },
    {
      name: "Topic",
      selector: "topic",
      cell: TopicActionButton
    }
  ];

  return (
    <Skeleton isLoaded={!isLoadingRepo}>
      <Flex justifyContent="space-between" mb={4}>
        <UserInfo />
        <ButtonGroup isDisabled={!token}>
          <Button
            colorScheme="green"
            isLoading={isAddLoading}
            onClick={handleOnAddTopicSelected}
            leftIcon={<AddIcon />}
          >
            {topic}
          </Button>
          <Button
            colorScheme="red"
            isLoading={isDeleteLoading}
            onClick={handleOnRemoveTopicSelected}
            leftIcon={<DeleteIcon />}
          >
            {topic}
          </Button>
        </ButtonGroup>
      </Flex>
      <Box borderWidth="1px" borderColor="gray.200" borderRadius="md" overflow="auto" mb={10}>
        <DataTable
          columns={repoTableColumns}
          data={filteredRepos}
          pagination={true}
          striped={true}
          subHeaderComponent={subHeaderComponentMemo}
          onSelectedRowsChange={(data) => setSelectedRepos(data.selectedRows)}
          selectableRows={true}
          noHeader={true}
          persistTableHead={true}
        />
      </Box>
    </Skeleton>
  );
}
