const covid19ImpactEstimator = (data) => {
    const { periodType, timeToElapse, reportedCases, totalHospitalBeds, region } = data
    const severeImpact = {}
    const impact = {}
    const input = data
    //get the duration as number of days
    elapseTime = toDays(periodType, timeToElapse)
    const factor = Math.floor((elapseTime / 3));

    //challenge 1
    //currently infected cases
    impact.currentlyInfected = reportedCases * 10;
    severeImpact.currentlyInfected = reportedCases * 50;
    //infections by requested time
    severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (2 ** factor);
    impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** factor);

    //challenge 2
    //get 15% of infections by requested time. severe cases
    impact.severeCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15;
    severeImpact.severeCasesByRequestedTime = severeImpact.infectionsByRequestedTime * 0.15;
    //hospital beds for severe cases by requested time
    impact.hospitalBedsByRequestedTime = Math.trunc((0.35 * totalHospitalBeds) - impact.severeCasesByRequestedTime)
    severeImpact.hospitalBedsByRequestedTime = Math.trunc((0.35 * totalHospitalBeds) - severeImpact.severeCasesByRequestedTime)


    //challenge 3
    //cases that require ICU
    impact.casesForICUByRequestedTime = Math.trunc(0.05 * impact.infectionsByRequestedTime);
    severeImpact.casesForICUByRequestedTime = Math.trunc(0.05 * severeImpact.infectionsByRequestedTime);
    //cases that require ventilators
    impact.casesForVentilatorsByRequestedTime = Math.trunc(0.02 * impact.infectionsByRequestedTime);
    severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(0.02 * severeImpact.infectionsByRequestedTime);
    //economic impact on country
    impact.dollarsInFlight = Math.trunc((impact.infectionsByRequestedTime * region.avgDailyIncomePopulation * region.avgDailyIncomeInUSD) / elapseTime);
    severeImpact.dollarsInFlight = Math.trunc((severeImpact.infectionsByRequestedTime * region.avgDailyIncomePopulation * region.avgDailyIncomeInUSD) / elapseTime);


    return {
        data: input,
        impact,
        severeImpact

    }
}
//convert period to days 

const toDays = (timeElapsed, period) => {
    switch (timeElapsed) {
        case 'months':
            return period * 30
            break;
        case 'weeks':
            return period * 7
            break
        default:
            return period
            break;
    };

};

module.exports = covid19ImpactEstimator;
