type IMetadataItem = {
    id: number;
    user: {
        id: number;
        name: string;
    };
}

type IMEtadataMedicine = {
    id: number;
    name: string
}

type IMetadataResponse = {
    success: boolean;
    data: {
        list: IMetadataItem[];
        count: number;
    };
    statusCode: number;
    message: string;
}

type IMetadtaMedicineResponse = {
    success: boolean;
    data: {
        list: IMEtadataMedicine[];
        count: number;
    };
    statusCode: number;
    message: string;
}
export type { IMetadataItem, IMetadataResponse, IMEtadataMedicine, IMetadtaMedicineResponse }
