export = {
    transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'hakaton.medicine@gmail.com',
            pass: 'hakaton1!'
        }
    },
    defaults: {
        forceEmbeddedImages: true,
        from:'Healthcare service',
    },
    templateDir: './src/common/email-templates'
}
