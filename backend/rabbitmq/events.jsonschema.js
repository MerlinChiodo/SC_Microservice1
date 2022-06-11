
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

export { BasicEvent };