import React, { useEffect, useState } from "react";
import db1 from "../../../assets/postgresql.png";
import db2 from "../../../assets/mongo.png";
import eurkea from "../../../assets/eureka.png";
import keycloakIcon from "../../../assets/keycloak.png";
import eck from "../../../assets/eck.png";
import "../.././../App.css";
import { Input, FormLabel, Button, Checkbox } from "@chakra-ui/react";
import DeployModal from "../../Modal/DeployModal";
import { useKeycloak } from "@react-keycloak/web";
import { ArrowRightIcon, ArrowLeftIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";
import "./style.css";

const Sidebar = ({
  isUINodeEnabled,
  Service_Discovery_Data,
  onSubmit,
  authenticationData,
  isLoading,
  saveMetadata,
  Togglesave,
  nodes,
  edges,
  isEmptyUiSubmit,
  isEmptyServiceSubmit,
  selectedColor,
  update,
  updated,
  setUpdated,
  triggerExit,
}) => {
  const location = useLocation();
  const onDragStart = (event, nodeType, Name) => {
    event.dataTransfer.setData("Name", Name);
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  const [selectedOption, setSelectedOption] = useState(null);
  const toggleOption = (option) => {
    setSelectedOption((prevOption) => (prevOption === option ? null : option));
  };
  var applicationName = "";
  if (location?.state) applicationName = location.state.projectName;
  else if (localStorage?.data) {
    applicationName = JSON.parse(localStorage.data).projectName;
  }
  const IntialState = {
    projectName: applicationName,
  };
  const [projectData, setprojectData] = useState(IntialState);
  useEffect(() => {
    if (triggerExit.onOk) {
      setprojectData({
        projectName: "",
      });
    }
  }, [triggerExit]);

  const handleProjectData = (column, value) => {
    setUpdated(true);
    let data = {};
    if (localStorage?.data) data = JSON.parse(localStorage.data);
    data.projectName = value;
    data.updated = updated;
    localStorage.data = JSON.stringify(data);
    setprojectData((prev) => ({ ...prev, [column]: value }));
  };
  const [showModal, setShowModal] = useState(false);
  const { initialized, keycloak } = useKeycloak();

  const handleButtonClick = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const checkNodeExists =
    nodes?.UI ||
    Object.values(nodes).some((node) => node.id.startsWith("Service"));

  const projectNameCheck = !/^[a-zA-Z](?:[a-zA-Z0-9_-]*[a-zA-Z0-9])?$/g.test(
    projectData.projectName
  );
  const [isContentVisible, setContentVisible] = useState(true);

  const checkEdge = () => {
    let updatedEdges = { ...edges };
    let updatedNodes = { ...nodes };
    if (Object.keys(updatedNodes).length !== 0) {
      for (const key in updatedNodes) {
        let databaseCheck = updatedNodes[key];
        if (
          databaseCheck?.id?.startsWith("Database") &&
          !databaseCheck?.data?.isConnected
        ) {
          return true;
        }
      }
    }
    if (Object.keys(updatedEdges).length !== 0) {
      for (const key in updatedEdges) {
        let edgeCheck = updatedEdges[key];
        if (
          edgeCheck?.target?.startsWith("Service") &&
          !edgeCheck?.data?.framework
        ) {
          return true;
        }
      }
      return false;
    }
  };

  const checkDisabled = () => {
    if (
      !checkNodeExists ||
      !authenticationData ||
      projectNameCheck ||
      projectData.projectName === "" ||
      isEmptyUiSubmit === true ||
      isEmptyServiceSubmit === true
    )
      return true;
    else return false;
  };

  const handleToggleContent = () => {
    setContentVisible(!isContentVisible);
  };

  return (
    <>
      <aside
        className={`sidebar-container ${
          isContentVisible ? "sidebar-container-expanded" : ""
        }`}
      >
        <ArrowRightIcon
          className={`expand-style ${isContentVisible ? "hide" : ""}`}
          onClick={handleToggleContent}
        />
        <div
          className={`sideBlock ${
            isContentVisible ? "side-content visible" : ""
          }`}
        >
          <div className="applicationDetails">
            <FormLabel className="projectName">Project Name</FormLabel>
            <ArrowLeftIcon className="collapse" onClick={handleToggleContent} />
          </div>
          <Input
            mb={1}
            variant="outline"
            id="projectName"
            borderColor={
              !projectData.projectName || projectNameCheck ? "red" : "#CFCFCF"
            }
            maxLength="32"
            value={projectData.projectName}
            onChange={(e) => handleProjectData("projectName", e.target.value)}
          ></Input>
          {projectData.projectName && projectNameCheck && (
            <span className="projectNameError">Enter a valid project name</span>
          )}
          <div className="description">
            <h2 className="dragNodesDescription">
              You can drag these nodes to the pane on the right.
            </h2>
          </div>

          <div
            className={`dndnode output ${isUINodeEnabled ? "disabled" : ""}`}
            onDragStart={(event) => onDragStart(event, "default", "UI+Gateway")}
            draggable={!isUINodeEnabled}
            style={{
              backgroundColor: isUINodeEnabled ? "#CFCFCF" : "",
              cursor: isUINodeEnabled ? "not-allowed" : "",
            }}
          >
            UI+Gateway
          </div>

          <div
            className="dndnode output"
            onDragStart={(event) => onDragStart(event, "default", "Service")}
            draggable
          >
            Service
          </div>
          <div
            className="dndnode output"
            onDragStart={(event) => onDragStart(event, "default", "Group")}
            draggable
          >
            Group
          </div>
          <h1
            className="nodeHeading"
            onClick={() => toggleOption("Authentication")}
          >
            Authentication{" "}
            {selectedOption === "Authentication" ? (
              <span>&#x25B2;</span>
            ) : (
              <span>&#x25BC;</span>
            )}
          </h1>
          {selectedOption === "Authentication" && (
            <>
              <div
                className="selectorNode3"
                onDragStart={(event) =>
                  onDragStart(event, "default", "Auth_oauth2")
                }
                draggable
              >
                <img width="145px" src={keycloakIcon} alt="keycloaklogo"></img>
              </div>
            </>
          )}
          <h1 className="nodeHeading" onClick={() => toggleOption("Database")}>
            Database{" "}
            {selectedOption === "Databases" ? (
              <span>&#x25B2;</span>
            ) : (
              <span>&#x25BC;</span>
            )}
          </h1>
          {selectedOption === "Database" && (
            <>
              <div
                className="selectorNode"
                onDragStart={(event) =>
                  onDragStart(event, "default", "Database_postgresql")
                }
                draggable
              >
                <img
                  width="145px"
                  className="postgresqlStyle"
                  src={db1}
                  alt="postgreslogo"
                ></img>
              </div>
              <div
                className="selectorNode"
                onDragStart={(event) =>
                  onDragStart(event, "default", "Database_mongodb")
                }
                draggable
              >
                <img
                  width="145px"
                  className="mongoIconStyle"
                  src={db2}
                  alt="mongologo"
                ></img>
              </div>
            </>
          )}

          <h1>
            <span
              className="nodeHeading"
              onClick={() => toggleOption("serviceDiscovery")}
            >
              Service Discovery{" "}
              {selectedOption === "serviceDiscovery" ? (
                <span>&#x25B2;</span>
              ) : (
                <span>&#x25BC;</span>
              )}
            </span>
          </h1>
          {selectedOption === "serviceDiscovery" && (
            <>
              <div
                className="selectorNode1"
                onDragStart={(event) =>
                  onDragStart(event, "default", "Discovery_eureka")
                }
                draggable
              >
                <img
                  width="100px"
                  height="40px"
                  src={eurkea}
                  alt="eurekalogo"
                ></img>
              </div>
            </>
          )}
          <h1>
            <span
              className="nodeHeading"
              onClick={() => toggleOption("loadManagement")}
            >
              Log Management{" "}
              {selectedOption === "loadManagement" ? (
                <span>&#x25B2;</span>
              ) : (
                <span>&#x25BC;</span>
              )}
            </span>
          </h1>
          {selectedOption === "loadManagement" && (
            <>
              <div
                className="selectorNode6"
                onDragStart={(event) =>
                  onDragStart(event, "default", "Load_eck")
                }
                draggable
              >
                <img width="120px" src={eck} alt="ecklogo" />
              </div>
            </>
          )}
        </div>
        <div className="saveProject">
          {initialized && keycloak.authenticated && (
            <Checkbox
              size="md"
              colorScheme="blue"
              isChecked={saveMetadata}
              onChange={Togglesave}
            >
              Save Project
            </Checkbox>
          )}
          <Button
            onClick={handleButtonClick}
            mt={4}
            border="2px"
            borderColor="#3182CE"
            width="100px"
            type="submit"
            isDisabled={checkEdge() || checkDisabled()}
          >
            Next
          </Button>
          {showModal && (
            <DeployModal
              onSubmit={onSubmit}
              isLoading={isLoading}
              projectData={projectData}
              onClose={handleCloseModal}
              Service_Discovery_Data={Service_Discovery_Data}
              update={update}
            />
          )}

          {!checkNodeExists ? (
            <p className="errorMessage">
              Please ensure there exists atleast one application
            </p>
          ) : (
            <></>
          )}
          {!authenticationData ? (
            <p className="errorMessage">Please select Authentication type</p>
          ) : (
            <></>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
