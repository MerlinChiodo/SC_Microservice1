
const PermitID = {
    id: "/PermitID",
    type: "string",
    pattern: "^[1-9]\\d*$"
};

const NewPermitSchema = {
    id: "/NewPermitSchema",
    type: "object",
    properties: {
        title: { type: "string", minLength: 1, maxLength: 100 },
        description: { type: "string", minLength: 1, maxLength: 65535 }
    },
    required: ["title"]
};

const UpdatePermitSchema = {
    id: "/UpdatePermitSchema",
    type: "object",
    properties: {
        title: { type: "string", minLength: 1, maxLength: 100 },
        description: { type: "string", minLength: 1, maxLength: 65535 }
    },
    required: ["title"]
};

const RequestPermitSchema = {
    id: "/RequestPermitSchema",
    type: "object",
    properties: {
        permit_id: { type: "string", pattern: "^[1-9]\\d*$" },
        citizen_id: { type: "integer", minimum: 1 },
        description: { type: "string", maxLength: 65535 }
    },
    required: ["permit_id", "citizen_id"]
};

const ApprovePermitSchema = {
    id: "/ApproveOrRejectPermitSchema",
    type: "object",
    properties: {
        valid_until: { type: ["string", "null"], format: "date" }
    },
    required: []
};

export { PermitID, NewPermitSchema, UpdatePermitSchema, RequestPermitSchema, ApprovePermitSchema };
