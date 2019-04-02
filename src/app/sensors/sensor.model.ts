export interface Sensor {
    id: string;
    description: string;
    location: Location;
    value: number;
}

export interface Location {
    lat: number;
    lng: number;
}