import React from 'react'
import { Button } from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { FiUploadCloud } from "react-icons/fi";

function CanvasContent() {
  return (
    <div className="contentBlock">
    <div className="iconBlock">
      <FiUploadCloud className="iconStyle" />
    </div>
    <div className="designText">
      Design your application architecture here
    </div>
    <div className="subText">
      Click next to auto generate code and setup infrastructure
    </div>
    <Button
      mt={4}
      border="2px"
      borderColor="#3367d9"
      alignContent="center"
      color="#3367d9"
      className="dragDropStyle"
    >
      Drag & Drop <ArrowRightIcon className="arrowIconStyle" />
    </Button>
  </div>
  )
}

export default CanvasContent