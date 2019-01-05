import {ServiceBroker} from 'moleculer';

export class Broker {
    private static broker: Broker = new Broker();
    private readonly serviceBroker: ServiceBroker;
    private constructor() {
        this.serviceBroker = new ServiceBroker({
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

    public static getInstance() {
        return Broker.broker.serviceBroker;
    }

    public static startBroker() {
        Broker.getInstance().start();
    }

    public static async getDiseasesNameLike(name) {
        return await Broker.getInstance()
            .call('medicine.getDiseasesNameLike', { name: name });
    }

    public static async getMedicationsForDisease(name) {
        return await Broker.getInstance()
            .call('medicine.getMedicationsForDisease', { name:name });
    }

    public static async getDisease(name) {
        return await Broker.getInstance().call('medicine.getDiseaseByName', { name });
    }

    public static async getSideEffectsForDrug(drugName) {
        return await Broker.getInstance().call('medicine.getSideEffectsByDrugName', { drugName });
    }

    public static emitPrescribedEvent(drugName) {
        Broker.getInstance().emit('drug.prescribed', { drugName });
    }

}
