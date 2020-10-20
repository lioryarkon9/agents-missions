const getAgentsByCountries = ({ missions, agentsIsolationStatus }) => {
  const agentsByCountries = {};

  for (let m = 0; m < missions.length; m++) {
    const { country, agent } = missions[m];

    if (country in agentsByCountries) {
      if (agentsIsolationStatus[agent] === "isolated") {
        agentsByCountries[country].numberOfIsolatedAgents++;
      } else {
        agentsByCountries[country].numberOfNonIsolatedAgents++;
      }

      continue;
    }

    agentsByCountries[country] = {
      country,
      numberOfIsolatedAgents: 0,
      numberOfNonIsolatedAgents: 0,
    };
  }

  return agentsByCountries;
};

const byMostIsolated = (countryItemA, countryItemB) => {
  const {
    numberOfIsolatedAgents: numberOfIsolatedInCountryA,
    numberOfNonIsolatedAgents: numberOfNonIsolatedInCountryA,
  } = countryItemA;

  const {
    numberOfIsolatedAgents: numberOfIsolatedInCountryB,
    numberOfNonIsolatedAgents: numberOfNonIsolatedInCountryB,
  } = countryItemB;

  if (numberOfIsolatedInCountryA === numberOfIsolatedInCountryB) {
    return numberOfNonIsolatedInCountryA < numberOfNonIsolatedInCountryB
      ? -1
      : 1;
  }

  if (numberOfIsolatedInCountryA > numberOfIsolatedInCountryB) {
    return -1;
  }

  return 1;
};

export const getCountryWithTopIsolationStatus = (missions) => {
  const agentsIsolationStatus = missions.reduce((agents, currentMission) => {
    const { agent } = currentMission;

    if (agent in agents) {
      agents[agent] = "non-isolated";
    } else {
      agents[agent] = "isolated";
    }

    return agents;
  }, {});

  const agentsByCountries = getAgentsByCountries({
    missions,
    agentsIsolationStatus,
  });

  return Object.values(agentsByCountries).sort(byMostIsolated)[0].country;
};
