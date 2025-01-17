import { SimpleGrid } from "@chakra-ui/react";
import client, { projectDataType } from "@components/cms/cms-data";
import Layout from "@components/layout";
import Project from "@components/projects/project";
import type { NextPage } from "next";

const Projects: NextPage<{ projectData: projectDataType[] }> = ({
  projectData,
}) => {
  return (
    <Layout pageIndex={0} p="1.5rem">
      <SimpleGrid columns={[1, 2, 3]} gap="1.5rem">
        {projectData.map((project, i) => {
          return <Project key={i} {...project} />;
        })}
      </SimpleGrid>
    </Layout>
  );
};

export async function getStaticProps() {
  const projectData =
    await client.fetch(`*[_type == 'project'] | order(index asc) {
    title,
    "slug": slug.current,
    link,
    codeLink,
    "image": image.asset->url,
    "langs": langs[]->{ name },
    body}`);

  return {
    props: {
      projectData,
    },
  };
}

export default Projects;
