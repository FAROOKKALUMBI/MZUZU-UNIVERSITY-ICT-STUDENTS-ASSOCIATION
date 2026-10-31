int main() {
    // Create an instance of Component
    Component capacitor = {"Capacitor", "Electrolytic", 47.0, -6, 16.0};

    // Declare a pointer to the Component
    Component *componentPtr = &capacitor;

    // Access the value of the component using the pointer
    printf("Type: %s\n", componentPtr->type);
    printf("Subtype: %s\n", componentPtr->subtype);
    printf("Value: %.2f\n", componentPtr->value);
    printf("Exponent: %d\n", componentPtr->exponent);
    printf("Voltage Rating: %.2fV\n", componentPtr->voltage_rating);

    return 0;
}
