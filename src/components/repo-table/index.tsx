import {
  Box,
  Button,
  ButtonGroup,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  SimpleGrid,
  Skeleton,
  useToast
} from "@chakra-ui/core";
import { AddIcon, DeleteIcon, ExternalLinkIcon, SearchIcon } from "@chakra-ui/icons";
import useOctokit from "@hooks/useOctokit";
import { toHumanString } from "human-readable-numbers";
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

  const subHeaderComponent = useMemo(
    () => (
      <SimpleGrid w="full" columns={{ base: 1, md: 3 }} p={4} pb={0} spacing={4}>
        <UserInfo />
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
          <Input
            name="search"
            type="search"
            placeholder="Filter Repositories"
            onChange={(e) => setFilterText(e.target.value)}
          />
        </InputGroup>
        <ButtonGroup isDisabled={!token} justifySelf={{md: "end"}} spacing={4}>
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
      </SimpleGrid>
    ),
    [token, repos]
  );

  const filteredRepos = repos.filter(({ full_name }) =>
    full_name.toLowerCase().includes(filterText.toLowerCase())
  );

  const repoTableColumns = [
    {
      name: "Name",
      selector: "full_name",
      sortable: true,
      cell: ({ html_url, full_name }) => (
        <Link target="_blank" rel="noopener noreferrer" href={html_url} color="blue.500">
          {full_name} <ExternalLinkIcon />
        </Link>
      )
    },
    {
      name: "Stars",
      selector: "stargazers_count",
      width: "6rem",
      sortable: true,
      hide: "sm",
      cell: ({ stargazers_count }) => toHumanString(stargazers_count)
    },
    {
      name: "Last Updated",
      selector: "updated_at",
      width: "12rem",
      hide: "sm",
      sortable: true
    },
    {
      selector: "topic",
      width: "12rem",
      cell: TopicActionButton,
      center: true
    }
  ];

  return (
    <Skeleton isLoaded={!isLoadingRepo}>
      <Box borderWidth="1px" borderColor="gray.200" borderRadius="md" overflow="auto" mb={10}>
        <DataTable
          columns={repoTableColumns}
          data={filteredRepos}
          pagination={true}
          striped={true}
          subHeader={true}
          subHeaderComponent={subHeaderComponent}
          onSelectedRowsChange={(data) => setSelectedRepos(data.selectedRows)}
          selectableRows={true}
          persistTableHead={true}
          noHeader={true}
          highlightOnHover={true}
        />
      </Box>
    </Skeleton>
  );
}
