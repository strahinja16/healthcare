import {ServiceBroker} from 'moleculer';

export class Broker {
    private static broker: ServiceBroker = Broker.intializeBroker();

    private constructor() {}

    public static getInstance() {
        return Broker.broker;
    }

    public static startBroker() {
        Broker.broker.start();
    }

    private static intializeBroker(): ServiceBroker {
        return new ServiceBroker({
            nodeID: 'api-1',
            logger: true,
            logLevel: 'info',
            transporter: {
                type: 'Redis',
                options: {
                    host: 'redis',
                },
            }});
    }
}
