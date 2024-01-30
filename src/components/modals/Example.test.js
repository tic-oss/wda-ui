import { divideNumbers } from './Example';

describe('divideNumbers', () => {

    // Returns the correct result when dividing two positive numbers
    it('should return the correct result when dividing two positive numbers', () => {
      const result = divideNumbers(10, 2);
      expect(result).toBe(5);
    });

    // Returns the correct result when dividing a positive number by a negative number
    it('should return the correct result when dividing a positive number by a negative number', () => {
      const result = divideNumbers(10, -2);
      expect(result).toBe(-5);
    });

    // Returns the correct result when dividing two negative numbers
    it('should return the correct result when dividing two negative numbers', () => {
      const result = divideNumbers(-10, -2);
      expect(result).toBe(5);
    });

    // Throws an error when dividing by zero
    it('should throw an error when dividing by zero', () => {
      expect(() => {
        divideNumbers(10, 0);
      }).toThrow("Division by zero is not allowed");
    });

    // Throws an error when num1 is not a number
    it('should throw an error when num1 is not a number', () => {
      expect(() => {
        divideNumbers("10", 2);
      }).toThrow("Invalid input. Please provide valid numbers");
    });

    // Throws an error when num2 is not a number
    it('should throw an error when num2 is not a number', () => {
      expect(() => {
        divideNumbers(10, "2");
      }).toThrow("Invalid input. Please provide valid numbers");
    });

        // Check for potential precision issues
        it('should throw an error when there are potential precision issues', () => {
            expect(() => {
              divideNumbers(Number.MAX_VALUE, Number.MIN_VALUE);
            }).toThrow("Result is not finite. This may be due to precision issues.");
          });
              // Check if inputs are valid numbers
    it('should throw an error when num1 is not a number', () => {
        expect(() => {
          divideNumbers("10", 2);
        }).toThrow("Invalid input. Please provide valid numbers");
      });
          // Perform the division
    it('should return the correct result when dividing two positive numbers', () => {
        const result = divideNumbers(10, 2);
        expect(result).toBe(5);
      });
          // Throws an error when num1 and num2 are valid numbers and num2 is zero
    it('should throw an error when dividing by zero', () => {
        expect(() => {
          divideNumbers(10, 0);
        }).toThrow("Division by zero is not allowed");
      });

          // Returns the correct result when dividing a negative number by a positive number
    it('should return the correct result when dividing a negative number by a positive number', () => {
        const result = divideNumbers(-10, 2);
        expect(result).toBe(-5);
      });
});
