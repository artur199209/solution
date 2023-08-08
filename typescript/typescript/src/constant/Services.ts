export type ServiceYear = 2020 | 2021 | 2022;
export type ServiceType = "Photography" | "VideoRecording" | "BlurayPackage" | "TwoDayEvent" | "WeddingSession";

export enum ServiceTypesEnum  {
    PHOTOGRAPHY = "Photography",
    VIDEORECORDING = "VideoRecording",
    BLURAYPACKAGE = "BlurayPackage",
    TWODAYEVENT = "TwoDayEvent",
    WEDDINGSESSION = "WeddingSession"
};

export const videoRecordingPrices = new Map<ServiceYear, number>([
    [2020, 1700],
    [2021, 1800],
    [2022, 1900]
]);

export const photographyPrices = new Map<ServiceYear, number>([
    [2020, 1700],
    [2021, 1800],
    [2022, 1900]
]);

export const videoWithPhotographyPrices = new Map<ServiceYear , number>([
    [2020, 2200],
    [2021, 2300],
    [2022, 2500]
]);


export const WeddingSessionPrice = 600;
export const WeddingSesssionPriceWithDiscount = 300;
export const BlurayPackagePrice = 300;
export const TwoDayEventPrice = 400;
export const YearWithDiscount = 2022;
