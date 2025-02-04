import mIcon_ports from '../../components/Ports/Drawer/images/harborIcon02.png';
import mIcon_cameras from '../../components/Ports/Drawer/images/camIcon.png';

/* Boath */
import boat1_01 from '../../components/Ports/Events/images/b1-01.jpg'
import boat1_02 from '../../components/Ports/Events/images/b1-02.jpg'
import boat1_03 from '../../components/Ports/Events/images/b1-03.jpg'
import boat1_04 from '../../components/Ports/Events/images/b1-04.jpg'
import boat1_05 from '../../components/Ports/Events/images/b1-05.jpg'
import { portsReduser } from './portsReduser';
import { authReduser } from './authReduser';
import { accountReduser } from './accountReduser';

// const userAvatar = 'https://diletant.media/upload/medialibrary/75f/75fc56318cbdcf69f479b48892351a73.jpg';
// const userAvatar = 'https://st4.depositphotos.com/11570224/20754/v/1600/depositphotos_207548456-stock-illustration-christopher-columbus-icon-symbol-avatar.jpg';
const userAvatar = 'https://www.pngkey.com/png/full/572-5723307_kaneki-ken-kanekiken-kaneki-anime.png';
// const userAvatar = 'https://cdn.pixabay.com/photo/2014/04/03/10/32/businessman-310819_960_720.png';

let counter = {
    portsId: 0,
    camerasId: 0,
    eventsId: 0,
    fleetId: 0,
}

const SET_CURRENT_PORT = 'SET CURRENT PORT';
const SET_CURRENT_CAMERA = 'SET CURRENT CAMERA';

const EVENT_NEW_PATH = 'EVENT NEW PATH';

