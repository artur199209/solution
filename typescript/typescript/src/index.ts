import { ServiceType, ServiceYear, ServiceTypesEnum } from "./constant/Services";
import { SELECT, DESELECT } from "./constant/Names";
import { WeddingSessionPrice, WeddingSesssionPriceWithDiscount, BlurayPackagePrice, TwoDayEventPrice, YearWithDiscount, videoRecordingPrices, videoWithPhotographyPrices, photographyPrices } from "./constant/Services";

export const updateSelectedServices = (
    previouslySelectedServices: ServiceType[],
    action: { type: "Select" | "Deselect"; service: ServiceType }
) => {
    switch(action.type)
    {
        case SELECT:
            {
                if(!previouslySelectedServices.includes(action.service) && ((previouslySelectedServices.includes(ServiceTypesEnum.VIDEORECORDING)) 
                && (action.service == ServiceTypesEnum.BLURAYPACKAGE) || action.service != ServiceTypesEnum.BLURAYPACKAGE))
                {
                    return [...previouslySelectedServices, action.service];
                }

                return previouslySelectedServices;
            }
        case DESELECT: 
            {
                if(previouslySelectedServices.includes(action.service))
                {
                    let newPreviouslySelectedServices = previouslySelectedServices.filter(item => item !== action.service);

                    if(newPreviouslySelectedServices.includes(ServiceTypesEnum.TWODAYEVENT) && !newPreviouslySelectedServices.includes(ServiceTypesEnum.VIDEORECORDING) && !newPreviouslySelectedServices.includes(ServiceTypesEnum.PHOTOGRAPHY))
                    {
                        newPreviouslySelectedServices = newPreviouslySelectedServices.filter(item => item !== ServiceTypesEnum.TWODAYEVENT);
                    }

                    return newPreviouslySelectedServices;
                }

                return previouslySelectedServices;
            }
        default: {
            return previouslySelectedServices;
        }
    }
};

function applyTwoDayEventPrice(selectedServices: ServiceType[]):number
{
    var cost = 0;

    if ((selectedServices.includes(ServiceTypesEnum.PHOTOGRAPHY) || selectedServices.includes(ServiceTypesEnum.VIDEORECORDING)) && selectedServices.includes(ServiceTypesEnum.TWODAYEVENT))
    {
        cost = TwoDayEventPrice;     
    }

    return cost;
}

function addBluRayPackagePrice(selectedServices: ServiceType[]):number
{
    return (selectedServices.includes(ServiceTypesEnum.VIDEORECORDING) && selectedServices.includes(ServiceTypesEnum.BLURAYPACKAGE)) ? BlurayPackagePrice : 0;
}

function addWeddingSessionPrice(selectedServices: ServiceType[]):number
{
    return selectedServices.includes(ServiceTypesEnum.WEDDINGSESSION) ? WeddingSessionPrice : 0;
}

function addVideoPhotographyPrice(selectedServices: ServiceType[], selectedYear: ServiceYear)
{
    var cost = 0;

    if (selectedServices.includes(ServiceTypesEnum.PHOTOGRAPHY) && selectedServices.includes(ServiceTypesEnum.VIDEORECORDING))
    {
        cost = videoWithPhotographyPrices.get(selectedYear);
    }

    else if (selectedServices.includes(ServiceTypesEnum.VIDEORECORDING) && !selectedServices.includes(ServiceTypesEnum.PHOTOGRAPHY))
    {
        cost = videoRecordingPrices.get(selectedYear);
    }

    else if (selectedServices.includes(ServiceTypesEnum.PHOTOGRAPHY) && !selectedServices.includes(ServiceTypesEnum.VIDEORECORDING))
    {
        cost = photographyPrices.get(selectedYear);
    }

    return cost;
}

function calculateDiscount(selectedServices: ServiceType[], selectedYear: ServiceYear) : number {
    var discount = 0;

    if (selectedServices.includes(ServiceTypesEnum.WEDDINGSESSION))
    {
       if(selectedServices.includes(ServiceTypesEnum.VIDEORECORDING))
       {
        discount = WeddingSesssionPriceWithDiscount;
       }
       if(selectedServices.includes(ServiceTypesEnum.PHOTOGRAPHY) && selectedYear === YearWithDiscount)
       {
        discount = WeddingSessionPrice > discount ? WeddingSessionPrice : discount;
       }
       else if(selectedServices.includes(ServiceTypesEnum.PHOTOGRAPHY) && selectedYear !== YearWithDiscount)
       {
        discount = WeddingSesssionPriceWithDiscount > discount ? WeddingSesssionPriceWithDiscount : discount;
       }
    }
   
    return discount;
}

export const calculatePrice = (selectedServices: ServiceType[], selectedYear: ServiceYear) => 
{
    var basePrice = 0;
    var finalPrice = 0;

    if (selectedServices.length == 0)
    {
        return { basePrice, finalPrice };
    }

    basePrice += addVideoPhotographyPrice(selectedServices, selectedYear);    
    basePrice += addBluRayPackagePrice(selectedServices);
    basePrice += applyTwoDayEventPrice(selectedServices);
    basePrice += addWeddingSessionPrice(selectedServices);
    var discount = calculateDiscount(selectedServices, selectedYear);

    finalPrice = basePrice - discount;
    return { basePrice, finalPrice };
}