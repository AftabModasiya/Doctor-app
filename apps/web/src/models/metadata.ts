export interface IMetadataItem {
    id: number;
    user: {
        id: number;
        name: string;
    };
}

export interface IMetadataResponse {
    success: boolean;
    data: {
        list: IMetadataItem[];
        count: number;
    };
    statusCode: number;
    message: string;
}
