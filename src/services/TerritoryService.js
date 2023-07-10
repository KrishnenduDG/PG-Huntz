import {State,City } from "country-state-city";

class TerritoryService {
    getStates(){
        return State.getStatesOfCountry('IN');
    }

    getCities(stateCode){
        return City.getCitiesOfState('IN', stateCode);
    }

    getStateFromCode(stateCode){
        return State.getStateByCodeAndCountry(stateCode,'IN')
    }
}

export default TerritoryService