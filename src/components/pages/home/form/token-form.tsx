import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link
} from "@chakra-ui/core";
import { CheckIcon, ExternalLinkIcon, WarningIcon } from "@chakra-ui/icons";
import useOctokit from "@hooks/useOctokit";
import React from "react";

export default function TokenForm() {
  const { token, setToken } = useOctokit();

  const handleOnTokenChange = (e) => setToken(e.target.value);

  return (
    <Box mb={6}>
      <Heading size="lg" as="h2" mb={4} fontWeight="normal">
        🔑 Set Access Token
      </Heading>

      <FormControl id="token" isRequired={true}>
        <FormLabel>GitHub Access Token</FormLabel>
        <InputGroup>
          <Input
            name="token"
            placeholder="GitHub Access Token"
            defaultValue={token}
            onChange={handleOnTokenChange}
          />
          <InputRightElement>
            {token ? <CheckIcon color="green.500" /> : <WarningIcon color="red.500" />}
          </InputRightElement>
        </InputGroup>
        <FormHelperText>
          Token is required for updating topics
          <Link
            target="_blank"
            href="https://github.com/settings/tokens/new?description=hacktoberfest&scopes=repo"
            fontWeight="bold"
            color="blue.500"
            mx={1}
          >
            token generation link <ExternalLinkIcon />
          </Link>
        </FormHelperText>
      </FormControl>
    </Box>
  );
}
