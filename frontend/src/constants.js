const REACT_APP_API_URI = "https://lqs.onrender.com";
const studentEmailRegex = /^[1-9][0-9][a-zA-Z]{3}[0-9]{2}[1-9]@lnmiit\.ac\.in$/;
const facultyEmailRegex = /^[a-zA-Z]{1}[a-zA-Z0-9]{1,}@lnmiit\.ac\.in$/; 
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const nameRegex = /^([A-Z][a-z]+)( [A-Z][a-z]+)*$/;


export { REACT_APP_API_URI, passwordRegex, studentEmailRegex, facultyEmailRegex, nameRegex };
