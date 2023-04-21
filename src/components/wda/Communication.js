import React from "react";
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Input,
  Text,
  FormControl,
  FormLabel,
  CloseButton,
} from "@chakra-ui/react";

function Communication({ id, communication, setCommunication }) {
  const handleInputChange = (field, value) => {
    setCommunication((state) => ({
      ...state,
      [id]: {
        ...state[id],
        [field]: value,
      },
    }));
  };
  const handleDelete = () => {
    console.log("delCom");
  };

  return (
    <AccordionItem>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            <Text>Communication</Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <CloseButton size="sm" bg="transparent" onClick={handleDelete} />
      </div>
      <AccordionPanel pb={4}>
        <FormControl isRequired display="flex" flexDirection="row">
          <FormLabel width="150px" alignSelf="center">
            Client Name
          </FormLabel>
          <Input
            placeholder="Client"
            key="clientName"
            name="clientName"
            onChange={({ target }) =>
              handleInputChange("clientName", target.value)
            }
            marginBottom="10px"
            defaultValue={communication.clientName}
            type="text"
          />
        </FormControl>
        <FormControl isRequired display="flex" flexDirection="row">
          <FormLabel width="150px" alignSelf="center">
            Server Name
          </FormLabel>
          <Input
            placeholder="Server"
            key="serverName"
            name="serverName"
            onChange={({ target }) =>
              handleInputChange("serverName", target.value)
            }
            marginBottom="10px"
            defaultValue={communication.serverName}
            type="text"
          />
        </FormControl>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default Communication;
