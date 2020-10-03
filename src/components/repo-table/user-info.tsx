import { Box, Image, Link } from "@chakra-ui/core";
import useOctokit from "@hooks/useOctokit";
import React from "react";

export default function UserInfo() {
  const { userInfo } = useOctokit();

  return (
    <div>
      {userInfo && (
        <Link
          href={userInfo.url}
          target="_blank"
          rel="noreferrer"
          display="flex"
        >
          <Image
            boxSize="2.4rem"
            src={userInfo.avatar_url}
            loading="lazy"
            borderRadius="md"
            mr={2}
            display="inline-block"
          />
          <Box display="inline-block" lineHeight="1.2em">
            <strong>{userInfo.name}</strong>
            <br />
            <small>{userInfo.public_repos} Public Repositories</small>
          </Box>
        </Link>
      )}
    </div>
  );
}
