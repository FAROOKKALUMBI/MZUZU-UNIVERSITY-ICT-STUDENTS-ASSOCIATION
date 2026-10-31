// Define a structure for representing electronic components
struct Component {
    char type[20];      // Type of electronic component
    float value;        // Value of the component (e.g., capacitance, resistance)
    int exponent;       // Exponent of the component value (e.g., -6 for micro)
    float voltage_rating; // Voltage rating of the component
};
