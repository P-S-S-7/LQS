const REACT_APP_API_URI = "http://localhost:3000/api/v1";
const studentEmailRegex = /^[1-9][0-9][a-zA-Z]{3}[0-9]{2}[1-9]@lnmiit\.ac\.in$/;
const facultyEmailRegex = /^[a-zA-Z]{1}[a-zA-Z0-9]{1,}@lnmiit\.ac\.in$/; 
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


export { REACT_APP_API_URI, passwordRegex, studentEmailRegex, facultyEmailRegex };
