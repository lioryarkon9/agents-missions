import React from "react";
import styled, { css } from "styled-components";

import missions from "../missions";
import { getCountryWithTopIsolationStatus } from "../utils";

const missionsByAscendingDate = [...missions].sort(
  ({ date: dateA }, { date: dateB }) => {
    if (new Date(dateA) < new Date(dateB)) {
      return -1;
    }

    return 1;
  }
);

const SMALL_SCREEN = "only screen and (max-width: 750px)";

const theme = {
  colors: {
    layout: "#f2f2f5",
    border: "#c9cdd0",
    text: "##3b3b3c",
    mission: "#fff",
  },
  borderRadius: "5px",
  padding: "8px",
  headerBorderPadding: "10px",
};

const App = () => {
  const mostIsolatedCountry = getCountryWithTopIsolationStatus(missions);

  return (
    <MaxWidthContainer>
      <WebPage>
        <Missions>
          <MobileMissionsInfo>
            {missions.length} missions; most isolated country:{" "}
            {mostIsolatedCountry}
          </MobileMissionsInfo>

          <Header>
            <SmallCell>Agent ID</SmallCell>
            <SmallCell isLeftBorder={true}>Country</SmallCell>
            <LargeCell isLeftBorder={true}>Address</LargeCell>
            <MediumCell isLeftBorder={true}>Date</MediumCell>
          </Header>

          {missionsByAscendingDate.map((mission, index) => (
            <Mission key={index}>
              <SmallCell>{mission.agent}</SmallCell>
              <SmallCell>{mission.country}</SmallCell>
              <LargeCell>{mission.address}</LargeCell>
              <MediumCell>{mission.date}</MediumCell>
            </Mission>
          ))}

          <DesktopMissionsInfo>
            {missions.length} missions; most isolated country:{" "}
            {mostIsolatedCountry}
          </DesktopMissionsInfo>
        </Missions>
      </WebPage>
    </MaxWidthContainer>
  );
};

const DesktopMissionsInfo = styled.div`
  text-align: right;
  padding: ${theme.padding};
  border: 1px solid ${theme.colors.border};

  @media ${SMALL_SCREEN} {
    display: none;
  }
`;

const MobileMissionsInfo = styled.div`
  text-align: right;
  display: none;
  padding: ${theme.padding};
  border: 1px solid ${theme.colors.border};

  @media ${SMALL_SCREEN} {
    display: block;
  }
`;

const SmallCell = styled.div`
  width: 12%;

  padding-left: ${theme.headerBorderPadding};

  @media ${SMALL_SCREEN} {
    width: 50%;
    font-weight: bold;
    margin-bottom: 5px;
    padding-left: 0;
  }

  ${({ isLeftBorder }) => isLeftBorder && applyLeftBorderStyle()};
`;

const MediumCell = styled.div`
  width: 26%;

  padding-left: ${theme.headerBorderPadding};

  @media ${SMALL_SCREEN} {
    width: auto;
    flex-grow: 1;
    padding-left: 0;
  }

  ${({ isLeftBorder }) => isLeftBorder && applyLeftBorderStyle()};
`;

const LargeCell = styled.div`
  width: 50%;

  padding-left: ${theme.headerBorderPadding};

  @media ${SMALL_SCREEN} {
    width: 100%;
    padding-left: 0;
  }

  ${({ isLeftBorder }) => isLeftBorder && applyLeftBorderStyle()};
`;

const Mission = styled.div`
  background-color: ${theme.colors.mission};
  display: flex;
  padding: ${theme.padding};
  border: 0.5px solid ${theme.colors.border};

  @media ${SMALL_SCREEN} {
    flex-wrap: wrap;
  }
`;

const Header = styled.div`
  display: flex;
  border: 1px solid ${theme.colors.border};
  padding: ${theme.padding};

  @media ${SMALL_SCREEN} {
    display: none;
  }
`;

const Missions = styled.div`
  color: ${theme.colors.text};
  padding: 10px;
  background-color: ${theme.colors.layout};
  border-radius: ${theme.borderRadius};
  margin-top: 10px;

  @media ${SMALL_SCREEN} {
    margin-top: 0;
  }
`;

const WebPage = styled.div`
  flex-grow: 1;
  max-width: 1700px;
`;

const MaxWidthContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const applyLeftBorderStyle = () => css`
  border-left: 1px solid ${theme.colors.border};
`;

export default App;
