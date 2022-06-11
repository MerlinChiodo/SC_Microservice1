
const BasicEvent = {
    id: "/BasicEvent",
    type: "object",
    properties: {
        event_name: { type: "string", minLength: 1 },
        event_id: { type: "integer", minimum: 1000, maximum: 9999 },
        service_name: { type: "string", minLength: 1 },
        date: { type: "string", pattern: "^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}$" },
    },
    required: ["event_name", "event_id", "service_name", "date"]
};

const Refugee = {
    id: "/Refugee",
    type: "object",
    properties: {
        firstname: { type: "string", minLength: 1 },
        lastname: { type: "string", minLength: 1 },
        "date of birth": { type: "string", format: "date" },
        email: { type: "string", format: "email" }
    },
    required: ["firstname", "lastname", "date of birth", "email"]
};


const NewRefugeeEvent = {
    id: "/NewRefugeeEvent",
    type: "object",
    properties: {
        event_name: { type: "string", minLength: 1 },
        event_id: { type: "integer", minimum: 9000, maximum: 9999 },
        service_name: { type: "string", pattern: "integration" },
        refugee: { $ref: "/Refugee" }
    },
    required: ["refugee", "event_id", "event_name", "service_name"]
};

const NewRefugeeFamilyEvent = {
    id: "/NewRefugeeFamilyEvent",
    type: "object",
    properties: {
        event_name: { type: "string", minLength: 1 },
        event_id: { type: "integer", minimum: 9000, maximum: 9999 },
        service_name: { type: "string", pattern: "integration" },
        parents: { type: "array", items: { $ref: "/Refugee" } },
        children: { type: "array", items: { $ref: "/Refugee" } }
    },
    required: ["parents", "children", "event_id", "event_name", "service_name"]
};


export { BasicEvent, Refugee, NewRefugeeEvent, NewRefugeeFamilyEvent };