const getBaseUrl = () => {
  
    switch(process.env.NODE_ENV) {
      case 'production':
        return  'https://loanpro-challenge-be-production.up.railway.app/v1';
        break;
      case 'development':
      default:
        return 'http://localhost:8080/v1';
    }
    console.log("ENV:",process.env );
}

// export const BACKEND_URL = "http://localhost:8080/v1";
export const BACKEND_URL = getBaseUrl();

export const OPERATORS_NAMES = {
    ADDITION : "ADDITION",
    SUBTRACTION : "SUBTRACTION" ,
    MULTIPLICATION : "MULTIPLICATION" ,
    DIVISION : "DIVISION" ,
    SQUARE_ROOT : "SQUARE_ROOT" ,
    RANDOM_STRING : "RANDOM_STRING"
};

export const OPERATORS_MAP = new Map([
    [OPERATORS_NAMES.ADDITION, "Addition"],
    [OPERATORS_NAMES.SUBTRACTION, "Subtraction"],
    [OPERATORS_NAMES.MULTIPLICATION, "Multiplication"],
    [OPERATORS_NAMES.DIVISION, "Division"],
    [OPERATORS_NAMES.SQUARE_ROOT, "Square Root"],
    [OPERATORS_NAMES.RANDOM_STRING, "Random"],
]);