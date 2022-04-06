import type { NextPage } from "next";
import Head from "next/head";
import { Flex } from "@chakra-ui/react";
import Todooo from "../src/components/Todooo";
import Background from "../src/components/Background";

const IndexPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Todooo</title>
        <meta
          name="description"
          content="The only todo list you will ever need"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex position="relative" justifyContent="center">
        <Background />
        <Todooo />
      </Flex>
    </>
  );
};

export default IndexPage;
