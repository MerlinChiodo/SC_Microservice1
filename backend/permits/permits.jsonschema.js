
const PermitID = {
    "id": "/PermitID",
    "type": "string",
    "pattern": "^[0-9]+$"
};

const NewPermitSchema = {
    "id": "/NewPermitSchema",
    "type": "object",
    "properties": {
        "title": { "type": "string", "minLength": 1, "maxLength": 100 },
        "description": { "type": "string", "minLength": 1, "maxLength": 65535 }
    },
    "required": ["title"]
};

const UpdatePermitSchema = {
    "id": "/UpdatePermitSchema",
    "type": "object",
    "properties": {
        "title": { "type": "string", "minLength": 1, "maxLength": 100 },
        "description": { "type": "string", "minLength": 1, "maxLength": 65535 }
    },
    "required": ["title"]
};

export { PermitID, NewPermitSchema, UpdatePermitSchema };
