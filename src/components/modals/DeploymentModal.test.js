import React from "react";
import { render, screen } from "@testing-library/react";
import DeploymentModal from "./DeploymentModal";
import '@testing-library/jest-dom'


describe("DeploymentModal", () => {
  it("01 renders the modal with the correct header", () => {
    render(<DeploymentModal cloudModal={true} />);

    // Use screen queries to check if the modal content is present
    const headerElement = screen.getByTestId("deploymentInfrastructure");
    expect(headerElement).toBeInTheDocument();
  });


  // CloudName is "aws" and AWS Account ID and AWS Region are rendered correctly
  it('02 should render AWS Account ID and AWS Region fields when cloudName is "aws"', () => {
    // Arrange
    const cloudModal = true;
    const handleContainerClose = jest.fn();
    const cloudName = "aws";
    const awsAccountId = "123456789";
    const awsRegion = "us-east-2";
    const kubernetesStorageClassName = "";
    const azureLocation = "";
    const subscriptionId = "";
    const tenantId = "";
    const clusterName = "";
    const deploymentType = "";
    const ingressDomain = "";
    const ingressType = "";
    const k8sWebUI = "";
    const kubernetesNamespace = "";
    const kubernetesUseDynamicStorage = "";
    const monitoring = "";
    const dockerRepositoryName = "";

    // Act
    render(
      <DeploymentModal
        cloudModal={cloudModal}
        handleContainerClose={handleContainerClose}
        cloudName={cloudName}
        awsAccountId={awsAccountId}
        awsRegion={awsRegion}
        kubernetesStorageClassName={kubernetesStorageClassName}
        azureLocation={azureLocation}
        subscriptionId={subscriptionId}
        tenantId={tenantId}
        clusterName={clusterName}
        deploymentType={deploymentType}
        ingressDomain={ingressDomain}
        ingressType={ingressType}
        k8sWebUI={k8sWebUI}
        kubernetesNamespace={kubernetesNamespace}
        kubernetesUseDynamicStorage={kubernetesUseDynamicStorage}
        monitoring={monitoring}
        dockerRepositoryName={dockerRepositoryName}
      />
    );

    // Assert
    expect(screen.getByTestId("awsAccountId")).toBeInTheDocument();
    expect(screen.getByTestId("awsRegion")).toBeInTheDocument();
  });
});
