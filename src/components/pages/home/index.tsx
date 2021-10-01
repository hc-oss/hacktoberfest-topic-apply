import { Alert, AlertIcon, Container, Heading, SimpleGrid } from "@chakra-ui/react";
import TokenForm from "@components/pages/home/form/token-form";
import UsernameForm from "@components/pages/home/form/username-form";
import RepoTable from "@components/repo-table";
import { apptitle } from "@static/constants";
import React from "react";

export default function HomePageComponent() {
  return (
    <Container maxW="6xl">
      <Heading size="lg" py={6}>
        🏷️ {apptitle}
      </Heading>

      <Alert status="info" mb={6} borderRadius="md">
        <AlertIcon />
        This application communicates with GitHub API directly and your access token is never saved
        anywhere
      </Alert>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
        <UsernameForm />
        <TokenForm />
      </SimpleGrid>

      <RepoTable />
    </Container>
  );
}
