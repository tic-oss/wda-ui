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
    //

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
  // Modal is open and all form fields are displayed according to the selected cloud provider and deployment type
  it('3 should display all form fields when cloudName and deploymentType are provided', () => {
    // Arrange
    const props = {
      cloudModal: true,
      handleContainerClose: jest.fn(),
      cloudName: "aws",
      awsAccountId: "123456789",
      awsRegion: "us-east-1",
      kubernetesStorageClassName: "",
      azureLocation: "",
      subscriptionId: "",
      tenantId: "",
      clusterName: "",
      deploymentType: "kubernetes",
      ingressDomain: "",
      ingressType: "",
      k8sWebUI: "",
      kubernetesNamespace: "",
      kubernetesUseDynamicStorage: "",
      monitoring: "",
      dockerRepositoryName: "",
    };

    // Act
    render(<DeploymentModal {...props} />);

    // Assert
    expect(screen.getByTestId("awsAccountId")).toBeInTheDocument();
    expect(screen.getByTestId("awsRegion")).toBeInTheDocument();
    expect(screen.getByTestId("deploymentType")).toBeInTheDocument();
    expect(screen.getByTestId("clusterName")).toBeInTheDocument();
    expect(screen.getByTestId("kubernetesnamespace")).toBeInTheDocument();
    expect(screen.getByTestId("ingressType")).toBeInTheDocument();
    expect(screen.getByTestId("monitoring")).toBeInTheDocument();
    expect(screen.getByTestId("k8sWebUI")).toBeInTheDocument();
  });
  // Select inputs are rendered with correct options and selected value based on input props
  it('4 should render select inputs with correct options and selected value', () => {
    const props = {
      cloudModal: true,
      handleContainerClose: jest.fn(),
      cloudName: 'azure',
      awsAccountId: '123456789',
      awsRegion: 'us-east-1',
      kubernetesStorageClassName: '',
      azureLocation: 'canadacentral',
      subscriptionId: '123456789',
      tenantId: '987654321',
      clusterName: '',
      deploymentType: 'kubernetes',
      ingressDomain: '',
      ingressType: 'istio',
      k8sWebUI: 'true',
      kubernetesNamespace: 'default',
      kubernetesUseDynamicStorage: 'true',
      monitoring: 'true',
      dockerRepositoryName: ''
    };

    const { getByTestId } = render(<DeploymentModal {...props} />);

    expect(getByTestId('location').value).toBe('canadacentral');
    expect(getByTestId('ingressType').value).toBe('istio');
    expect(getByTestId('k8sWebUI').value).toBe('true');
    expect(getByTestId('monitoring').value).toBe('true');
  });
  // Modal is rendered with correct title and content based on input props when cloud name is minicube
  it('5 should render modal with correct title and content when cloud name is minicube', () => {
    const props = {
      cloudModal: true,
      handleContainerClose: jest.fn(),
      cloudName: 'minikube',
      awsAccountId: '',
      awsRegion: '',
      kubernetesStorageClassName: '',
      azureLocation: '',
      subscriptionId: '',
      tenantId: '',
      clusterName: '',
      deploymentType: '',
      ingressDomain: '',
      ingressType: '',
      k8sWebUI: '',
      kubernetesNamespace: '',
      kubernetesUseDynamicStorage: '',
      monitoring: '',
      dockerRepositoryName: ''
    };

    const { getByTestId } = render(<DeploymentModal {...props} />);

    expect(getByTestId('deploymentInfrastructure')).toHaveTextContent('Deployment Infrastructure');
    expect(getByTestId('kubernetesnamespace')).toHaveValue('');
    expect(getByTestId('dockerRepositoryName')).toHaveValue('');
    expect(getByTestId('kubernetesUseDynamicStorage')).toHaveValue('');
    expect(getByTestId('monitoring')).toHaveValue('');
  });


});
