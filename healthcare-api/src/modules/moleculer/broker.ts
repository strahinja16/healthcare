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

    public static async getDiseasesNameLike(name) {
        return await Broker.broker
            .call('medicine.getDiseasesNameLike', { name: name });
    }

    public static async getMedicationsForDisease(name) {
        return await Broker.broker
            .call('medicine.getMedicationsForDisease', { name:name });
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
