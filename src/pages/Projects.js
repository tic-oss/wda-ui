import { useHistory } from "react-router-dom";  
import useFetch from '../Hooks/useFetch'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
  } from '@chakra-ui/react'
function Projects() {

    // const {data,loading,error} = useFetch('/api/projects')
    const history= useHistory()
    const data =[
        {
            "_id": "6489a4b3819e4c0fc3f37f55",
            "project_id": "reminder-UZ6QXSq__",
            "metadata": {
                "abcd": "1234"
            },
            "createdAt": "2023-06-14T11:29:55.710Z",
            "updatedAt": "2023-06-14T11:29:55.710Z",
            "projectName": "reminder"
    
        },
        {
            "_id": "6489a4b3819e4c0fc3f37f55",
            "project_id": "reminder-UZ6QXSq__",
            "metadata": {
                    "nodes": {
                        "UI": {
                            "id": "UI",
                            "type": "input",
                            "data": {
                                "label": "fe",
                                "applicationName": "fe",
                                "clientFramework": "react",
                                "packageName": "p1",
                                "serverPort": "3000",
                                "withExample": "true",
                                "applicationType": "gateway",
                                "prodDatabaseType": "postgresql",
                                "serviceDiscoveryType": "eureka",
                                "authenticationType": "oauth2"
                            },
                            "style": {
                                "border": "1px solid #8c8d8f",
                                "padding": "4px 4px"
                            },
                            "position": {
                                "x": 207.5,
                                "y": -86.5,
                                "width": 150,
                                "height": 28
                            },
                            "selected": false,
                            "positionAbsolute": {
                                "x": 207.5,
                                "y": -86.5
                            },
                            "dragging": false
                        },
                        "Service_1": {
                            "id": "Service_1",
                            "type": "default",
                            "position": {
                                "x": 283.75,
                                "y": 24.5,
                                "width": 150,
                                "height": 28
                            },
                            "data": {
                                "label": "be",
                                "applicationName": "be",
                                "applicationFramework": "java",
                                "packageName": "p2",
                                "serverPort": "9000",
                                "applicationType": "microservice",
                                "prodDatabaseType": "postgresql",
                                "serviceDiscoveryType": "eureka",
                                "authenticationType": "oauth2"
                            },
                            "style": {
                                "border": "1px solid",
                                "padding": "4px 4px"
                            },
                            "selected": false,
                            "positionAbsolute": {
                                "x": 0,
                                "y": 0
                            },
                            "dragging": false
                        },
                        "authenticationType": {
                            "id": "authenticationType",
                            "type": "selectorNode3",
                            "position": {
                                "x": 470.75,
                                "y": -83.5,
                                "width": 70,
                                "height": 44
                            },
                            "data": {
                                "authenticationType": "oauth2"
                            },
                            "style": {
                                "border": "1px solid",
                                "padding": "4px 4px"
                            }
                        },
                        "serviceDiscoveryType": {
                            "id": "serviceDiscoveryType",
                            "type": "selectorNode1",
                            "position": {
                                "x": 481.75,
                                "y": 37.5,
                                "width": 60,
                                "height": 54
                            },
                            "data": {
                                "serviceDiscoveryType": "eureka"
                            },
                            "style": {
                                "border": "1px solid",
                                "padding": "4px 4px"
                            }
                        },
                        "Database_1": {
                            "id": "Database_1",
                            "type": "selectorNode",
                            "position": {
                                "x": 331.25,
                                "y": 132.5,
                                "width": 62,
                                "height": 62
                            },
                            "data": {
                                "prodDatabaseType": "postgresql"
                            },
                            "style": {
                                "border": "1px solid",
                                "padding": "4px 4px"
                            }
                        }
                    },
                    "edges": {
                        "UI-Service_1": {
                            "id": "UI-Service_1",
                            "source": "UI",
                            "sourceHandle": null,
                            "target": "Service_1",
                            "targetHandle": null,
                            "markerEnd": {
                                "color": "#e2e8f0",
                                "type": "arrowclosed"
                            },
                            "type": "straight",
                            "data": {
                                "client": "fe",
                                "server": "be",
                                "type": "asynchronous",
                                "framework": "rabbitmq"
                            },
                            "selected": true,
                            "label": "RabbitMQ",
                            "style": {
                                "stroke": "#e2e8f0"
                            }
                        },
                        "Service_1-Database_1": {
                            "id": "Service_1-Database_1",
                            "source": "Service_1",
                            "sourceHandle": null,
                            "target": "Database_1",
                            "targetHandle": null,
                            "markerEnd": {
                                "type": "arrowclosed"
                            },
                            "type": "straight",
                            "data": {
                                "client": "be"
                            }
                        },
                        "UI-Database_1": {
                            "id": "UI-Database_1",
                            "source": "UI",
                            "sourceHandle": null,
                            "target": "Database_1",
                            "targetHandle": null,
                            "markerEnd": {
                                "type": "arrowclosed"
                            },
                            "type": "straight",
                            "data": {
                                "client": "fe"
                            }
                        }
                    }
            },
            "createdAt": "2023-06-14T11:29:55.710Z",
            "updatedAt": "2023-06-14T11:29:55.710Z",
            "projectName": "reminder2"
    
        }
    
    ]
    const handleClick= (data,id)=>{
        console.log(data)
        history.push({
            pathname: '/project/'+id,
            state: data
          });
    }

  return (
    <div>
      <TableContainer sx={{margin:'5%'}}>
      <Table variant='simple'>
        <Thead>
            <Tr>
                <Th>S.No</Th>
                <Th>Project Id</Th>
                <Th>Project Name</Th>
                <Th>View Architecture Diagram</Th>
                <Th>View Infrastructure</Th>
            </Tr>
        </Thead>
        <Tbody>
            { data.map((project,index)=>{
                return(
                    <Tr key={index}>
                        <Td>{index}</Td>
                        <Td>{project.project_id}</Td>
                        <Td>{project.projectName}</Td>
                        <Td><Button colorScheme='teal'
                             variant='link'
                             onClick={(e)=>handleClick(project.metadata,project.project_id)}
                        >Link</Button></Td>
                        <Td><Button colorScheme='teal'
                             variant='link'
                             onClick={(e)=>handleClick(project.metadata?.deployment,project.project_id)}
                        >Link</Button></Td>
                    </Tr>
                )
            })
            }
        </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Projects
