export interface Sensor {
    id: string;
    name: string;
    description: string;
    picture: string;
    location: Location;
    value: number;
}

export interface Location {
    lat: number;
    lng: number;
}