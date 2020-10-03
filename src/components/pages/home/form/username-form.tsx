import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link
} from "@chakra-ui/core";
import { CheckIcon, SearchIcon, WarningIcon } from "@chakra-ui/icons";
import useOctokit from "@hooks/useOctokit";
import React from "react";

export default function UsernameForm() {
  const { isLoadingRepo, getAllRepos, username, setUsername } = useOctokit();

  const handleOnUsernameChange = (e) => setUsername(e.target.value);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    getAllRepos();
  };

  return (
    <Box>
      <Heading size="lg" as="h2" mb={4} fontWeight="normal">
        👤 Set ID
      </Heading>

      <form onSubmit={handleOnSubmit}>
        <FormControl id="username" isRequired={true} mb={4}>
          <FormLabel>GitHub username or organization id</FormLabel>
          <InputGroup>
            <Input
              name="username"
              placeholder="username"
              defaultValue={username}
              onChange={handleOnUsernameChange}
            />
            <InputRightElement>
              {username ? <CheckIcon color="green.500" /> : <WarningIcon color="red.500" />}
            </InputRightElement>
          </InputGroup>
          <FormHelperText>
            Example: <strong>harshzalavadiya</strong> for
            <Link
              target="_blank"
              href="https://github.com/harshzalavadiya"
              fontWeight="bold"
              mx={1}
            >
              https://github.com/harshzalavadiya
            </Link>
          </FormHelperText>
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          isDisabled={!username}
          onClick={getAllRepos}
          leftIcon={<SearchIcon />}
          isLoading={isLoadingRepo}
        >
          List Repositories
        </Button>
      </form>
    </Box>
  );
}
