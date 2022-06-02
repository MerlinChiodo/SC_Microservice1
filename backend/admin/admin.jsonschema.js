
const ChangeAboutusSchema = {
    id: "/ChangeAboutusSchema",
    type: "object",
    properties: {
        aboutus: { type: "string", minLength: 0, maxLength: 191 },
        link: { type: "string", minLength: 1, maxLength: 191 },
        image: { type: "string", minLength: 0, maxLength: 191 }
    },
    required: ["link"]
};

export { ChangeAboutusSchema };