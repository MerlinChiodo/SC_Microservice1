
const PermitID = {
    id: "/PermitID",
    type: "string",
    pattern: "^[1-9]\d*$"
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
        permit_id: { type: "string", pattern: "^[1-9]\d*$" },
        citizen_id: { type: "string", pattern: "^[1-9]\d*$" }
    },
    required: ["permit_id", "citizen_id"]
};

const ApproveOrRejectPermitSchema = {
    id: "/ApproveOrRejectPermitSchema",
    type: "object",
    properties: {
        citizen_id: { type: "string", pattern: "^[1-9]\d*$" },
        status: { type: "string", pattern: "^(offen|angenommen|abgelehnt)$" },
        valid_until: { type: "string", format: "date" }
    },
    required: ["citizen_id", "status"]
};

export { PermitID, NewPermitSchema, UpdatePermitSchema, RequestPermitSchema, ApproveOrRejectPermitSchema };
