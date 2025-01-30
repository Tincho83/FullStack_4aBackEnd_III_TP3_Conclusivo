//Manejo de Errores.4. 



export const ERROR_MESSAGES = {    
    USER: {
        NAME_REQUIRED: "The user's name is required.***",
        EMAIL_REQUIRED: "Email is required.***",
        PASSWORD_REQUIRED: "Password is required.***",
        USER_ALREADY_EXISTS: "The user already exists.***",
        INVALID_ID: "Invalid ID User.***",
        MISSING_FIELDS: "Fields need to be completed.***",
        USER_NOT_FOUND: "User not found.***",
        FILE_NOT_FOUND: "File not found.***"
    },
    PET: {
        PET_NOT_FOUND: "Pet not found.***",
        NAME_REQUIRED: "Name of the pet is required.***",
        SPECIE_REQUIRED: "Name of the pet is required.***",
        INVALID_ID: "Invalid ID Pet.***",
        MISSING_FIELDS: "Fields need to be completed.***",
        FILE_NOT_FOUND: "File not found.***"
    },
    ADOPTION: {
        ADOPTION_LIMIT_REACHED: "The user has reached the limit of permitted adoptions.***",
        ADOPTION_NOT_FOUND: "Adoption not found.***",
        INVALID_ID: "Invalid ID Adoption.***",
    },
    SESSION: {
        INVALID_CRED: "Invalid Credentials.***"
    },
    COMMONERROR: {
        INTERNAL_ERROR: "Internal Error in the Server.***"
    }
};