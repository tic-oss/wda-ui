// export function addNumbers(num1, num2) {
//     return num1 + num2;
//   }

export function divideNumbers(num1, num2) {
    // Check for division by zero
    if (num2 === 0) {
      throw new Error("Division by zero is not allowed");
    }
  
    // Check if inputs are valid numbers
    if (typeof num1 !== 'number' || typeof num2 !== 'number' || isNaN(num1) || isNaN(num2)) {
      throw new Error("Invalid input. Please provide valid numbers");
    }
  
    // Perform the division
    const result = num1 / num2;
  
    // Check for potential precision issues
    if (!isFinite(result)) {
      throw new Error("Result is not finite. This may be due to precision issues.");
    }
  
    return result;
  }
  