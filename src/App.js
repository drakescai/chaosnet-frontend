import React, { Component } from 'react';

import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import Router  from 'react-router-component';
import HomePage from './pages/HomePage.js';
import LoginPage from './pages/LoginPage.js';
import SignupPage from './pages/SignupPage.js';
import TrainingRoomListPage from './pages/chaosnet/TrainingRoomListPage.js';
import TrainingRoomDetailPage from './pages/chaosnet/TrainingRoomDetailPage.js';
import logo from './logo.svg';
import './App.css';
import ChaosPixelSlicerPage from "./pages/ChaosPixelSlicerPage";
import {useCookies} from "react-cookie";
import ChaosPixelListTrainingDatasPage from "./pages/ChaosPixelListTrainingDatasPage";
import AuthService from "./services/AuthService";
import {Cookies, withCookies} from "react-cookie";
import {instanceOf} from "prop-types";
import TrainingRoomNewPage from "./pages/chaosnet/TrainingRoomNewPage";
import TrainingRoomFitnessRuleListPage from "./pages/chaosnet/TrainingRoomFitnessRuleListPage";
import TrainingRoomOrgListPage from "./pages/chaosnet/TrainingRoomOrgListPage";
import TrainingRoomTRanksListPage from "./pages/chaosnet/TrainingRoomTRanksListPage";
import TrainingRoomSessionsListPage from "./pages/chaosnet/TrainingRoomSessionsListPage";
import TrainingRoomTRanksDetailPage from "./pages/chaosnet/TrainingRoomTRanksDetailPage";
import TrainingRoomTRanksChildrenListPage from "./pages/chaosnet/TrainingRoomTRanksChildrenListPage";
import TrainingRoomSessionDetailPage from "./pages/chaosnet/TrainingRoomSessionDetailPage";
import TrainingRoomOrgDetailPage from "./pages/chaosnet/TrainingRoomOrgDetailPage";
import TrainingRoomOrgNNetDetailPage from "./pages/chaosnet/TrainingRoomOrgNNetDetailPage";
import TrainingRoomTRanksOrgsListPage from "./pages/chaosnet/TrainingRoomTRanksOrgsListPage";
import TrainingRoomPresetNeuronListPage from "./pages/chaosnet/TrainingRoomPresetNeuronListPage";
import TrainingRoomTRanksImportPage from "./pages/chaosnet/TrainingRoomTRanksImportPage";
import ConfigService from "./services/ConfigService";
class App extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
     constructor(props) {
        super(props);
        const {cookies} = props;
        this.cookies = cookies;
        ConfigService.init();
        AuthService.init(cookies);

    }
  render() {

    return (
        <Router.Locations>
            <Router.Location path="/" handler={HomePage} />
            <Router.Location path="/login" handler={LoginPage} />
            <Router.Location path="/signup" handler={SignupPage} />
            <Router.Location path="/:username/trainingrooms" handler={TrainingRoomListPage} />
            <Router.Location path="/:username/trainingrooms/new" handler={TrainingRoomNewPage} />
            <Router.Location path="/:username/trainingrooms/:trainingRoomNamespace" handler={TrainingRoomDetailPage} />
            <Router.Location path="/:username/trainingrooms/:trainingRoomNamespace/fitnessrules" handler={TrainingRoomFitnessRuleListPage} />
            <Router.Location path="/:username/trainingrooms/:trainingRoomNamespace/presetneurons" handler={TrainingRoomPresetNeuronListPage} />
            <Router.Location path="/:username/trainingrooms/:trainingRoomNamespace/organisms" handler={TrainingRoomOrgListPage} />
            <Router.Location path="/:username/trainingrooms/:trainingRoomNamespace/organisms/:organism" handler={TrainingRoomOrgDetailPage} />
            <Router.Location path="/:username/trainingrooms/:trainingRoomNamespace/organisms/:organism/nnet" handler={TrainingRoomOrgNNetDetailPage} />
            <Router.Location path="/:username/trainingrooms/:trainingRoomNamespace/organisms/:organism/nnet/neurons/:neuron" handler={TrainingRoomOrgNNetDetailPage} />
            <Router.Location path="/:username/trainingrooms/:trainingRoomNamespace/tranks" handler={TrainingRoomTRanksListPage} />
            <Router.Location path="/:username/trainingrooms/:trainingRoomNamespace/tranks/import" handler={TrainingRoomTRanksImportPage} />
            <Router.Location path="/:username/trainingrooms/:trainingRoomNamespace/tranks/:trank" handler={TrainingRoomTRanksDetailPage} />
            <Router.Location path="/:username/trainingrooms/:trainingRoomNamespace/tranks/:trank/children" handler={TrainingRoomTRanksChildrenListPage} />
            <Router.Location path="/:username/trainingrooms/:trainingRoomNamespace/tranks/:trank/organisms" handler={TrainingRoomTRanksOrgsListPage} />
            <Router.Location path="/:username/trainingrooms/:trainingRoomNamespace/tranks/:trank/organisms/:selector" handler={TrainingRoomTRanksOrgsListPage} />
            <Router.Location path="/:username/trainingrooms/:trainingRoomNamespace/sessions" handler={TrainingRoomSessionsListPage} />
            <Router.Location path="/:username/trainingrooms/:trainingRoomNamespace/sessions/:session" handler={TrainingRoomSessionDetailPage} />
            <Router.Location path="/:username/trainingrooms/:trainingRoomNamespace/sessions/:session/species" handler={TrainingRoomTRanksListPage} />
            <Router.Location path="/chaospixel" handler={ChaosPixelListTrainingDatasPage} />
            <Router.Location path="/chaospixel/slicer" handler={ChaosPixelSlicerPage} />
            <Router.NotFound handler={HomePage} />
        </Router.Locations>
    );
  }
}

export default withCookies(App);
