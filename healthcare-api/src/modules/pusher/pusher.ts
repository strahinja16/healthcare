import * as ImportedPusher from 'pusher';

export class Pusher {
    private static pusher: ImportedPusher = Pusher.intializePusher();

    private constructor() {}

    public static getInstance() {
        return Pusher.pusher;
    }

    public static async test() {
        Pusher.getInstance().trigger('test2', 'x3', {
            "message": "hello world"
        });
    }


    private static intializePusher(): ImportedPusher {
        return new ImportedPusher({
            appId: '683863',
            key: 'f15495b1a9cc2b74d7ed',
            secret: '2f20085f5836beac3089',
            cluster: 'eu',
            useTLS: true
        });
    }
}
