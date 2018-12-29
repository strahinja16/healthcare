const cron = require('node-cron');
const diseaseService = require('services/redis/disease');
const drugService = require('services/redis/drug');

const initCron = () => {
    cron.schedule("0 */12 * * *", async () => {
        await diseaseService.refreshAllDiseasesData();
        await diseaseService.refreshAllDiseaseDrugs();

        await drugService.refreshAllDrugSideEffects();
    });
};

module.exports = initCron;
