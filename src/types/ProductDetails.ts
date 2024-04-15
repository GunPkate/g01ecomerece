
export interface VariantType {
    skuCode: string,
    color: string,
    size: string,
    remains: number,
    colorCode: string 
} 

export interface ProductByPermarlink {
    id: string;
    name: string;
    skuCode: string;
    permalink: string;
    description: string;
    price: number;
    promotionalPrice: number;
    categories: string[];
    collection: string;
    ratings: number;
    imageUrls: string[];
    variants: VariantType[];
} 

export interface colorSet {
    color: string
}

export interface colorCodeSet {
    colorCode: string
}


export interface sizeSet {
    size: string
}

export class VariantType {
    static InitialObjVariantType(): VariantType{
        return {
            skuCode: "",
            color: "",
            size: "",
            remains: 0,
            colorCode: "" 
        }
    }
}
