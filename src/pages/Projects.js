import { useHistory } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";
import azure from "../../src/assets/Azure.png";
import aws from "../../src/assets/aws.png";

function Projects() {
  // const {data,loading,error} = useFetch('/api/projects')
  const history = useHistory();

  const [data, setData] = useState([]);
  const { keycloak, initialized } = useKeycloak();

  const handleClick = (data, column, name) => {
    console.log(data);
    // const navigate = window.open("/project/" + name, "_blank");
    if (column === "Architecture")
      history.push({
        // pathname: navigate.focus(),
        pathname: "/project/" + name,
        state: data,
      });
    else
      history.push({
        pathname: "/project/" + name,
        state: data,
      });
  };
  useEffect(() => {
    console.log(`Bearer ${keycloak?.token}`, "token");
    if (initialized) {
      fetch(process.env.REACT_APP_API_BASE_URL + "/api/blueprints", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: initialized ? `Bearer ${keycloak?.token}` : undefined,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          setData(result.data);
        })
        .catch((error) => console.error(error));
    }
  }, [initialized, keycloak]);

  return (
    <div>
      <TableContainer sx={{ margin: "5%" }}>
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>S.No</Th>
              <Th>Projects</Th>
              <Th>View Infrastructure</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((project, index) => {
              return (
                <Tr key={index}>
                  <Td>{index}</Td>
                  <Td>
                    <Button
                      colorScheme="teal"
                      variant="link"
                      onClick={(e) =>
                        handleClick(
                          project.metadata,
                          "Architecture",
                          project.projectName
                        )
                      }
                      _hover={{
                        transform: "scale(1.1)",
                        transition: "transform 0.3s",
                        fontWeight: "bolder",
                        color: "red",
                      }}
                    >
                      {project.projectName}
                    </Button>
                  </Td>
                  {project.metadata?.deployment ? (
                    <Td>
                      <Button
                        colorScheme="teal"
                        variant="link"
                        onClick={(e) =>
                          handleClick(
                            project.metadata?.deployment,
                            "Infrastructure",
                            project.projectName
                          )
                        }
                        _hover={{
                          transform: "scale(1.1)",
                          transition: "transform 0.3s",
                          fontWeight: "bolder",
                          color: "red",
                        }}
                      >
                        {project.metadata.deployment.cloudProvider ===
                        "azure" ? (
                          <img width="60px" src={azure} />
                        ) : (
                          <img width="60px" src={aws} />
                        )}
                      </Button>
                    </Td>
                  ) : (
                    <Td>-</Td>
                  )}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Projects;
