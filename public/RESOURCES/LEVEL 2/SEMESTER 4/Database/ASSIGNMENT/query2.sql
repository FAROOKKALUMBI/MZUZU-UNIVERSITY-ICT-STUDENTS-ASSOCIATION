-- Create Vehicles Table for transport department
CREATE TABLE Vehicles (
    VehicleID INT PRIMARY KEY,
    VehicleType VARCHAR(50),
    LicensePlateNumber VARCHAR(20),
    Model VARCHAR(50),
    Capacity INT,
    MaintenanceRecs TEXT
);

-- Create Routes Table
CREATE TABLE Routes (
	VehicleID INT,
    DriverID INT,
    RouteID INT PRIMARY KEY,
    RouteName VARCHAR(100),
    Stops TEXT,
    Frequency VARCHAR(50),
    FOREIGN KEY (VehicleID) REFERENCES Vehicles(VehicleID),
    FOREIGN KEY (DriverID) REFERENCES stuffmembers( stuffMemberID)
);

-- Create MaintenanceLogs Table
CREATE TABLE MaintenanceLogs (
    MaintenanceID INT PRIMARY KEY,
    VehicleID INT,
    MaintenanceType VARCHAR(50),
    DateTime DATETIME,
    Description TEXT,
    FOREIGN KEY (VehicleID) REFERENCES Vehicles(VehicleID)
);

-- Create TransportationRequests Table
CREATE TABLE TransportationRequests (
    RequestID INT PRIMARY KEY,
    RequesterInfo VARCHAR(100),
    DateTime DATETIME,
    Destination VARCHAR(100),
    VehicleAllocation INT -- Reference to a VehicleID, perhaps
);
