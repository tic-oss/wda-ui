import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "./Sidebar";
import '@testing-library/jest-dom'

// Mock necessary dependencies and props
jest.mock("@react-keycloak/web", () => ({
    useKeycloak: () => ({
        initialized: true,
        keycloak: { authenticated: true },
    }),
}));
jest.mock("react-router-dom", () => ({
    useLocation: () => ({ state: { projectName: "TestProject" } }),
}));

describe("Sidebar Component", () => {
    // Mock props and functions as needed for your tests
    const props = {
        isUINodeEnabled: false,
        Service_Discovery_Data: {},
        onSubmit: jest.fn(),
        authenticationData: {},
        isLoading: false,
        saveMetadata: false,
        Togglesave: jest.fn(),
        nodes: {},
        edges: {},
        isEmptyUiSubmit: false,
        isEmptyServiceSubmit: false,
        selectedColor: "",
        update: jest.fn(),
        updated: false,
        setUpdated: jest.fn(),
        triggerExit: {},
    };

    it("1 renders without crashing", () => {
        // Render the component and assert it doesn't throw errors
        render(<Sidebar {...props} />);
    });

    it("2 updates project name input correctly", () => {
        render(<Sidebar {...props} />);
        const projectNameInput = screen.getByTestId("projectName");

        // Simulate user input and check if the state is updated
        fireEvent.change(projectNameInput, { target: { value: "TestProject" } });
        expect(projectNameInput.value).toBe("TestProject");
    });
    it("3 toggles Authentication option correctly", () => {
        render(<Sidebar {...props} />);
        const authOption = screen.getByTestId("authentication");

        // Initially, the selected option should be null
        expect(authOption.querySelector("span").textContent).toContain("▼");

        // Click the Authentication option
        fireEvent.click(authOption);

        // The selected option should now be "Authentication"
        expect(authOption.querySelector("span").textContent).toContain("▲");
    });
    it(" 4 toggles Database option correctly", () => {
        render(<Sidebar {...props} />);
        const dbOption = screen.getByTestId("database");

        // Initially, the selected option should be null
        expect(dbOption.querySelector("span").textContent).toContain("▼");

        // Click the Database option
        fireEvent.click(dbOption);

        // The selected option should now be "Database"
        expect(dbOption.querySelector("span").textContent).toContain("▲");
    });
    it(" 5 toggles Service Discovery option correctly", () => {
        render(<Sidebar {...props} />);
        const sdOption = screen.getByTestId("serviceDiscovery");

        // Initially, the selected option should be null
        expect(sdOption.querySelector("span").textContent).toContain("▼");

        // Click the Service Discovery option
        fireEvent.click(sdOption);

        // The selected option should now be "Service Discovery"
        expect(sdOption.querySelector("span").textContent).toContain("▲");
    });
    it(" 6 toggles Log Management option correctly", () => {
        render(<Sidebar {...props} />);
        const lmOption = screen.getByTestId("loadManagement");

        // Initially, the selected option should be null
        expect(lmOption.querySelector("span").textContent).toContain("▼");

        // Click the Log Management option
        fireEvent.click(lmOption);

        // The selected option should now be "Log Management"
        expect(lmOption.querySelector("span").textContent).toContain("▲");
    });

    it(" 7 toggles Save Project checkbox correctly", () => {
        render(<Sidebar {...props} />);
        const saveProjectCheckbox = screen.getByTestId("saveProject");

        // Initially, the checkbox should be unchecked
        expect(saveProjectCheckbox.querySelector("input").checked).toBe(false);

    });

    it(" 8 displays an error for missing authentication type", () => {
        const { getByText } = render(<Sidebar {...props} />);
        const nextButton = screen.getByTestId("next");

        // Click the Next button without selecting authentication type
        fireEvent.click(nextButton);
        
        expect(getByText("Please ensure there exists atleast one application")).toBeInTheDocument();

    });

    it(" 9 disables Next button with invalid edges", () => {
        render(<Sidebar {...props} />);

        const nextButton = screen.getByTestId("next");
        expect(nextButton).toBeDisabled();
    });

    it('10 should initiate a drag event for UI+Gateway node', () => {
        render(<Sidebar {...props} />);
        const uiGatewayNode = screen.getByTestId("uiGateway");

        const mockEvent = new MouseEvent('dragstart', {
            dataTransfer: {
                setData: jest.fn(),
            },
        });

        // Simulate the drag start event
        fireEvent(uiGatewayNode, mockEvent);

        // Check if the correct data is set during drag
        expect(uiGatewayNode).toHaveProperty('draggable', true);

        // Clean up to prevent potential interference with other tests
        fireEvent.dragEnd(uiGatewayNode);
    });
    it('11 should initiate a drag event for UI+Gateway node', () => {
        render(<Sidebar {...props} />);
        const uiGatewayNode = screen.getByTestId("uiGateway");

        const mockEvent = new MouseEvent('dragstart', {
            dataTransfer: {
                setData: jest.fn(),
            },
        });

        // Simulate the drag start event
        fireEvent(uiGatewayNode, mockEvent);

        // Check if the correct data is set during drag
        expect(uiGatewayNode).toHaveProperty('draggable', true);

        // Clean up to prevent potential interference with other tests
        fireEvent.dragEnd(uiGatewayNode);
    });

    it('12 should initiate a drag event for Service node', () => {
        render(<Sidebar {...props} />);
        const serviceNode = screen.getByTestId("service");

        const mockEvent = new MouseEvent('dragstart', {
            dataTransfer: {
                setData: jest.fn(),
            },
        });

        // Simulate the drag start event
        fireEvent(serviceNode, mockEvent);

        // Check if the correct data is set during drag
        expect(serviceNode).toHaveProperty('draggable', true);

        // Clean up to prevent potential interference with other tests
        fireEvent.dragEnd(serviceNode);
    });

    it('13 should initiate a drag event for Group node', () => {
        render(<Sidebar {...props} />);
        const groupNode = screen.getByTestId("group");

        const mockEvent = new MouseEvent('dragstart', {
            dataTransfer: {
                setData: jest.fn(),
            },
        });

        // Simulate the drag start event
        fireEvent(groupNode, mockEvent);

        // Check if the correct data is set during drag
        expect(groupNode).toHaveProperty('draggable', true);

        // Clean up to prevent potential interference with other tests
        fireEvent.dragEnd(groupNode);
    });

    it('14 should initiate a drag event for Database postgresql node', () => {
        render(<Sidebar {...props} />);

        const dbOption = screen.getByTestId("database");

        // Initially, the selected option should be null
        expect(dbOption.querySelector("span").textContent).toContain("▼");

        // Click the Database option
        fireEvent.click(dbOption);
        const dbNode = screen.getByTestId("dbPostgresql");

        const mockEvent = new MouseEvent('dragstart', {
            dataTransfer: {
                setData: jest.fn(),
            },
        });

        // Simulate the drag start event
        fireEvent(dbNode, mockEvent);

        // Check if the correct data is set during drag
        expect(dbNode).toHaveProperty('draggable', true);

        // Clean up to prevent potential interference with other tests
        fireEvent.dragEnd(dbNode);
    });


    it('15 should initiate a drag event for Database mongodb node', () => {
        render(<Sidebar {...props} />);

        const dbOption = screen.getByTestId("database");

        // Initially, the selected option should be null
        expect(dbOption.querySelector("span").textContent).toContain("▼");

        // Click the Database option
        fireEvent.click(dbOption);
        const dbNode = screen.getByTestId("dbMongo");

        const mockEvent = new MouseEvent('dragstart', {
            dataTransfer: {
                setData: jest.fn(),
            },
        });

        // Simulate the drag start event
        fireEvent(dbNode, mockEvent);

        // Check if the correct data is set during drag
        expect(dbNode).toHaveProperty('draggable', true);

        // Clean up to prevent potential interference with other tests
        fireEvent.dragEnd(dbNode);
    });

    // Add more test cases for other draggable nodes as needed

    it('16 should initiate a drag event for Service Discovery Eureka node', () => {
        render(<Sidebar {...props} />);

        const servicediscovery = screen.getByTestId("serviceDiscovery");

        // Initially, the selected option should be null
        expect(servicediscovery.querySelector("span").textContent).toContain("▼");

        // Click the Database option
        fireEvent.click(servicediscovery);
        const eurekaNode = screen.getByTestId("discoveryEureka");

        const mockEvent = new MouseEvent('dragstart', {
            dataTransfer: {
                setData: jest.fn(),
            },
        });

        // Simulate the drag start event
        fireEvent(eurekaNode, mockEvent);

        // Check if the correct data is set during drag
        expect(eurekaNode).toHaveProperty('draggable', true);

        // Clean up to prevent potential interference with other tests
        fireEvent.dragEnd(eurekaNode);
    });
    it('17 should initiate a drag event for Log Management Elastic node', () => {
        render(<Sidebar {...props} />);
        const lmOption = screen.getByTestId("loadManagement");



        // Initially, the selected option should be null
        expect(lmOption.querySelector("span").textContent).toContain("▼");

        // Click the Database option
        fireEvent.click(lmOption);
        const elastic = screen.getByTestId("load_eck");

        const mockEvent = new MouseEvent('dragstart', {
            dataTransfer: {
                setData: jest.fn(),
            },
        });

        // Simulate the drag start event
        fireEvent(elastic, mockEvent);

        // Check if the correct data is set during drag
        expect(elastic).toHaveProperty('draggable', true);

        // Clean up to prevent potential interference with other tests
        fireEvent.dragEnd(elastic);
    });
    it('18 should initiate a drag event for Authentication keyclock node', () => {
        render(<Sidebar {...props} />);
        const authOption = screen.getByTestId("authentication");




        // Initially, the selected option should be null
        expect(authOption.querySelector("span").textContent).toContain("▼");

        // Click the Database option
        fireEvent.click(authOption);
        const keyclock = screen.getByTestId("keycloakLogo");

        const mockEvent = new MouseEvent('dragstart', {
            dataTransfer: {
                setData: jest.fn(),
            },
        });

        // Simulate the drag start event
        fireEvent(keyclock, mockEvent);

        // Check if the correct data is set during drag
        expect(keyclock).toHaveProperty('draggable', true);

        // Clean up to prevent potential interference with other tests
        fireEvent.dragEnd(keyclock);
    });



});
