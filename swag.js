const swaggerOptions = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Student Management API",
            version: "1.0.0",
            description: "Student Management System API Documentation"
        },

        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },

    apis: ["./routes/*.js"]
};

export default swaggerOptions;