export let store = {
    state: {
        authPage: {
            demo: {
                signInData: {
                    email: 'testLogIn@testLogIn.com',
                    password: 'testPassword'
                }
            }
        },

        portsPage: {
            ports: {
                icons: {
                    mapIcon: 'islands#blueWaterwayIcon',
                    draverIcon: mIcon_ports,
                },

                data: [
                    {
                        id: counter.portsId++,
                        country: 'Sweden',
                        city: 'Stockholm',
                        description: 'Stockholm',
                        coordinates: [59.349515, 18.121666],
                        zoom: 3.3,
                        link: '',

                        cameras: {
                            icons: {
                                mapIcon: 'islands#blueVideoIcon',
                                draverIcon: mIcon_cameras,
                            },

                            data: [
                                {
                                    id: counter.camerasId++,
                                    country: 'Sweden',
                                    city: 'Stockholm',
                                    name: 'Camera 1',
                                    type: 'Hikvision',
                                    move: 'PTZ',
                                    viewingAngle: '120',
                                    description: 'Embarkation Area',
                                    coordinates: [59.351489, 18.113607],
                                    zoom: 15,
                                    link: 'https://www.youtube.com/embed/dnn9B0vPlws',



                                    events: [
                                        {
                                            id: counter.eventsId++,
                                            typeError: 'Critical',
                                            typeVessel: 'Boat 1',
                                            location: 'Sweden',
                                            city: 'Stockholm',
                                            camera: 'Camera 1',
                                            date: '2020-12-21',
                                            time: '10:00:34',
                                            timezone: '+0300',
                                            imageLink: boat1_01,
                                            disctiption: 'An unknown ship has entered the port! Alert!!!',
                                        },

                                        {
                                            id: counter.eventsId++,
                                            typeError: 'Warning',
                                            typeVessel: 'Boat 1',
                                            location: 'Sweden',
                                            city: 'Stockholm',
                                            camera: 'Camera 1',
                                            date: '2020-11-29',
                                            time: '10:05:51',
                                            timezone: '+0300',
                                            imageLink: boat1_02,
                                            disctiption: 'An unknown ship is approaching the port! Attention!',
                                        },
                                    ],
                                },
                                {
                                    id: counter.camerasId++,
                                    country: 'Sweden',
                                    city: 'Stockholm',
                                    name: 'Camera 2',
                                    type: 'Hikvision',
                                    move: 'PTZ',
                                    viewingAngle: '120',
                                    description: 'Comein Port',
                                    coordinates: [59.351168, 18.113955],
                                    zoom: 15,
                                    link: 'https://www.youtube.com/embed/dnn9B0vPlws',

                                    events: [
                                        {
                                            id: counter.eventsId++,
                                            typeError: 'Warning',
                                            typeVessel: 'Boat 1',
                                            location: 'Sweden',
                                            city: 'Stockholm',
                                            camera: 'Camera 2',
                                            date: '2020-11-29',
                                            time: '10:03:43',
                                            timezone: '+0300',
                                            imageLink: boat1_03,
                                            disctiption: 'An unknown ship is approaching the port! Attention!',
                                        },

                                        {
                                            id: counter.eventsId++,
                                            typeError: 'Regular',
                                            typeVessel: 'Boat 2',
                                            location: 'Sweden',
                                            city: 'Stockholm',
                                            camera: 'Camera 2',
                                            date: '2020-11-21',
                                            time: '10:07:21',
                                            timezone: '+0300',
                                            imageLink: boat1_01,
                                            disctiption: 'Nothing interesting, keep moving on',
                                        },

                                        {
                                            id: counter.eventsId++,
                                            typeError: 'Regular',
                                            typeVessel: 'Boat 2',
                                            location: 'Sweden',
                                            city: 'Stockholm',
                                            camera: 'Camera 2',
                                            date: '2020-11-21',
                                            time: '10:13:31',
                                            timezone: '+0300',
                                            imageLink: boat1_02,
                                            disctiption: 'Nothing interesting, keep moving on',
                                        },

                                        {
                                            id: counter.eventsId++,
                                            typeError: 'Regular',
                                            typeVessel: 'Boat 2',
                                            location: 'Sweden',
                                            city: 'Stockholm',
                                            camera: 'Camera 2',
                                            date: '2020-11-21',
                                            time: '10:21:20',
                                            timezone: '+0300',
                                            imageLink: boat1_03,
                                            disctiption: 'Nothing interesting, keep moving on',
                                        },

                                        {
                                            id: counter.eventsId++,
                                            typeError: 'Regular',
                                            typeVessel: 'Boat 3',
                                            location: 'Sweden',
                                            city: 'Stockholm',
                                            camera: 'Camera 2',
                                            date: '2020-11-21',
                                            time: '10:25:39',
                                            timezone: '+0300',
                                            imageLink: boat1_04,
                                            disctiption: 'Nothing interesting, keep moving on',
                                        },

                                        {
                                            id: counter.eventsId++,
                                            typeError: 'Regular',
                                            typeVessel: 'Boat 3',
                                            location: 'Sweden',
                                            city: 'Stockholm',
                                            camera: 'Camera 2',
                                            date: '2020-11-21',
                                            time: '10:29:58',
                                            timezone: '+0300',
                                            imageLink: boat1_05,
                                            disctiption: 'Nothing interesting, keep moving on',
                                        },

                                        {
                                            id: counter.eventsId++,
                                            typeError: 'Regular',
                                            typeVessel: 'Boat 2',
                                            location: 'Sweden',
                                            city: 'Stockholm',
                                            camera: 'Camera 2',
                                            date: '2020-11-21',
                                            time: '10:33:46',
                                            timezone: '+0300',
                                            imageLink: boat1_01,
                                            disctiption: 'Nothing interesting, keep moving on',
                                        },
                                    ],
                                },
                                {
                                    id: counter.camerasId++,
                                    country: 'Sweden',
                                    city: 'Stockholm',
                                    name: 'Camera 3',
                                    type: 'Hikvision',
                                    move: 'PTZ',
                                    viewingAngle: '120',
                                    description: 'Parking Area',
                                    coordinates: [59.351366, 18.109787],
                                    zoom: 15,
                                    link: 'https://www.youtube.com/embed/dnn9B0vPlws',

                                    events: [
                                        {
                                            id: counter.eventsId++,
                                            typeError: 'Regular',
                                            typeVessel: 'Boat 3',
                                            location: 'Sweden',
                                            city: 'Stockholm',
                                            camera: 'Camera 3',
                                            date: '2020-11-21',
                                            time: '10:12:12',
                                            timezone: '+0300',
                                            imageLink: boat1_04,
                                            disctiption: 'Nothing interesting, keep moving on',
                                        },

                                        {
                                            id: counter.eventsId++,
                                            typeError: 'Regular',
                                            typeVessel: 'Boat 2',
                                            location: 'Sweden',
                                            city: 'Stockholm',
                                            camera: 'Camera 3',
                                            date: '2020-11-21',
                                            time: '10:16:17',
                                            timezone: '+0300',
                                            imageLink: boat1_04,
                                            disctiption: 'Nothing interesting, keep moving on',
                                        },
                                    ],
                                },

                            ]
                        },
                    },

                    {
                        id: counter.portsId++,
                        country: 'Finland',
                        city: 'Kotka',
                        description: 'Kotka',
                        coordinates: [60.460992, 26.963405],
                        zoom: 3.3,
                        link: '',

                        cameras: {
                            icons: {
                                mapIcon: 'islands#blueVideoIcon',
                                draverIcon: mIcon_cameras,
                            },

                            data: [
                                {
                                    id: counter.camerasId++,
                                    country: 'Finland',
                                    city: 'Kotka',
                                    name: 'Camera 1',
                                    type: 'Hikvision',
                                    move: 'PTZ',
                                    viewingAngle: '120',
                                    description: 'Parking Area 1',
                                    coordinates: [60.461511, 26.962394],
                                    zoom: 15,
                                    link: 'https://www.youtube.com/embed/dnn9B0vPlws',

                                    events: [
                                        {
                                            id: counter.eventsId++,
                                            typeError: 'Warning',
                                            typeVessel: 'Boat 1',
                                            location: 'Finland',
                                            city: 'Kotka',
                                            camera: 'Camera 1',
                                            date: '2020-12-21',
                                            time: '10:18:54',
                                            timezone: '+0300',
                                            imageLink: boat1_02,
                                            disctiption: 'An unknown ship is approaching the port! Attention!',
                                        },
                                    ],
                                },
                                {
                                    id: counter.camerasId++,
                                    country: 'Finland',
                                    city: 'Kotka',
                                    name: 'Camera 2',
                                    type: 'Hikvision',
                                    move: 'PTZ',
                                    viewingAngle: '120',
                                    description: 'Parking Area 2',
                                    coordinates: [60.461125, 26.962265],
                                    zoom: 15,
                                    link: 'https://www.youtube.com/embed/dnn9B0vPlws',

                                    events: [
                                        {
                                            id: counter.eventsId++,
                                            typeError: 'Regular',
                                            typeVessel: 'Boat 1',
                                            location: 'Finland',
                                            city: 'Kotka',
                                            camera: 'Camera 2',
                                            date: '2020-11-21',
                                            time: '10:12:21',
                                            timezone: '+0300',
                                            imageLink: boat1_04,
                                            disctiption: 'Nothing interesting, keep moving on',
                                        },

                                        {
                                            id: counter.eventsId++,
                                            typeError: 'Regular',
                                            typeVessel: 'Boat 1',
                                            location: 'Finland',
                                            city: 'Kotka',
                                            camera: 'Camera 2',
                                            date: '2020-12-19',
                                            time: '10:17:42',
                                            timezone: '+0300',
                                            imageLink: boat1_05,
                                            disctiption: 'Nothing interesting, keep moving on',
                                        },
                                    ],
                                },
                                {
                                    id: counter.camerasId++,
                                    country: 'Finland',
                                    city: 'Kotka',
                                    name: 'Camera 3',
                                    type: 'Hikvision',
                                    move: 'PTZ',
                                    viewingAngle: '120',
                                    description: 'Parking Area 3',
                                    coordinates: [60.460258, 26.962769],
                                    zoom: 15,
                                    link: 'https://www.youtube.com/embed/dnn9B0vPlws',

                                    events: [
                                        {
                                            id: counter.eventsId++,
                                            typeError: 'Warning',
                                            typeVessel: 'Boat 1',
                                            location: 'Finland',
                                            city: 'Kotka',
                                            camera: 'Camera 3',
                                            date: '2020-12-21',
                                            time: '10:18:54',
                                            timezone: '+0300',
                                            imageLink: boat1_01,
                                            disctiption: 'An unknown ship is approaching the port! Attention!',
                                        },
                                    ],
                                },
                            ],
                        },
                    },

                    {
                        id: counter.portsId++,
                        country: 'Russia',
                        city: 'Krondstadt',
                        description: 'Krondstadt',
                        coordinates: [59.983946, 29.798736],
                        zoom: 3.3,
                        link: '',

                        cameras: {
                            icons: {
                                mapIcon: 'islands#blueVideoIcon',
                                draverIcon: mIcon_cameras,
                            },

                            data: [
                                {
                                    id: counter.camerasId++,
                                    country: 'Russia',
                                    city: 'Krondstadt',
                                    name: 'Camera 1',
                                    type: 'Hikvision',
                                    move: 'PTZ',
                                    viewingAngle: '120',
                                    description: 'Comein Port 1',
                                    coordinates: [59.980700, 29.788779],
                                    zoom: 15,
                                    link: 'https://www.youtube.com/embed/ibkSDySGxvw',

                                    events: [
                                        {
                                            id: counter.eventsId++,
                                            typeError: 'Regular',
                                            typeVessel: 'Boat 1',
                                            location: 'Russia',
                                            city: 'Krondstadt',
                                            camera: 'Camera 1',
                                            date: '2020-12-21',
                                            time: '10:20:08',
                                            timezone: '+0300',
                                            imageLink: boat1_03,
                                            disctiption: 'Nothing interesting, keep moving on',
                                        },

                                        {
                                            id: counter.eventsId++,
                                            typeError: 'Regular',
                                            typeVessel: 'Boat 2',
                                            location: 'Russia',
                                            city: 'Krondstadt',
                                            camera: 'Camera 1',
                                            date: '2020-12-21',
                                            time: '10:22:31',
                                            timezone: '+0300',
                                            imageLink: boat1_04,
                                            disctiption: 'Nothing interesting, keep moving on',
                                        },
                                    ],
                                },
                                {
                                    id: counter.camerasId++,
                                    country: 'Russia',
                                    city: 'Krondstadt',
                                    name: 'Camera 2',
                                    type: 'Hikvision',
                                    move: 'PTZ',
                                    viewingAngle: '120',
                                    description: 'Comein Port 2',
                                    coordinates: [59.982513, 29.783396],
                                    zoom: 15,
                                    link: 'https://www.youtube.com/embed/ibkSDySGxvw',

                                    events: [
                                        {
                                            id: counter.eventsId++,
                                            typeError: 'Warning',
                                            typeVessel: 'Boat 1',
                                            location: 'Russia',
                                            city: 'Krondstadt',
                                            camera: 'Camera 2',
                                            date: '2020-12-21',
                                            time: '10:25:13',
                                            timezone: '+0300',
                                            imageLink: boat1_01,
                                            disctiption: 'An unknown ship is approaching the port! Attention!',
                                        },

                                        {
                                            id: counter.eventsId++,
                                            typeError: 'Regular',
                                            typeVessel: 'Boat 3',
                                            location: 'Russia',
                                            city: 'Krondstadt',
                                            camera: 'Camera 2',
                                            date: '2020-12-21',
                                            time: '10:20:08',
                                            timezone: '+0300',
                                            imageLink: boat1_03,
                                            disctiption: 'Nothing interesting, keep moving on',
                                        },
                                    ],
                                },
                                {
                                    id: counter.camerasId++,
                                    country: 'Russia',
                                    city: 'Krondstadt',
                                    name: 'Camera 3',
                                    type: 'Hikvision',
                                    move: 'PTZ',
                                    viewingAngle: '120',
                                    description: 'Comein Port 3',
                                    coordinates: [59.981857, 29.775833],
                                    zoom: 15,
                                    link: 'https://www.youtube.com/embed/ibkSDySGxvw',

                                    events: [
                                        {
                                            id: counter.eventsId++,
                                            typeError: 'Warning',
                                            typeVessel: 'Boat 1',
                                            location: 'Russia',
                                            city: 'Krondstadt',
                                            camera: 'Camera 3',
                                            date: '2020-12-21',
                                            time: '10:25:13',
                                            timezone: '+0300',
                                            imageLink: boat1_05,
                                            disctiption: 'An unknown ship is approaching the port! Attention!',
                                        },
                                    ],
                                },
                            ],
                        },
                    },

                    {
                        id: counter.portsId++,
                        country: 'Finland',
                        city: 'Helsinki',
                        description: 'Helsinki',
                        coordinates: [60.159995, 24.925003],
                        zoom: 3.3,
                        link: '',

                        cameras: {
                            icons: {
                                mapIcon: 'islands#blueVideoIcon',
                                draverIcon: mIcon_cameras,
                            },

                            data: [
                                {
                                    id: counter.camerasId++,
                                    country: 'Finland',
                                    city: 'Helsinki',
                                    name: 'Camera 1',
                                    type: 'Hikvision',
                                    move: 'PTZ',
                                    viewingAngle: '120',
                                    description: 'Comein Port',
                                    coordinates: [60.158679, 24.925614],
                                    zoom: 15,
                                    link: 'https://www.youtube.com/embed/LMZQ7eFhm58',

                                    events: [
                                        {
                                            id: counter.eventsId++,
                                            typeError: 'Critical',
                                            typeVessel: 'Boat 1',
                                            location: 'Finland',
                                            city: 'Helsinki',
                                            camera: 'Camera 1',
                                            date: '2020-12-21',
                                            time: '10:26:50',
                                            timezone: '+0300',
                                            imageLink: boat1_01,
                                            disctiption: 'An unknown ship has entered the port! Alert!!!',
                                        },

                                        {
                                            id: counter.eventsId++,
                                            typeError: 'Regular',
                                            typeVessel: 'Boat 2',
                                            location: 'Finland',
                                            city: 'Helsinki',
                                            camera: 'Camera 1',
                                            date: '2020-12-21',
                                            time: '10:31:42',
                                            timezone: '+0300',
                                            imageLink: boat1_02,
                                            disctiption: 'Nothing interesting, keep moving on',
                                        },
                                    ],
                                },

                                {
                                    id: counter.camerasId++,
                                    country: 'Finland',
                                    city: 'Helsinki',
                                    name: 'Camera 2',
                                    type: 'Hikvision',
                                    move: 'PTZ',
                                    viewingAngle: '120',
                                    description: 'Parking Area',
                                    coordinates: [60.158904, 24.926161],
                                    zoom: 15,
                                    link: 'https://www.youtube.com/embed/G_jM9xLgk8E',

                                    events: [
                                        {
                                            id: counter.eventsId++,
                                            typeError: 'Regular',
                                            typeVessel: 'Boat 1',
                                            location: 'Finland',
                                            city: 'Helsinki',
                                            camera: 'Camera 2',
                                            date: '2020-12-21',
                                            time: '10:29:17',
                                            timezone: '+0300',
                                            imageLink: boat1_02,
                                            disctiption: 'Nothing interesting, keep moving on',
                                        },

                                        {
                                            id: counter.eventsId++,
                                            typeError: 'Critical',
                                            typeVessel: 'Boat 2',
                                            location: 'Finland',
                                            city: 'Helsinki',
                                            camera: 'Camera 2',
                                            date: '2020-12-21',
                                            time: '10:30:58',
                                            timezone: '+0300',
                                            imageLink: boat1_03,
                                            disctiption: 'An unknown ship has entered the port! Alert!!!',
                                        },

                                        {
                                            id: counter.eventsId++,
                                            typeError: 'Regular',
                                            typeVessel: 'Boat 1',
                                            location: 'Finland',
                                            city: 'Helsinki',
                                            camera: 'Camera 2',
                                            date: '2020-12-21',
                                            time: '10:31:42',
                                            timezone: '+0300',
                                            imageLink: boat1_04,
                                            disctiption: 'Nothing interesting, keep moving on',
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                ],
            },

            currentData: {
                port: {},
                camera: {},

                setCurrentPort(currentPort) { this.port = currentPort; },
                setCurrentCamera(currentCamera) { this.camera = currentCamera; },
            },

            header: {
                messages: 0,
                miniAvatar: userAvatar,
            }
        },

        accountPage: {
            userData: {
                avatar: userAvatar,
                name: 'fernan magellan',
                company: 'ServiceSoft',
                phone: '+X (XXX) XXX-XX-XX',
                email: 'servise.soft@somemail.com',
                status: 'Gold',
            },

            information: {},
            statistic: {},

            myFleet: [
                {
                    id: counter.fleetId++,
                    imo: '1111111',
                    name: 'SERVICESOFT',
                    vesselTypeGeneric: 'Cargo - XXX',
                    vesselTypeDetailed: 'Container Ship',
                    status: 'Active',
                    mmsi: '111111111',
                    callSign: 'AAAA',
                    flag: 'Any country',
                    grossTonnage: 'XXXXXX',
                    summerDWT: 'XXXXXX', /* В тоннах */
                    lengthOverallBreadthExtreme: '450 x 62 m',
                    yearBuilt: 2020,
                },
                {
                    id: counter.fleetId++,
                    imo: '2222222',
                    name: 'SERVICESOFT',
                    vesselTypeGeneric: 'Cargo - XXX',
                    vesselTypeDetailed: 'Container Ship',
                    status: 'Active',
                    mmsi: '222222222',
                    callSign: 'BBBB',
                    flag: 'Any country',
                    grossTonnage: 'XXXXXX',
                    summerDWT: 'XXXXXX', /* В тоннах */
                    lengthOverallBreadthExtreme: '350 x 52 m',
                    yearBuilt: 2019,
                },
                {
                    id: counter.fleetId++,
                    imo: '3333333',
                    name: 'SERVICESOFT',
                    vesselTypeGeneric: 'Cargo - XXX',
                    vesselTypeDetailed: 'Container Ship',
                    status: 'Active',
                    mmsi: '3333333',
                    callSign: 'CCCC',
                    flag: 'Any country',
                    grossTonnage: 'XXXXXX',
                    summerDWT: 'XXXXXX', /* В тоннах */
                    lengthOverallBreadthExtreme: '400 x 62 m',
                    yearBuilt: 2018,
                },
                {
                    id: counter.fleetId++,
                    imo: '4444444',
                    name: 'SERVICESOFT',
                    vesselTypeGeneric: 'Cargo - XXX',
                    vesselTypeDetailed: 'Container Ship',
                    status: 'Active',
                    mmsi: '444444444',
                    callSign: 'DDDD',
                    flag: 'Any country',
                    grossTonnage: 'XXXXXX',
                    summerDWT: 'XXXXXX', /* В тоннах */
                    lengthOverallBreadthExtreme: '250 x 48 m',
                    yearBuilt: 2021,
                },
                {
                    id: counter.fleetId++,
                    imo: '5555555',
                    name: 'SERVICESOFT',
                    vesselTypeGeneric: 'Cargo - XXX',
                    vesselTypeDetailed: 'Container Ship',
                    status: 'Active',
                    mmsi: '555555555',
                    callSign: 'EEEE',
                    flag: 'Any country',
                    grossTonnage: 'XXXXXX',
                    summerDWT: 'XXXXXX', /* В тоннах */
                    lengthOverallBreadthExtreme: '482 x 64 m',
                    yearBuilt: 2006,
                },
                {
                    id: counter.fleetId++,
                    imo: '6666666',
                    name: 'SERVICESOFT',
                    vesselTypeGeneric: 'Cargo - XXX',
                    vesselTypeDetailed: 'Container Ship',
                    status: 'Active',
                    mmsi: '666666666',
                    callSign: 'FFFF',
                    flag: 'Any country',
                    grossTonnage: 'XXXXXX',
                    summerDWT: 'XXXXXX', /* В тоннах */
                    lengthOverallBreadthExtreme: '510 x 54 m',
                    yearBuilt: 2010,
                },
                {
                    id: counter.fleetId++,
                    imo: '7777777',
                    name: 'SERVICESOFT',
                    vesselTypeGeneric: 'Cargo - XXX',
                    vesselTypeDetailed: 'Container Ship',
                    status: 'Active',
                    mmsi: '777777777',
                    callSign: 'GGGG',
                    flag: 'Any country',
                    grossTonnage: 'XXXXXX',
                    summerDWT: 'XXXXXX', /* В тоннах */
                    lengthOverallBreadthExtreme: '400 x 62 m',
                    yearBuilt: 2016,
                },
            ],
        },
    },

    dispatch(action) {
        this.state.authPage = authReduser(this.state.authPage, action);
        this.state.portsPage = portsReduser(this.state.portsPage, action);
        this.state.accountPage = accountReduser(this.state.accountPage, action);

        // switch (action.type) {
        //     case (SET_CURRENT_PORT): {
        //         const port = this.state.portsPage.ports.data[action.num];
        //         this.state.portsPage.currentData.setCurrentPort(port);
        //         break;
        //     };

        //     case (SET_CURRENT_CAMERA): {
        //         const port = this.state.portsPage.currentData.port;
        //         const camera = port.cameras.data[action.num];
        //         this.state.portsPage.currentData.setCurrentCamera(camera);
        //         break;
        //     };

        //     case (EVENT_NEW_PATH): {
        //         return (`/events?country=${action.country}&city=${action.city}&camId=${action.id}&num=${action.num}`)
        //         break;
        //     };
        // }
    },
};

// export const setCurrentPort = (index) => ({
//     type: SET_CURRENT_PORT,
//     num: index,
// });

// export const setCurrentCamera = (index) => ({
//     type: SET_CURRENT_CAMERA,
//     num: index,
// });