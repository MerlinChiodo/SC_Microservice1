
const NewCitizenSchema = {
    id: "/NewCitizenSchema",
    type: "object",
    properties: {
        firstname: { type: "string", minLength: 1, maxLength: 100 },
        lastname: { type: "string", minLength: 1, maxLength: 100 },
        birthdate: { type: "string", format: "date-time" },
        birthname: { type: "string", minLength: 0, maxLength: 100 },
        place_of_birth: { type: "string", minLength: 0, maxLength: 100 },
        gender: { type: "string", pattern: "m|w|d" },
        email: { type: "string", minLength: 1, maxLength: 100, format: "email" },
        street: { type: "string", minLength: 1, maxLength: 100 },
        housenumber: { type: ["string", "integer"], minLength: 1, maxLength: 5 },
        city_code: { type: "integer", minimum: 1, maximum: 99999 },
        city: { type: "string", minLength: 1, maxLength: 100 }
    },
    required: ["firstname", "lastname", "birthdate", "gender", "street", "housenumber", "city_code", "city"]
};

const CitizenIDSchema = {
    id: "/CitizenIDSchema",
    type: "string",
    pattern: "^[1-9]\d*$"
}

export { NewCitizenSchema, CitizenIDSchema };
